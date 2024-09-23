"use client"

import { authorize } from "@/utils/auth";
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import styles from "./LoginForm.module.css"
import { Messages } from "@/utils/message";

export default function LoginForm() {
    const [message, setMessage] = useState('');
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const isValidated = await authorize(formData);
        if (isValidated) {
            if (Object(isValidated).hasOwnProperty('errors')) {
                console.log("Error");
            } else {
                router.push('/dashboard');
            }
        } else {
            console.log("False");
        }
        return false;
    }

    const handleForgotPassword = () => {
        setMessage('Please request System Admin to re-generate your password');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col w-[540px] h-[490px] p-[32px] gap-[10px] border-2 border-[#ECECF4] bg-white rounded-[8px]">
                <div className="mb-6 flex flex-col gap-2">
                    <Image
                        src="/icons/M-icon.svg"
                        alt="Merck logo"
                        priority
                        width={64}
                        height={30}
                    />
                </div>
                <div className="mb-6 flex flex-col gap-2">
                    <h1 className={styles.customHeadline}>
                        Welcome!
                    </h1>
                </div>
                <div className="mb-6 flex flex-col gap-2">
                    <label htmlFor="email" className={styles.customEmailLabel}>Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={`border border-gray-300 rounded-[4px] w-[476px] h-[40px] flex-shrink-0 p-3 bg-[#f8f8fc] text-[#838393] ${styles.customEmailInput}`}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className={styles.customEmailLabel}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`border border-gray-300 rounded-[4px] w-[476px] h-[40px] flex-shrink-0 p-3 bg-[#f8f8fc] text-[#838393] ${styles.customEmailInput}`}
                        placeholder="Enter your password"
                        required
                    />
                    <div className="flex gap-1.5">
                        <Image
                            src="/icons/info-icon.svg"
                            alt="Forgot Password"
                            priority
                            width={14}
                            height={15}
                        />
                        <span className="text-black text-sm font-bold leading-tight cursor-pointer" onClick={handleForgotPassword}>Forgot password?</span>
                    </div>
                </div>
                <div className={`mb-3 flex flex-col text-sm ${styles.errorMessage}`}>
                    {message && Messages.forgotPassword}
                </div>
                <div className="mb-6 flex flex-col gap-2">
                    <button type="submit" className="w-24 h-10 p-3 bg-[#0f69af] rounded justify-center items-center inline-flex text-white text-base font-bold font-['Lato'] leading-tight">Login</button>
                </div>
            </form>
        </div>
    )
} 