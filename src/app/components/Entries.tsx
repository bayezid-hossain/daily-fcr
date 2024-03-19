'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { getCookies } from 'next-client-cookies/server';
import copy from 'clipboard-copy';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
interface Entry {
  _id: string;
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
  token: string;
}

const Entries: React.FC<EntriesProps> = ({ entries, token }) => {
  const [updatedEntries, setUpdatedEntries] = useState(entries); // Initialize entries state
  const [entryToDelete, setEntryToDelete] = useState('');
  const [visible, setVisible] = useState(false);
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
    await copy(stringWithoutSpaces);
    toast.success('Message copied to clipboard!');
  };
  if (!Array.isArray(entries) || entries.length == 0) {
    return <div>No entries available.</div>;
  }
  return (
    <div className="w-full h-full grid grid-cols-4 gap-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
      {updatedEntries.map((entry, index) => (
        <div
          className="rounded-lg shadow-lg p-6 m-4 mt-8 bg-white transition duration-300 transform hover:scale-110 text-black justify-start text-start ml-8 pl-10 z-0"
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEntryToDelete(entry._id);
              setVisible(true);
            }}
            className=" text-red-700 font-bold  px-4 py-2 mt-3 shadow-xl border-black rounded-lg w-auto hover:bg-[green]/20 col-span-2 sm:col-span-1 text-start z-10"
          >
            Remove Entry
          </button>
          <Dialog
            visible={visible}
            onHide={() => setVisible(false)}
            className="w-[30vw] sm:w-[45vw] xsm:w-[60vw] xsm:text-sm sm:text-base xl:text-sm bg-white-700/60 rounded-lg h-[20vh] flex items-center justify-between blur-effect-theme"
            header="Confirm Action"
            headerClassName="flex flex-row justify-between items-center w-full mx-8 px-6 py-2 bg-black/80 text-black rounded-t-lg odd:text-sm"
            closeOnEscape
            dismissableMask
            contentClassName="flex flex-col justify-center items-center w-full text-center text-black border-2 border-t-0 border-black/50 rounded-b-lg sm:text-sm"
          >
            <p>Are you sure you want to delete this entry?</p>
            <div className="flex justify-around items-center w-full mt-6">
              <button
                className="bg-green-500 p-2 px-4 font-semibold rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setVisible(false);
                }}
              >
                No
              </button>
              <button
                className="bg-red-700 font-semibold p-2 px-4 rounded-lg text-red-800"
                onClick={async (e) => {
                  e.stopPropagation();
                  setVisible(false);
                  try {
                    console.log(process.env.NEXT_PUBLIC_DOMAIN);
                    const response = await axios.post(
                      `${process.env.NEXT_PUBLIC_DOMAIN}/api/data/entries/delete`,
                      { token: token, _id: entryToDelete }
                    );
                    const newEntries = updatedEntries.filter(
                      (e) => e._id !== entryToDelete
                    );
                    setUpdatedEntries(newEntries); // Update entries state

                    toast.success('Entry Deleted');
                    setEntryToDelete('');
                  } catch (error: any) {
                    toast.error(error.message);
                  }
                }}
              >
                Yes
              </button>
            </div>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default Entries;
