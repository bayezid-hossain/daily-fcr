import { cookies } from 'next/headers';

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
  const promise = loader();

  return (
    <div className="flex flex-col bg-white w-full  h-screen" key={uuid()}>
      <Navbar isUserApproved={true} />
      <Suspense fallback={<Loading />}>
        <Await promise={promise}>
          {(result) => {
            const dates: Date[] = result?.props?.data || [];
            return <Dates dates={dates} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
async function loader() {
  // Fetch data from external API
  try {
    console.log(cookies().get('token')?.value);
    const response = await axios.get(`${process.env.DOMAIN}/api/data/dates`, {
      withCredentials: true,
      headers: { token: cookies().get('token')?.value },
    });
    const data: Date[] = response.data.data;
    // console.log(response.data);

    return { props: { data } };
  } catch (error: any) {
    console.log(error.message);
  }

  // Pass data to the page via props
}
