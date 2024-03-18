'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
interface Date {
  date: string;
}

interface DateProps {
  dates: Date[];
}
const Dates: React.FC<DateProps> = ({ dates }) => {
  const router = useRouter();
  const handleDateClick = async (date: string) => {
    router.push(`/dashboard/history/${date}`);
  };
  console.log(dates);
  if (!Array.isArray(dates)) {
    return <div>No entries available.</div>;
  }
  return (
    <div className="w-full h-full grid grid-cols-3 gap-4 xl:grid-cols-2 sm:grid-cols-1">
      {dates.map((date, index) => (
        <div
          key={index}
          className="rounded-lg shadow-xl p-6 m-4 bg-white transition duration-300 transform hover:scale-110 text-black justify-start text-center h-[72px]"
          onClick={() => handleDateClick(date.date)}
        >
          <button className="h-full">
            <span className="font-bold text-lg">Date:</span> {date.date}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dates;
