'use client';

import Image from 'next/image';
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

const calculateFCR = (totalFeed: number, avgWeight: number): number => {
  // Calculate FCR using the formula
  // FCR = Total Feed / (Total Weight Gain)
  return totalFeed / avgWeight;
};

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
    farmStock: '',
    disease: '',
    medicine: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Calculate FCR
    const fcr = calculateFCR(
      Number(formData.totalFeed),
      Number(formData.avgWeight)
    );
    alert(`FCR: ${fcr}`);
  };
  return (
    <main className="bg-white flex min-h-screen items-center justify-center p-12 flex-col">
      <div className="flex flex-col items-center mb-12">
        <h1 className="bg-black text-black font-bold text-lg px-4 py-2 mb-4">
          Daily FCR Calculator
        </h1>
        <div>
          <div className="flex flex-col mb-4">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center text-black"
            >
              <label htmlFor="farmerName">Farmer Name</label>
              <input
                type="text"
                id="farmerName"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="dlCode">DL Code</label>
              <input
                type="text"
                id="dlCode"
                name="dlCode"
                value={formData.dlCode}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="totalDOCInput">Total DOC Input</label>
              <input
                type="text"
                id="totalDOCInput"
                name="totalDOCInput"
                value={formData.totalDOCInput}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="strain">Strain</label>
              <input
                type="text"
                id="strain"
                name="strain"
                value={formData.strain}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="age">Age (in days)</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="todayMortality">Today Mortality</label>
              <input
                type="text"
                id="todayMortality"
                name="todayMortality"
                value={formData.todayMortality}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="totalMortality">Total Mortality</label>
              <input
                type="text"
                id="totalMortality"
                name="totalMortality"
                value={formData.totalMortality}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="avgWeight">Avg. Weight (in gm)</label>
              <input
                type="text"
                id="avgWeight"
                name="avgWeight"
                value={formData.avgWeight}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="totalFeed">Total Feed</label>
              <input
                type="text"
                id="totalFeed"
                name="totalFeed"
                value={formData.totalFeed}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="farmStock">Farm Stock</label>
              <input
                type="text"
                id="farmStock"
                name="farmStock"
                value={formData.farmStock}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="disease">Disease</label>
              <input
                type="text"
                id="disease"
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                className="border border-black"
              />

              <label htmlFor="medicine">Medicine</label>
              <input
                type="text"
                id="medicine"
                name="medicine"
                value={formData.medicine}
                onChange={handleChange}
                className="border border-black"
              />

              <button
                type="submit"
                className="bg-blue-500 font-bold px-4 py-2 mt-4 rounded border border-black text-black"
              >
                Calculate FCR
              </button>
            </form>
          </div>
        </div>
      </div>

      <StandardTable />
    </main>
  );
}
