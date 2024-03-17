'use client';

import copy from 'clipboard-copy';

import React, { useState } from 'react';
import StandardTable from '../components/standardTable';
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { standardData } from '@/helpers/data';
export default function Home() {
  const [formData, setFormData] = useState({
    farmerName: '',
    location: '',
    totalDOCInput: '',
    strain: '',
    age: '',
    fcr: '',
    date: '',
    stdFcr: '',
    stdWeight: '',
    todayMortality: '',
    totalMortality: '',
    avgWeight: '',
    totalFeed510: '',
    totalFeed511: '',
    farmStock510: '',
    farmStock511: '',
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
    const weight = standardData.find(
      (item) => item.age == Number(formData.age)
    )?.weight;
    const stdFcr = standardData.find(
      (item) => item.age == Number(formData.age)
    )?.fcr;
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
    Std FCR: ${stdFcr}\n
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
    console.log(weight);
    console.log(stdFcr);
    setFormData({
      ...formData,
      date: formattedDate,
      fcr: fcr,
      stdWeight: weight ? weight.toString() : '',
      stdFcr: stdFcr ? stdFcr.toString() : '',
    });
    return Number(fcr);
  };
  const handleSave = async () => {
    try {
      const response = await axios.post('/api/data/entries/new', formData);
      console.log(response);
      console.log('Entry Saved success', response.data);
      toast.success('Entry success');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
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
    toast.success('Message copied to clipboard!');
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
    <main className="bg-white flex min-h-screen items-center justify-center  flex-col">
      <div className="flex flex-col items-center mb-12 w-full">
        <Navbar isUserApproved={true} />
        <h1 className="bg-black text-black font-bold text-2xl italic px-4 py-2 m-4">
          Daily FCR Calculator
        </h1>
        <div className="w-full rounded-lg shadow-lg p-6 m-4 mt-8 bg-white transition duration-300 transform hover:scale-110 text-black justify-start text-start ml-8 pl-10">
          <div className="flex flex-row justify-around w-full mb-4 gap-x-4 lg:flex-col lg:gap-y-4">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center text-black gap-y-2 px-6 rounded-lg shadow-2xl p-6 m-4 mt-8 bg-white transition duration-300 transform hover:scale-110  justify-start text-start ml-8 pl-10"
            >
              <label htmlFor="Farmer Name" className="blue-border-label">
                <input
                  type="text"
                  id="farmerName"
                  name="farmerName"
                  value={formData.farmerName}
                  onChange={handleChange}
                  className="peer text-input"
                  placeholder="Enter Farmer Name"
                  required
                />
                <span className="top-moving-span">Farmer Name</span>
              </label>
              <label htmlFor="Location" className="blue-border-label">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  className="peer text-input"
                  onChange={handleChange}
                  placeholder="Enter Location"
                  required
                />

                <span className="top-moving-span">Location</span>
              </label>
              <label htmlFor="Total DOC Input" className="blue-border-label">
                {' '}
                <input
                  type="number"
                  id="totalDOCInput"
                  name="totalDOCInput"
                  value={formData.totalDOCInput}
                  onChange={handleChange}
                  placeholder="Total DOC Input"
                  className="peer text-input"
                />
                <span className="top-moving-span">Total DOC Input</span>
              </label>
              <label className="blue-border-label">
                <input
                  type="text"
                  id="strain"
                  name="strain"
                  value={formData.strain}
                  onChange={handleChange}
                  className="peer text-input"
                  placeholder="Strain"
                />
                <span className="top-moving-span">Strain</span>
              </label>
              <label className="blue-border-label">
                {' '}
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="peer text-input"
                  placeholder="Age"
                />
                <span className="top-moving-span">Age (in days)</span>
              </label>
              <label className="blue-border-label">
                {' '}
                <input
                  type="number"
                  id="todayMortality"
                  name="todayMortality"
                  placeholder="Today Mortality"
                  value={formData.todayMortality}
                  onChange={handleChange}
                  className="peer text-input"
                />
                <span className="top-moving-span">Today Mortality</span>
              </label>
              <label className="blue-border-label">
                {' '}
                <input
                  type="number"
                  id="totalMortality"
                  name="totalMortality"
                  value={formData.totalMortality}
                  onChange={handleChange}
                  placeholder="totalMortality"
                  className="peer text-input"
                />
                <span className="top-moving-span">Total Mortality</span>
              </label>
              <label className="blue-border-label">
                <input
                  type="number"
                  id="avgWeight"
                  name="avgWeight"
                  value={formData.avgWeight}
                  onChange={handleChange}
                  className="peer text-input"
                  placeholder="Average Weight"
                />
                <span className="top-moving-span">Average Weight (in gm)</span>
              </label>
              <label className="w-full flex ">Total Feed</label>

              <label htmlFor="TotalFeed510" className="blue-border-label">
                <input
                  type="number"
                  id="totalFeed510"
                  name="totalFeed510"
                  value={formData.totalFeed510}
                  className="peer text-input"
                  placeholder="510"
                  onChange={handleChange}
                />
                <span className="top-moving-span">510</span>
              </label>

              <label className="blue-border-label">
                <input
                  type="number"
                  id="totalFeed511"
                  name="totalFeed511"
                  value={formData.totalFeed511}
                  onChange={handleChange}
                  className="peer text-input"
                  placeholder="511"
                />
                <span className="top-moving-span">511</span>
              </label>
              <label className="w-full flex ">Farm Stock</label>

              <label className="blue-border-label">
                <input
                  type="number"
                  id="farmStock510"
                  name="farmStock510"
                  value={formData.farmStock510}
                  onChange={handleChange}
                  placeholder="510"
                  className="peer text-input"
                />
                <span className="top-moving-span">510</span>
              </label>

              <label className="blue-border-label">
                <input
                  type="number"
                  id="farmStock511"
                  name="farmStock511"
                  value={formData.farmStock511}
                  onChange={handleChange}
                  className="peer text-input"
                  placeholder="511"
                />
                <span className="top-moving-span">511</span>
              </label>
              <label className="blue-border-label">
                <input
                  type="text"
                  id="disease"
                  name="disease"
                  value={formData.disease}
                  onChange={handleChange}
                  className="peer text-input"
                />
                <span className="top-moving-span">Disease</span>
              </label>
              <label className="blue-border-label">
                <input
                  type="text"
                  id="medicine"
                  name="medicine"
                  value={formData.medicine}
                  onChange={handleChange}
                  className="peer text-input"
                />
                <span className="top-moving-span">Medicine</span>
              </label>
              <button
                type="submit"
                className="bg-blue-500 font-bold px-4 py-2 mt-4 rounded border border-black text-black"
              >
                Calculate FCR
              </button>
            </form>{' '}
            <div className="text-black whitespace-break-spaces leading-[.75] border border-black p-4 justify-center items-center rounded-lg shadow-2xl m-4 mt-8 bg-white transition duration-300 transform hover:scale-110 text-start ml-8 pl-10">
              {msgData}
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-black font-semibold  px-4 py-2 mt-6 border border-black rounded w-full"
              >
                Copy Message
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-black font-semibold  px-4 py-2 mt-6 border border-black rounded w-full"
              >
                Save Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <StandardTable />
    </main>
  );
}
