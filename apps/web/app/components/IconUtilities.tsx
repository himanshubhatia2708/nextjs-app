import React from 'react';
import Image from 'next/image';

type ImageRenderProps = {
    svgPath: string;
    iconName: string;
    width: number;
    height: number;
};
type UserIconProps = {
    initials: string,
    onClick?: () => void;
}

export const ImageRender: React.FC<ImageRenderProps> = ({ svgPath, iconName, width, height, }) => {
    return (
        <Image
            priority
            src={svgPath}
            alt={iconName}
            width={width}
            height={height}
        />
    );
};
export const UserIcon: React.FC<UserIconProps> = ({ initials, onClick }) => {
    return (
        <div className="flex items-center justify-center w-8.4 h-8.4 bg-white rounded-full" onClick={onClick}>
            <div className="flex items-center justify-center w-8 h-8 text-xl text-white bg-themeBlueColor rounded-full border-2 border-white">
                {initials}
            </div>
        </div>
    );
};

export function DynamicSvg({ initials, svgDetails }: { initials: string, svgDetails: ImageRenderProps }) {
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