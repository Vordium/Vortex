import React, { useState, useEffect } from 'react';
import { MdLocalGasStation } from 'react-icons/md';
import { useFeeData } from 'wagmi';
import { ethers, BigNumber } from 'ethers';

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.2rem',
  lineHeight: '1.5',
  justifyContent: 'flex-end',
};

export const Egas = ({ iconSize, className, units }) => {
  const { data, isError, isLoading } = useFeeData();
  const [gasPrice, setGasPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isError && !isLoading && data && data.formatted && data.formatted.gasPrice) {
      try {
        const gasPriceWei = BigNumber.from(data.formatted.gasPrice);
        console.log('Gas Price (Wei):', gasPriceWei.toString());

        if (gasPriceWei.lt(0)) {
          setError('Gas price is negative.');
          setGasPrice(null);
        } else {
          const gasPriceEth = ethers.utils.formatEther(gasPriceWei);
          console.log('Gas Price (Ether):', gasPriceEth);
          const formattedGasPrice = parseFloat(gasPriceEth).toFixed(2);
          console.log('Formatted Gas Price:', formattedGasPrice);
          setGasPrice(formattedGasPrice);
        }
      } catch (error) {
        console.error('Error converting gasPrice:', error);
        setError('Error converting gas price.');
        setGasPrice(null);
      }
    }
  }, [data, isError, isLoading]);

  if (isError || isLoading || gasPrice === null || error) {
    // Display an error message if there's an issue
    return <div>Error: {error || 'Gas price data is missing or invalid.'}</div>;
  }

  const gasValueWithSymbol = `~$${gasPrice}`;

  return (
    <div style={rowStyle} className={className || ''}>
      <MdLocalGasStation size={iconSize || 16} />
      <span style={{ fontSize: '12px' }}>{gasValueWithSymbol}</span>
      {units && <span style={{ fontSize: '12px' }}>{units.toUpperCase()}</span>}
    </div>
  );
};
