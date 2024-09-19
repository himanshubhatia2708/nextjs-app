import React from 'react';
import Image from 'next/image';

type ImageRenderProps = {
    svgPath: string;
    iconName: string;
    width: number;
    height: number;
};

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