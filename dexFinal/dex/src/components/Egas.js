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
        if (gasPriceWei.lt(0)) {
          setError('Gas price is negative.');
          setGasPrice(null);
        } else {
          setGasPrice(gasPriceWei); // Store gas price as a BigNumber
        }
      } catch (error) {
        setError('Error converting gas price.');
        setGasPrice(null);
      }
    }
  }, [data, isError, isLoading]);

  if (isLoading) {
    return <div>Loading gas price...</div>;
  }

  if (isError || gasPrice === null) {
    return <div>Error: {error}</div>;
  }

  const gasValueWithSymbol = `~$${ethers.utils.formatEther(gasPrice).toString()}`;

  return (
    <div style={rowStyle} className={className || ''}>
      <MdLocalGasStation size={iconSize || 16} />
      <span style={{ fontSize: '12px' }}>{gasValueWithSymbol}</span>
      {units && <span style={{ fontSize: '12px' }}>{units.toUpperCase()}</span>}
    </div>
  );
};
