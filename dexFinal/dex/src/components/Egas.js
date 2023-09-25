import React from 'react';
import { MdLocalGasStation } from 'react-icons/md';
import { useFeeData } from 'wagmi';
import { ethers } from 'ethers';

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
    const gasPriceString = data?.formatted?.gasPrice || '0';

    // Check if gasPriceString is a valid BigNumber string
    const isGasPriceValid = ethers.BigNumber.isBigNumber(gasPriceString);

    // Provide a default value (0) if gasPriceString is not valid
    const gasPriceInWei = isGasPriceValid
        ? parseFloat(ethers.utils.formatUnits(gasPriceString, 9)).toFixed(2)
        : 0;

    const gasValueWithSymbol = `~$${gasPriceInWei}`;

    if (isError || isLoading) return <></>;

    return (
        <div style={rowStyle} className={className || ''}>
            <MdLocalGasStation size={16} />
            <span style={{ fontSize: '12px' }}>
                {gasValueWithSymbol}
            </span>
            {units && <span style={{ fontSize: '12px' }}>{units.toUpperCase()}</span>}
        </div>
    );
};
