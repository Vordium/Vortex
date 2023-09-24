import React, { useState, useEffect } from 'react';
import { MdLocalGasStation } from 'react-icons/md';
import { useFeeData } from 'wagmi';
import { ethers, BigNumber } from 'ethers'; // Import BigNumber from ethers

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

  useEffect(() => {
    if (!isError && !isLoading && data && data.formatted && data.formatted.gasPrice) {
      try {
        const gasPriceWei = BigNumber.from(data.formatted.gasPrice);
        const gasPriceEth = ethers.utils.formatEther(gasPriceWei);
        setGasPrice(parseFloat(gasPriceEth).toFixed(2));
      } catch (error) {
        console.error('Error converting gasPrice:', error);
        setGasPrice(null);
      }
    }
  }, [data, isError, isLoading]);

  if (isError || isLoading || gasPrice === null) return null;

  const gasValueWithSymbol = `~$${gasPrice}`;

  return (
    <div style={rowStyle} className={className || ''}>
      <MdLocalGasStation size={iconSize || 16} />
      <span style={{ fontSize: '12px' }}>{gasValueWithSymbol}</span>
      {units && <span style={{ fontSize: '12px' }}>{units.toUpperCase()}</span>}
    </div>
  );
};
