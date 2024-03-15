'use client';

import Image from 'next/image';
import copy from 'clipboard-copy';
const data = [
  { age: 1, weight: 61, fcr: 0.207 },
  { age: 2, weight: 79, fcr: 0.37 },
  { age: 3, weight: 100, fcr: 0.499 },
  { age: 4, weight: 123, fcr: 0.601 },
  { age: 5, weight: 148, fcr: 0.682 },
  { age: 6, weight: 177, fcr: 0.749 },
  { age: 7, weight: 209, fcr: 0.803 },
  { age: 8, weight: 244, fcr: 0.848 },
  { age: 9, weight: 283, fcr: 0.887 },
  { age: 10, weight: 325, fcr: 0.92 },
  { age: 11, weight: 370, fcr: 0.949 },
  { age: 12, weight: 419, fcr: 0.975 },
  { age: 13, weight: 471, fcr: 0.999 },
  { age: 14, weight: 527, fcr: 1.021 },
  { age: 15, weight: 586, fcr: 1.042 },
  { age: 16, weight: 648, fcr: 1.062 },
  { age: 17, weight: 714, fcr: 1.082 },
  { age: 18, weight: 782, fcr: 1.101 },
  { age: 19, weight: 854, fcr: 1.12 },
  { age: 20, weight: 928, fcr: 1.138 },
  { age: 21, weight: 1006, fcr: 1.157 },
  { age: 22, weight: 1085, fcr: 1.175 },
  { age: 23, weight: 1168, fcr: 1.193 },
  { age: 24, weight: 1252, fcr: 1.212 },
  { age: 25, weight: 1339, fcr: 1.23 },
  { age: 26, weight: 1428, fcr: 1.248 },
  { age: 27, weight: 1518, fcr: 1.267 },
  { age: 28, weight: 1661, fcr: 1.285 },
  { age: 29, weight: 1704, fcr: 1.304 },
  { age: 30, weight: 1799, fcr: 1.32 },
  { age: 31, weight: 1895, fcr: 1.341 },
  { age: 32, weight: 1992, fcr: 1.36 },
];
import React, { useState } from 'react';
import StandardTable from './components/standardTable';

