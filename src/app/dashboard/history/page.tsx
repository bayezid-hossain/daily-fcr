import { getCookies } from 'next-client-cookies/server';
import React, { useEffect, useState } from 'react';
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
  let dates: Date[] = [];
  const cookies = getCookies();
  const token = cookies.get('token')?.toString();
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.DOMAIN}/api/data/dates`,
        { token }
      );

      dates = response.data.data;
    } catch (error: any) {
      console.error('Error fetching dates:', error.message);
    } finally {
    }
  };

  await fetchData();

  return (
    <div className="flex flex-col bg-white w-full h-screen" key={uuid()}>
      <Navbar isUserApproved={true} />

      <div className="flex flex-col">
        <p>{token}</p>
        <Dates dates={dates} />
      </div>
    </div>
  );
}
