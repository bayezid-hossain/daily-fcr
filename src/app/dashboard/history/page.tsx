import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import React, { ChangeEvent, Suspense, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import axios from 'axios';
import Loading from './loading';
import Await from '@/app/components/Await';
import { v4 as uuid } from 'uuid';
import Dates from '@/app/components/Dates';
import toast from 'react-hot-toast';
interface Date {
  date: string;
}
export default async function LoginPage() {
  const promise = loader();
  console.log(cookies().get('token')?.value);
  return (
    <div className="flex flex-col bg-white w-full  h-screen" key={uuid()}>
      <Navbar isUserApproved={true} />
      <Suspense fallback={<Loading />}>
        <Await promise={promise}>
          {(result) => {
            const dates: Date[] = result?.props?.data || [];
            return (
              <div className="flex flex-col">
                <p>{result?.props?.cookie || 'nothing'}</p>
                <Dates dates={dates} />
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
async function loader() {
  // Fetch data from external API
  const cok = getCookie('token', { cookies });
  try {
    const response = await axios.post(
      `${process.env.DOMAIN}/api/data/dates`,
      null,
      {
        headers: {
          Cookie: cookies().toString(),
        },
        withCredentials: true,
      }
    );
    const data: Date[] = response.data.data;
    // console.log(response.data);

    return { props: { data, cookie: cok } };
  } catch (error: any) {
    console.log(error.message);
  }

  // Pass data to the page via props
}
