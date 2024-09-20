'use client'

import { DropDownItem } from '@/lib/definition';
import { PopupBox } from '@/ui/popupBox';
import { clearSession } from '@/utils/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const dropDownItems: DropDownItem[] = [
    {
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

export default function Header() {
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const onItemSelected = async (value: string) => {
        if (value === 'Logout') {
            if (!await clearSession()) {
                router.push('/')
            }
        }
        setDropdownOpen(false)
    }

    return (
        <header className="relative top-0 left-0 w-full h-10 bg-themeBlueColor flex items-center justify-between px-4 shadow-sm">
            <div className="flex items-center space-x-4">
                <Image
                    src={"/icons/aidd-icon-shell.svg"}
                    alt="aidd icon"
                    width={267}
                    height={24}
                />
            </div>
            <div className="flex items-center space-x-4 relative">
                <Image
                    className="icon-help"
                    src={"/icons/help-icon.svg"}
                    alt="Help"
                    width={20}
                    height={20}
                />
                <Image
                    className="icon-bell"
                    src={"/icons/bell-icon.svg"}
                    alt="Bell"
                    width={20}
                    height={20}
                />
                <Image
                    className="icon-preferences"
                    src={"/icons/preferences-icon.svg"}
                    alt="Preferences"
                    width={20}
                    height={20}
                />
                <div className="relative flex items-center justify-center">
                    <Image priority
                        className="icon-cart"
                        src={"/icons/cart-icon.svg"}
                        alt="Cart"
                        width={33}
                        height={22} />
                    <div className="absolute flex items-center justify-center w-5 h-5 rounded-full bg-[#A5CD50] right-0">
                        <span className="text-black text-sm">12</span>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative">
                        <div className="flex items-center justify-center w-8.4 h-8.4 bg-white rounded-full cursor-pointer" onClick={toggleDropdown}>
                            <div className="flex items-center justify-center w-8 h-8 text-xl text-white bg-themeBlueColor rounded-full border-2 border-white">A</div>
                        </div>
                        <PopupBox
                            isOpen={dropdownOpen}
                            onItemSelected={(value: string) => onItemSelected(value)}
                            items={dropDownItems} />
                    </div>
                </div>
            </div>
        </header>);
}