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
            <div className="flex items-center justify-center w-8 h-8 text-xl text-white bg-shell-header rounded-full border-2 border-white">
                {initials}
            </div>
        </div>
    );
};

export function DynamicSvg({ initials }: { initials: string }) {
    return (
        <div className="relative flex items-center justify-center">
            <svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0.937744H4.83333L7.40167 13.7698C7.4893 14.211 7.72933 14.6074 8.07973 14.8894C8.43013 15.1715 8.86859 15.3214 9.31833 15.3127H18.6333C19.0831 15.3214 19.5215 15.1715 19.8719 14.8894C20.2223 14.6074 20.4624 14.211 20.55 13.7698L22.0833 5.72941H5.79167M20.1663 20.104C20.1663 20.6333 19.7372 21.0624 19.2078 21.0624C18.6785 21.0624 18.2494 20.6333 18.2494 20.104C18.2494 19.5746 18.6785 19.1455 19.2078 19.1455C19.7372 19.1455 20.1663 19.5746 20.1663 20.104ZM9.62486 20.104C9.62486 20.6333 9.19575 21.0624 8.66642 21.0624C8.13709 21.0624 7.70798 20.6333 7.70798 20.104C7.70798 19.5746 8.13709 19.1455 8.66642 19.1455C9.19575 19.1455 9.62486 19.5746 9.62486 20.104Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="15" y="0.937744" width="18" height="18" rx="9" fill="#A5CD50"/>
                <path d="M26.5 10.3577C26.5 10.9844 26.4317 11.5277 26.295 11.9877C26.1617 12.4444 25.9783 12.8227 25.745 13.1227C25.5117 13.4227 25.235 13.6461 24.915 13.7927C24.5983 13.9394 24.2583 14.0127 23.895 14.0127C23.5283 14.0127 23.1867 13.9394 22.87 13.7927C22.5567 13.6461 22.2833 13.4227 22.05 13.1227C21.8167 12.8227 21.6333 12.4444 21.5 11.9877C21.3667 11.5277 21.3 10.9844 21.3 10.3577C21.3 9.73108 21.3667 9.18774 21.5 8.72774C21.6333 8.26774 21.8167 7.88774 22.05 7.58774C22.2833 7.28441 22.5567 7.05941 22.87 6.91274C23.1867 6.76608 23.5283 6.69274 23.895 6.69274C24.2583 6.69274 24.5983 6.76608 24.915 6.91274C25.235 7.05941 25.5117 7.28441 25.745 7.58774C25.9783 7.88774 26.1617 8.26774 26.295 8.72774C26.4317 9.18774 26.5 9.73108 26.5 10.3577ZM25.575 10.3577C25.575 9.81108 25.5283 9.35274 25.435 8.98274C25.345 8.60941 25.2217 8.30941 25.065 8.08274C24.9117 7.85608 24.7333 7.69441 24.53 7.59774C24.3267 7.49774 24.115 7.44774 23.895 7.44774C23.675 7.44774 23.4633 7.49774 23.26 7.59774C23.0567 7.69441 22.8783 7.85608 22.725 8.08274C22.5717 8.30941 22.4483 8.60941 22.355 8.98274C22.265 9.35274 22.22 9.81108 22.22 10.3577C22.22 10.9044 22.265 11.3627 22.355 11.7327C22.4483 12.1027 22.5717 12.4011 22.725 12.6277C22.8783 12.8544 23.0567 13.0177 23.26 13.1177C23.4633 13.2144 23.675 13.2627 23.895 13.2627C24.115 13.2627 24.3267 13.2144 24.53 13.1177C24.7333 13.0177 24.9117 12.8544 25.065 12.6277C25.2217 12.4011 25.345 12.1027 25.435 11.7327C25.5283 11.3627 25.575 10.9044 25.575 10.3577Z" fill="black"/>
            </svg>
            <div className="absolute flex items-center justify-center w-5 h-5 rounded-full bg-[#A5CD50] right-0">
                <span className="text-black text-sm">{initials}</span>
            </div>
        </div>
    );
}