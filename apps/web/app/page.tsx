'use client';

import { authorize } from "@/utils/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import styles from './page.module.css';
import Link from "next/link";

export default function Login() {

  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

  return (
    <div className="flex h-screen bg-[url('/images/login-background.jpg')] bg-cover bg-center justify-center items-center">
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-16 lg:space-y-0 lg:space-x-16 justify-between w-4/5">
        <div className="flex-shrink-0 w-[213px] h-[126.4px] overflow-hidden">
          <Image
            src="/icons/aidd-login-icon.svg"
            alt="SynCoOp logo"
            priority
            width={213}
            height={126.4}
            className='w-full h-full object-contain'
          />
        </div>
        <div className="flex pr-10">
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
            <div className="mb-6 flex flex-col gap-2">
              <label htmlFor="password" className={styles.customEmailLabel}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`border border-gray-300 rounded-[4px] w-[476px] h-[40px] flex-shrink-0 p-3 bg-[#f8f8fc] text-[#838393] ${styles.customEmailInput}`}
                placeholder="Enter your password"
                required
              />
              <div className="w-96 h-5 justify-start items-start gap-1.5 inline-flex">
                <div className="w-3.5 h-3.5 relative">
                  <Image
                    src="/icons/info-icon.svg"
                    alt="!"
                    priority
                    width={14}
                    height={15}
                  />
                </div>
                <div className="grow shrink basis-0 self-stretch text-black text-sm font-bold font-['Lato'] leading-tight tracking-tight">
                  <Link href={'/login'}>
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-6 flex flex-col gap-2">
              <button type="submit" className="w-24 h-10 p-3 bg-[#0f69af] rounded flex-col justify-center items-center inline-flex">
                <div className="text-center text-white text-base font-bold font-['Lato'] leading-tight">
                  Login
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}