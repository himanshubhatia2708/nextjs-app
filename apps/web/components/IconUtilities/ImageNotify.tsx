
import React from 'react';
import Image from 'next/image';

type ImageRenderProps = {
    svgPath: string;
    iconName: string;
    width: number;
    height: number;
};

export function ImageNotify({ initials, svgDetails }: { initials: string, svgDetails: ImageRenderProps }) {
    return (
        <div className="relative flex items-center justify-center">
            <Image priority
                src={svgDetails.svgPath}
                alt={svgDetails.iconName}
                width={svgDetails.width}
                height={svgDetails.height} />
            <div className="absolute flex items-center justify-center w-5 h-5 rounded-full bg-[#A5CD50] right-0">
                <span className="text-black text-sm">{initials}</span>
            </div>
        </div>
    );
}