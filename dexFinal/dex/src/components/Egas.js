/* eslint-disable no-undef */ // This line tells ESLint to ignore 'BigInt' as an undefined variable

import React from 'react';
import { MdLocalGasStation } from 'react-icons/md';
import { useFeeData } from 'wagmi';

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

    if (isError || isLoading) return <></>;

    // Convert the gas price to a float with 2 decimal places using native BigInt
    const gasPriceInWei = (BigInt(data?.formatted?.gasPrice || '0') / BigInt(10 ** 9)).toString();
    const gasValueWithSymbol = `~$${(gasPriceInWei / 100).toFixed(2)}`;

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