export default function Home() {
  const [formData, setFormData] = useState({
    farmerName: '',
    dlCode: '',
    location: '',
    totalDOCInput: '',
    strain: '',
    age: '',
    todayMortality: '',
    totalMortality: '',
    avgWeight: '',
    totalFeed: '',
    totalFeed510: '',
    totalFeed511: '',
    farmStock510: '',
    farmStock511: '',
    farmStock: '',
    disease: 'No',
    medicine: 'No',
  });
  const [msgData, setMsgData] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateFCR = (
    totalFeed: number,
    avgWeight: number,
    totalDOCInput: number
  ): number => {
    // Calculate FCR using the formula
    // FCR = Total Feed / (Total Weight Gain)
    const fcr = (
      (totalFeed * 50) /
      (totalDOCInput * (avgWeight / 1000))
    ).toFixed(4);
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(2);
    const formattedDate = `${day}.${month}.${year}`;
    const weight = data.find(
      (item) => item.age == Number(formData.age)
    )?.weight;
    const msg = `\n
    Date: ${formattedDate}\n
    Farmer: ${formData.farmerName}\n
    Location: ${formData.location}\n
    Total DOC Input: ${formData.totalDOCInput}\n
    Strain: ${formData.strain}\n
    Age: ${formData.age} days \n\n
    Today Mortality:${formData.todayMortality} pcs\n
    Total Mortality: ${formData.totalMortality} pcs\n
    Avg. Wt: ${formData.avgWeight} gm \n
    Std. Wt: ${weight} gm\n
    FCR: ${fcr}\n
    Std FCR: ${data.find((item) => item.age == Number(formData.age))?.fcr}\n
    \n
    Feed: ${totalFeed} Bags Running\n
    510: ${formData.totalFeed510} Bags\n
    511: ${formData.totalFeed511} Bags\n\n
    Farm Stock: \n
    510: ${formData.farmStock510} Bags\n
    511: ${formData.farmStock511} Bags\n
    \n
    Disease: ${formData.disease}\n
    Medicine: ${formData.medicine}
    `;
    setMsgData(msg);
    return Number(fcr);
  };
  const handleCopy = async () => {
    let dataToCopy = msgData;
    let stringWithoutConsecutiveNewlines = dataToCopy.replace(/\n(?!\n)/g, '');
    let stringWithoutSpaces = stringWithoutConsecutiveNewlines
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
    console.log(stringWithoutSpaces);
    await copy(stringWithoutSpaces);
    alert('Message copied to clipboard!');
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Calculate FCR
    const fcr = calculateFCR(
      Number(formData.totalFeed510) + Number(formData.totalFeed511) + 1,
      Number(formData.avgWeight),
      Number(formData.totalDOCInput) - Number(formData.totalMortality)
    );
  };
  return (
    <main className="bg-white flex min-h-screen items-center justify-center p-12 flex-col">
      <div className="flex flex-col items-center mb-12 w-full">
        <h1 className="bg-black text-black font-bold text-2xl italic px-4 py-2 mb-4">
          Daily FCR Calculator
        </h1>
        <div className="w-full">
          <div className="flex flex-row justify-around w-full mb-4 gap-x-4 lg:flex-col lg:gap-y-4">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-end text-black gap-y-2"
            >
              <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                <label className="font-bold text-lg">Farmer Name</label>
                <input
                  type="text"
                  id="farmerName"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                  className="border border-black px-1"
                />
              </div>{' '}
              <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                <label className="font-bold text-lg">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border border-black px-1"
                />
              </div>{' '}
              <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                <label className="font-bold text-lg">Total DOC Input</label>
                <input
                  type="number"
                  id="totalDOCInput"
                  name="totalDOCInput"
                  value={formData.totalDOCInput}
                  onChange={handleChange}
                  className="border border-black px-1"
                />
              </div>
              <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                <label className="font-bold text-lg">Strain</label>
                <input
                  type="text"
                  id="strain"
                  name="strain"
                  value={formData.strain}
                  onChange={handleChange}
                  className="border border-black px-1"
                />
              </div>
              <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                <label className="font-bold text-lg">Age (in days)</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="border border-black px-1"
                />
              </div>
              <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                <label className="font-bold text-lg">Today Mortality</label>
                <input
                  type="number"
                  id="todayMortality"
                  name="todayMortality"
                  value={formData.todayMortality}
                  onChange={handleChange}
                  className="border border-black px-1"
                />
              </div>
              <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                <label className="font-bold text-lg">Total Mortality</label>
                <input
                  type="number"
                  id="totalMortality"
                  name="totalMortality"
                  value={formData.totalMortality}
                  onChange={handleChange}
                  className="border border-black px-1"
                />
              </div>
              <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                <label className="font-bold text-lg">Avg. Weight (in gm)</label>
                <input
                  type="number"
                  id="avgWeight"
                  name="avgWeight"
                  value={formData.avgWeight}
                  onChange={handleChange}
                  className="border border-black px-1"
                />
              </div>{' '}
              <div className="flex flex-row justify-center items-center gap-x-4 my-4 w-full">
                <label className="w-full flex font-bold text-lg">
                  Total Feed
                </label>
                <div className="flex flex-col justify-center items-center gap-y-2">
                  <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                    <label>510</label>
                    <input
                      type="number"
                      id="totalFeed510"
                      name="totalFeed510"
                      value={formData.totalFeed510}
                      onChange={handleChange}
                      className="border border-black px-1"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                    <label>511</label>
                    <input
                      type="number"
                      id="totalFeed511"
                      name="totalFeed511"
                      value={formData.totalFeed511}
                      onChange={handleChange}
                      className="border border-black px-1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-normal items-center gap-x-4 my-4 w-full">
                <label className="w-full flex font-bold text-lg">
                  Farm Stock
                </label>
                <div className="flex flex-col justify-center items-center gap-y-2">
                  <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                    <label>510</label>
                    <input
                      type="number"
                      id="farmStock510"
                      name="farmStock510"
                      value={formData.farmStock510}
                      onChange={handleChange}
                      className="border border-black px-1"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                    <label>511</label>
                    <input
                      type="number"
                      id="farmStock511"
                      name="farmStock511"
                      value={formData.farmStock511}
                      onChange={handleChange}
                      className="border border-black px-1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                <label className="font-bold text-lg">Disease</label>
                <input
                  type="text"
                  id="disease"
                  name="disease"
                  value={formData.disease}
                  onChange={handleChange}
                  className="border border-black px-1"
                />
              </div>
              <div className="flex flex-row justify-between items-center gap-x-4 w-full">
                <label className="font-bold text-lg">Medicine</label>
                <input
                  type="text"
                  id="medicine"
                  name="medicine"
                  value={formData.medicine}
                  onChange={handleChange}
                  className="border border-black px-1"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 font-bold px-4 py-2 mt-4 rounded border border-black text-black"
              >
                Calculate FCR
              </button>
            </form>{' '}
            <div className="text-black whitespace-break-spaces leading-[.75] border border-black p-4 justify-center items-center">
              {msgData}
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-black font-semibold  px-4 py-2 mt-6 border border-black rounded w-full"
              >
                Copy Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <StandardTable />
    </main>
  );
}
