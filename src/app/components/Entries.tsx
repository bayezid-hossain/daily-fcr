'use client';
import React from 'react';
import toast from 'react-hot-toast';

import copy from 'clipboard-copy';
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

interface EntriesProps {
  entries: Entry[];
}

const Entries: React.FC<EntriesProps> = ({ entries }) => {
  const handleCopy = async (entry: Entry) => {
    const msg = `\n
    Date: ${entry.date}\n
    Farmer: ${entry.farmerName}\n
    Location: ${entry.location}\n
    Total DOC Input: ${entry.totalDOCInput}\n
    Strain: ${entry.strain}\n
    Age: ${entry.age} days \n\n
    Today Mortality:${entry.todayMortality} pcs\n
    Total Mortality: ${entry.totalMortality} pcs\n
    Avg. Wt: ${entry.avgWeight} gm \n
    Std. Wt: ${entry.stdWeight} gm\n
    FCR: ${entry.fcr}\n
    Std FCR: ${entry.stdFcr}\n
    \n 
    Feed: ${entry.totalFeed[510] + entry.totalFeed[511] + 1} Bags Running\n
    510: ${entry.totalFeed[510]} Bags\n
    511: ${entry.totalFeed[511]} Bags\n\n
    Farm Stock: \n
    510: ${entry.farmStock[510]} Bags\n
    511: ${entry.farmStock[511]} Bags\n
    \n
   
    Disease: ${entry.disease}\n
    Medicine: ${entry.medicine}
    `;
    let dataToCopy = msg;
    let stringWithoutConsecutiveNewlines = dataToCopy.replace(/\n(?!\n)/g, '');
    let stringWithoutSpaces = stringWithoutConsecutiveNewlines
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
    console.log(stringWithoutSpaces);
    await copy(stringWithoutSpaces);
    toast.success('Message copied to clipboard!');
  };
  //   console.log(entries);
  if (!Array.isArray(entries)) {
    return <div>No entries available.</div>;
  }
  return (
    <div className="w-full h-full grid grid-cols-4 gap-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
      {entries.map((entry, index) => (
        <div
          className="rounded-lg shadow-lg p-6 m-4 mt-8 bg-white transition duration-300 transform hover:scale-110 text-black justify-start text-start ml-8 pl-10"
          onClick={() => {
            handleCopy(entry);
          }}
          key={index}
        >
          <p className="font-bold text-xl mb-4">Entry Details</p>
          <p className="text-sm">
            <span className="font-bold">Date:</span> {entry.date}
          </p>
          <p className="text-sm">
            <span className="font-bold">Farmer Name:</span> {entry.farmerName}
          </p>
          <p className="text-sm">
            <span className="font-bold">Location:</span> {entry.location}
          </p>
          <p className="text-sm">
            <span className="font-bold">Total DOC Input:</span>{' '}
            {entry.totalDOCInput}
          </p>
          <p className="text-sm">
            <span className="font-bold">Strain:</span> {entry.strain}
          </p>
          <p className="text-sm">
            <span className="font-bold">Age:</span> {entry.age} days
          </p>
          <br></br>
          <p className="text-sm">
            <span className="font-bold">Today Mortality:</span>{' '}
            {entry.todayMortality} pcs
          </p>
          <p className="text-sm">
            <span className="font-bold">Total Mortality:</span>{' '}
            {entry.totalMortality} pcs
          </p>
          <p className="text-sm">
            <span className="font-bold">Avg. Weight:</span> {entry.avgWeight} gm
          </p>
          <p className="text-sm">
            <span className="font-bold">Std. Weight:</span> {entry.stdWeight} gm
          </p>
          <p className="text-sm">
            <span className="font-bold">FCR:</span> {entry.fcr}
          </p>
          <p className="text-sm">
            <span className="font-bold">Std. FCR:</span> {entry.stdFcr}
          </p>
          <br />

          <p className="text-sm">
            <span className="font-bold">
              Feed: {entry.totalFeed[510] + entry.totalFeed[511] + 1} Bags
              Running:
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold">510:</span> {entry.totalFeed[510]} Bags
          </p>
          <p className="text-sm">
            <span className="font-bold">511:</span> {entry.totalFeed[511]} Bags
          </p>
          <p className="text-sm">
            <span className="font-bold"> Farm Stock:</span>
          </p>
          <p className="text-sm">
            <span className="font-bold">510:</span> {entry.farmStock[510]} Bags
          </p>
          <p className="text-sm">
            <span className="font-bold">511:</span> {entry.farmStock[511]} Bags
          </p>
          <p className="text-sm">
            <span className="font-bold">Disease:</span> {entry.disease}
          </p>
          <p className="text-sm">
            <span className="font-bold">Medicine:</span> {entry.medicine}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Entries;
