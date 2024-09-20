import Link from 'next/link';

import React from 'react';
import { BreadCrumbsObj } from '@/lib/definition';
import Image from 'next/image';

const Breadcrumb: React.FC<BreadCrumbsObj[]> = (breadcrumbs) => {
    return (
        <nav className="absolute flex items-center px-4 w-full h-9 left-0 top-10">
            {breadcrumbs.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className="ml-1 flex items-center text-[#8B8B9C] font-lato font-normal text-[14px] leading-[20px] text-center">
                    <Image
                        src={item.svgPath}
                        iconName={item.label}
                        width={item.svgWidth}
                        height={item.svgHeight}
                    />
                    <span className={`ml-2 ${item.isActive ? 'text-[#0F69AF]' : 'text-[#8B8B9C]'}`}>{item.label}</span>
                    <span className={`text-gray-600 ml-2 ${item.isActive ? 'text-[#0F69AF]' : 'text-[#8B8B9C]'}`}> &gt; </span>
                </Link>
            ))}
        </nav>
    );
};

export default Breadcrumb;