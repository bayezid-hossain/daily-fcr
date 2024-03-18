import { cookies, headers } from 'next/headers';
import React, { ChangeEvent, Suspense, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import Loading from './loading';
import Await from '@/app/components/Await';
import Entries from '@/app/components/Entries';
import { v4 as uuid } from 'uuid';
import { getCookies } from 'next-client-cookies/server';
interface Entry {
  date: string;
  farmerName: string;
  location: string;
  totalDOCInput: number;
  strain: string;
  fcr: string;
  stdFcr: string;
  stdWeight: string;
  avgWeight: string;
  age: number;
  todayMortality: number;
  totalMortality: number;
  disease: string;
  medicine: string;
  totalFeed: {
    510: string;
    511: string;
  };
  farmStock: {
    510: string;
    511: string;
  };
}
export default async function EntriesPage({
  params,
}: {
  params: { date: string };
}) {
  const { date } = params;
  const cookies = getCookies();
  const token = cookies.get('token')?.toString();

  const promise = loader(date, token || '');
  return (
    <div className="flex flex-col bg-white w-full  h-screen" key={uuid()}>
      <Navbar isUserApproved={true} />
      <Suspense fallback={<Loading />}>
        <Await promise={promise}>
          {(result) => {
            const entries: Entry[] = result?.props?.data || [];
            return <Entries entries={entries} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
async function loader(date: string, token: string) {
  // Fetch data from external API
  try {
    const response = await axios.post(
      `${process.env.DOMAIN}/api/data/entries/${date}`,
      { token: token, date: date }
    );
    const data: Entry[] = response.data.data;
    // console.log(response.data);

    return { props: { data } };
  } catch (error: any) {
    console.log(error);
  }

  // Pass data to the page via props
}
