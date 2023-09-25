import React from 'react';
import { MdLocalGasStation } from 'react-icons/md';
import { useFeeData } from 'wagmi';
import { formatUnits } from 'viem'; // Import viem's formatUnits function

const rowStyle = {
    display: 'flex',
    flexDirection: 'row', // Set the flex direction to "row"
    alignItems: 'center',
    gap: '0.2rem',
    lineHeight: '1.5',
    justifyContent: 'flex-end',
};

export const Egas = ({ iconSize, className, units }) => {
    const { data, isError, isLoading } = useFeeData();

    if (isError || isLoading) return <></>;

    // Convert the gas price to a float with 2 decimal places
    const gasPriceInWei = parseFloat(formatUnits(data?.formatted?.gasPrice || '0', 9)).toFixed(2); // Use viem's formatUnits function

    // Add "~$" to the left of the value
    const gasValueWithSymbol = `~$${gasPriceInWei}`;

    return (
        <div style={rowStyle} className={className || ''}>
            <MdLocalGasStation size={16} /> {/* Change the icon size to 16px */}
            <span style={{ fontSize: '12px' }}>
                {gasValueWithSymbol}
            </span>
            {units && <span style={{ fontSize: '12px' }}>{units.toUpperCase()}</span>}
        </div>
    );
};