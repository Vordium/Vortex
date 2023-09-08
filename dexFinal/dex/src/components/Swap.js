import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";
import axios from "axios";
import { useSendTransaction, useWaitForTransaction } from "wagmi";

function Swap(props) {
  const { address, isConnected } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    },
  });

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  }

  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i) {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    const selectedToken = tokenList
      .filter(
        (token) =>
          token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
      [i];
    if (!selectedToken) {
      return;
    }

    if (changeToken === 1) {
      setTokenOne(selectedToken);
      fetchPrices(selectedToken.address, tokenTwo.address);
    } else {
      setTokenTwo(selectedToken);
      fetchPrices(tokenOne.address, selectedToken.address);
    }
    setIsOpen(false);
  }

  async function fetchPrices(one, two) {
    const res = await axios.get(`https://api.vordium.com/api/tokenPrice`, {
      params: { addressOne: one, addressTwo: two },
    });
    setPrices(res.data);
  }

  async function fetchDexSwap() {
    setIsLoading(true); // Set loading state to true when the button is clicked

    const apiKey = process.env.REACT_APP_1INCH_API_KEY;
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    // Troubleshooting code - Start
    console.log("Debug: Checking input data before making the 1inch API request...");
    console.log("Token One Address:", tokenOne.address);
    console.log("Wallet Address:", address);
    // Troubleshooting code - End

    // Set up Axios instance with headers
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    try {
      const allowance = await axiosInstance.get(
        `https://api.1inch.dev/swap/v5.2/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`,
        { headers }
      );

      if (allowance.data.allowance === "0") {
        const approve = await axiosInstance.get(
          `https://api.1inch.dev/swap/v5.2/1/approve/allowance?tokenAddress=${tokenOne.address}`,
          { headers }
        );
        setTxDetails(approve.data);
        console.log("not approved");
        return;
      }

      const tx = await axiosInstance.get(
        `https://api.1inch.dev/swap/v5.2/1/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(
          tokenOne.decimals + tokenOneAmount.length,
          "0"
        )}&fromAddress=${address}&slippage=${slippage}`,
        { headers }
      );

      let decimals = Number(`1E${tokenTwo.decimals}`);
      setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(2));

      setTxDetails(tx.data.tx);
    } catch (error) {
      console.error("Error fetching DexSwap:", error);
      // You can handle the error here, e.g., show an error message to the user.
    } finally {
      setIsLoading(false); // Reset the loading state
    }
  }

  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
  }, []);

  useEffect(() => {
    messageApi.destroy();

    if (isLoading) {
      messageApi.open({
        type: "loading",
        content: "Transaction is Pending...",
        duration: 0,
      });
    } else if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Transaction Successful",
        duration: 1.5,
      });
    } else if (txDetails.to) {
      messageApi.open({
        type: "error",
        content: "Transaction Failed",
        duration: 1.5,
      });
    }
  }, [isLoading, isSuccess, txDetails.to, messageApi]);

  useEffect(() => {
    if (txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails.to, isConnected, sendTransaction]);

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className="modalContent">
          <Input
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              fontSize: "16px",
              height: "50px",
              borderRadius: "0",
            }}
            className="tokenSearchInput"
          />
          {tokenList
            ?.filter(
              (token) =>
                token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                token.address.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((e, i) => {
              return (
                <div
                  className="tokenChoice"
                  key={i}
                  onClick={() => modifyToken(i)}
                >
                  <img src={e.img} alt={e.ticker} className="tokenLogo" />
                  <div className="tokenChoiceNames">
                    <div className="tokenName">{e.name}</div>
                    <div className="tokenTicker">{e.ticker}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </Modal>
      <div className="tradeBox">
        <div className="tradeBoxHeader">
          <h4>Swap</h4>
          <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
          >
            <SettingOutlined className="cog" />
          </Popover>
        </div>
        <div className="inputs">
          <Input
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={!prices}
          />
          <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
          <div className="switchButton" onClick={switchTokens}>
            <ArrowDownOutlined className="switchArrow" />
          </div>
          <div className="assetOne" onClick={() => openModal(1)}>
            <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
            {tokenOne.ticker}
            <DownOutlined />
          </div>
          <div className="assetTwo" onClick={() => openModal(2)}>
            <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
            {tokenTwo.ticker}
            <DownOutlined />
          </div>
        </div>
        <div
          className="swapButton"
          disabled={!tokenOneAmount || !isConnected || isLoading}
          onClick={fetchDexSwap}
        >
          {isLoading ? "Loading..." : "Swap"}
        </div>
      </div>
    </>
  );
}

export default Swap;
