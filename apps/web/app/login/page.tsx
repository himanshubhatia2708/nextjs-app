'use client';

import { authorize } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

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
        router.push('/profile');
      }
    } else {
      console.log("False");
    }
    return false;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <input type="text" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <input type="submit" name="submit" value="Submit" />
      </form>
    </div>
  )
}