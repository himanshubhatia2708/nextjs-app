"use client"

import { useState } from "react";
import CustomDropdown from "../common/DropDown";

type UserIconProps = {
    initials: string,
    onClick?: () => void;
}
type DropDownList = {
    label: string,
    value: string,
    link?: string,
}
const dropDownItems: DropDownList[] = [{
    label: 'username@miliporesigma.com',
    value: 'email',
},
{
    label: 'Profile',
    value: 'Profile',
    link: '/profile'
},
{
    label: 'Logout',
    value: 'Logout',
}
]
export const UserIcon: React.FC<UserIconProps> = ({ initials }) => {
    return (
        <div className="relative">
            <div className="flex items-center justify-center w-8.4 h-8.4 bg-white rounded-full cursor-pointer" onClick={toggleDropdown}>
                <div className="flex items-center justify-center w-8 h-8 text-xl text-white bg-themeBlueColor rounded-full border-2 border-white">
                    {initials}
                </div>
            </div>
            <CustomDropdown isOpen={dropdownOpen} onClose={onClose} dropDownItems={dropDownItems} />
        </div>
    );
};