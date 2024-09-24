import Header from '@/components/Header/Header'
import Cryptr from 'cryptr';
import { cookies } from 'next/headers';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const sessionData: any = cookies().get('session');
  console.log('s', sessionData.value);
  const userData: any = new Cryptr(`${process.env.AUTH_SECRET}`).decrypt(sessionData.value);
  console.log('u', userData, userData.email, (JSON.stringify(userData) as any).email);
  return (
    <>
      <Header userData={userData} />
      {children}
    </>
  );
}