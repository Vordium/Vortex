import React from 'react';
import { MdLocalGasStation } from 'react-icons/md';
import { useFeeData } from 'wagmi';
import { isBytes } from 'viem';

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

    // Check if gasPriceString is a valid BigInt string using viem's isBytes
    const isGasPriceValid = isBytes(gasPriceString);

    // Provide a default value (0) if gasPriceString is not valid
    const gasPriceInWei = isGasPriceValid
        ? (parseFloat(gasPriceString) / 1e9).toFixed(2)
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
