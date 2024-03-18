import { getCookies } from 'next-client-cookies/server';
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Dates from '@/app/components/Dates';

interface Date {
  date: string;
}

export default async function HistoryPage() {
  let dates: Date[] = [];
  const cookies = getCookies();
  const token = cookies.get('token')?.toString();
  const response = await axios.post(
    `https://daily-fcr.vercel.app/api/data/dates`,
    {
      token: token,
    }
  );
  console.log(response.data);

  return (
    <div className="flex flex-col bg-white w-full h-screen" key={uuid()}>
      <Navbar isUserApproved={true} />

      <div className="flex flex-col">
        <p>{token}</p>
        {response.data?.data.map((date: any, index: any) => (
          <p key={index}>{date.date}</p>
        ))}
        <p>{}</p>
        <Dates dates={dates} />
      </div>
    </div>
  );
}
