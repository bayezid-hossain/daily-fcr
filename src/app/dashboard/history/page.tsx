import { cookies } from 'next/headers';
import { getCookies } from 'next-client-cookies/server';
import React, { ChangeEvent, Suspense, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import axios from 'axios';
import Loading from './loading';
import Await from '@/app/components/Await';
import { v4 as uuid } from 'uuid';
import Dates from '@/app/components/Dates';
interface Date {
  date: string;
}
export default async function LoginPage() {
  const cookies = getCookies();
  const token = cookies.get('token')?.toString();
  const promise = loader(token || '');

  return (
    <div className="flex flex-col bg-white w-full  h-screen" key={uuid()}>
      <Navbar isUserApproved={true} />
      <Suspense fallback={<Loading />}>
        <Await promise={promise}>
          {(result) => {
            const dates: Date[] = result?.props?.data || [];
            return (
              <div className="flex flex-col">
                <p>{token}</p>
                <Dates dates={dates} />
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
async function loader(cookies: string) {
  // Fetch data from external API
  try {
    const response = await axios.get(`${process.env.DOMAIN}/api/data/dates`, {
      withCredentials: true,
      headers: { token: cookies },
    });
    const data: Date[] = response.data.data;
    // console.log(response.data);

    return { props: { data } };
  } catch (error: any) {
    console.log(error.message);
  }

  // Pass data to the page via props
}
