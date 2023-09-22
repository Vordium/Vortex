import React from 'react'; // You need to import React
import { MdLocalGasStation } from 'react-icons/md';
import { useFeeData } from 'wagmi';
import { ethers } from 'ethers'; // Import ethers from 'ethers'

export const Egas = ({ size, className, units }) => {
    const { data, isError, isLoading } = useFeeData();

    if (isError || isLoading) return <></>;
    const valueInWei = ethers.utils.formatUnits(data?.formatted?.gasPrice || '0', 9); // Corrected the usage of formatUnits
    return (
        <div className="flex flex-col mt-1 cursor-default">
            <div className={`flex items-center gap-0.5 leading-3 ${className || ''}`}>
                <MdLocalGasStation size={size || ''} />
                <span className="">
                    {Math.round(Number(valueInWei))} {/* Use valueInWei instead of formatUnits */}
                </span>
            </div>
            {units && <span className="text-[10px] text-neutral-400 leading-3">{units}</span>}
        </div>
    );
};
