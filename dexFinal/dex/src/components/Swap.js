import React, { useState, useEffect } from "react";
import { Button, Input, Popover, Radio, Modal, message } from "antd";
import Gas from "./Gas";
import TokenSearch from "./tokenSearch";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";
import axios from "axios";
import { useBalance, useSendTransaction, useWaitForTransaction } from "wagmi";
import { Egas } from './Egas';


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

  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    },
  });

  const {isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const balance1 = useBalance({
  address: address,
  token: tokenOne.address,
  });

  const balance2 = useBalance({
    address: address,
    token: tokenTwo.address,
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
    const allowance = await axios.get(
      `/api/1inch?url=https://api.1inch.dev/swap/v5.2/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`
    )

    if (allowance.data.allowance === "0") {
      // Use a confirm dialog to ask the user for approval
      const userConfirmed = window.confirm("Do you want to approve this transaction?");
  
      if (userConfirmed) {
        const approve = await axios.get(
          `/api/1inch?url=https://api.1inch.dev/swap/v5.2/1/approve/transaction?tokenAddress=${tokenOne.address}`
        );
        setTxDetails(approve.data);
        console.log("Transaction approved");
      } else {
        console.log("Transaction not approved");
      }
      
      return;
    }
    const tx = await axios.get(
      `/api/1inch?url=https://api.1inch.dev/swap/v5.2/1/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(tokenOne.decimals+tokenOneAmount.length, '0')}&fromAddress=${address}&slippage=${slippage}`
    );

    let decimals = Number(`1E${tokenTwo.decimals}`)
    setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(2));

    setTxDetails(tx.data.tx);
  }

  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
  }, []);

  useEffect(() => {
    if (txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails]);

  useEffect(() => {
    messageApi.destroy();

    if (isLoading) {
      messageApi.open({
        type: "loading",
        content: "Transaction is Pending...",
        duration: 0,
      })
    }
  }, [isLoading]);

  useEffect(() => {
    messageApi.destroy();
     if (isSuccess) {
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
  }, [isSuccess]);

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

  const [isBoxExpanded, setIsBoxExpanded] = useState(false);

  // Function to toggle the box's expansion
  const toggleBoxExpansion = () => {
    setIsBoxExpanded(!isBoxExpanded);
  };

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
          <h4>SWAP</h4>
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
  <div className="balance1">
  Balance: {balance1.data?.formatted}
  </div>
  <div className="assetTwo" onClick={() => openModal(2)}>
    <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
    {tokenTwo.ticker}
    <DownOutlined />
  </div>
  <div className="balance2">
       Balance: {balance2.data?.formatted}
    </div>
      </div>

        <div
          className="swapButton"
          disabled={!tokenOneAmount || !isConnected || isLoading}
          onClick={fetchDexSwap}
        >
          {isLoading ? "Loading..." : "Swap"}
        </div>
        <>
        {contextHolder}
<div className="gas-container">
  <Popover
    content={
      <div className="popover-content">
        {prices && prices.tokenOne && prices.tokenTwo && (
          <div>
            <p>{`1 ${tokenOne.ticker} = ${prices.tokenOne.toFixed(2)} USDT (~$${prices.tokenOne.toFixed(2)})`}</p>
            <p>{`1 ${tokenTwo.ticker} = ${prices.tokenTwo.toFixed(2)} USDT (~$${prices.tokenTwo.toFixed(2)})`}</p>
          </div>
        )}
      </div>
    }
    title={null}
    trigger="click"
    placement="bottomLeft"
  >
    <InfoCircleOutlined className="info" />
  </Popover>
  <div className="price-container">
    <div className="price-content">
      {/* Display the price of tokenOne if it exists in prices */}
      {prices && prices.tokenOne && (
        <div className="token-price">
          {`1 ${tokenOne.ticker} = ${prices.tokenOne.toFixed(2)} USDT (~$${prices.tokenOne.toFixed(2)})`}
        </div>
      )}
    </div>
    <div className="gas-icon-container">
      {/* Use the Egas component with alignment */}
      <Egas size={16} className="my-gas-icon" units="gwei" alignRight />
    </div>
  </div>
</div>
    </>
       
      </div>
    </>
  );
}

export default Swap;