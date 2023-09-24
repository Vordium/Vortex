import React from 'react';
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

const Egas = ({ iconSize = 16, className = '', units = '' }) => {
  const { data, isError, isLoading } = useFeeData();

  if (isError || isLoading || !data || !data.formatted || !data.formatted.gasPrice) {
    return null; // Handle missing or invalid data
  }

  // Attempt to convert gasPrice to a BigNumber
  let gasPriceInWei;
  try {
    gasPriceInWei = BigNumber.from(data.formatted.gasPrice); // Use BigNumber.from to convert
  } catch (error) {
    console.error('Error converting gasPrice to BigNumber:', error);
    return null; // Handle the conversion error gracefully
  }

  // Add "~$" to the left of the value
  const gasValueWithSymbol = `~$${gasPriceInWei.toNumber().toFixed(2)}`;

  return (
    <div style={rowStyle} className={className}>
      <MdLocalGasStation size={iconSize} />
      <span style={{ fontSize: '12px' }}>{gasValueWithSymbol}</span>
      {units && <span style={{ fontSize: '12px' }}>{units.toUpperCase()}</span>}
    </div>
  );
};

export default Egas;
