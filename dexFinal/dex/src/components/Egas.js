import React from 'react';
import { MdLocalGasStation } from 'react-icons/md';
import { useFeeData } from 'wagmi';
import { ethers } from 'ethers';

export const Egas = ({ iconSize, className, units }) => { // Renamed size prop to iconSize
    const { data, isError, isLoading } = useFeeData();

    if (isError || isLoading) return <></>;

    // Capitalize the value by using toUpperCase()
    const valueInWei = ethers.utils.formatUnits(data?.formatted?.gasPrice || '0', 9).toUpperCase();

    return (
        <div className="flex flex-col mt-1 cursor-default">
            <div className={`flex items-center gap-0.2 leading-3 ${className || ''}`}>
                <MdLocalGasStation size={iconSize || 18} /> {/* Set a default size (e.g., 24) */}
                <span style={{ fontSize: '12px' }}>
                    {Math.round(Number(valueInWei))}
                </span>
            </div>
            {units && <span style={{ fontSize: '12px' }} className="text-[10px] text-neutral-400 leading-3">{units.toUpperCase()}</span>}
        </div>
    );
};
