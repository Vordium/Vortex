import React from 'react';
import { MdLocalGasStation } from 'react-icons/md';
import { useFeeData } from 'wagmi';
import { ethers } from 'ethers';

const rowStyle = {
    display: 'flex',
    flexDirection: 'row', // Set the flex direction to "row"
    alignItems: 'center',
    gap: '0.2rem',
    lineHeight: '1.5',
};

export const Egas = ({ iconSize, className, units }) => {
    const { data, isError, isLoading } = useFeeData();

    if (isError || isLoading) return <></>;

    // Capitalize the value by using toUpperCase()
    const valueInWei = ethers.utils.formatUnits(data?.formatted?.gasPrice || '0', 9).toUpperCase();

    // Add "~$" to the right of the value
    const gasValueWithSymbol = `${Math.round(Number(valueInWei))} ~$`;

    return (
        <div style={rowStyle} className={className || ''}>
            <MdLocalGasStation size={iconSize || 24} />
            <span style={{ fontSize: '12px' }}>
                {gasValueWithSymbol}
            </span>
            {units && <span style={{ fontSize: '12px' }}>{units.toUpperCase()}</span>}
        </div>
    );
};
