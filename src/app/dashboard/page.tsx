'use client';

import copy from 'clipboard-copy';

import React, { useState } from 'react';
import StandardTable from '../components/standardTable';
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { standardData } from '@/helpers/data';
export default function Home() {
  const defaultFormData = {
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
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [msgData, setMsgData] = useState('');
  const [visibility, setVisibility] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (
      name === 'age' &&
      (Number(value) < 1 || Number(value) > 32) &&
      value != ''
    ) {
      return; // Do not update state if value is out of range
    }

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
      setFormData(defaultFormData);
      setVisibility(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };
  const handleCopy = async () => {
    let dataToCopy = msgData;
    if (msgData == '') {
      toast.error('Nothing to copy');
      return;
    }
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
    const messageDiv = document.getElementById('message_div');
    if (messageDiv) {
      setVisibility(true);
      setTimeout(() => {
        messageDiv.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };
  return (
    <main className="bg-white flex min-h-screen items-center justify-center  flex-col">
      <div className="flex flex-col items-center mb-12 w-full">
        <Navbar isUserApproved={true} />
        <h3 className="bg-black text-black font-bold text-3xl italic px-4 py-2 m-4 mt-8 z-[1] shadow-lg animate-animate-blink cursor-none">
          Daily FCR Calculator
        </h3>
        <div className="w-full rounded-lg shadow-lg p-6 m-4 mt-8 bg-white transition duration-300 transform text-black justify-start text-start ml-8 pl-10 md:p-2 md:pl-5 md:m-2 md:ml-4 md:mt-4">
          <div className="flex flex-row justify-around w-full mb-4 gap-x-4 lg:flex-col lg:gap-y-4">
            <form
              onSubmit={handleSubmit}
              className=" grid grid-cols-2 items-center text-black gap-y-2 px-6 rounded-lg gap-x-6 shadow-2xl p-6 m-4 mt-8 bg-white transition duration-300 transform hover:scale-105  justify-start text-start ml-8 pl-10 sm:grid-cols-1 md:p-3 md:m-2 sm:p-6 sm:m-4"
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                  value={formData.avgWeight}
                  onChange={handleChange}
                  className="peer text-input"
                  placeholder="Average Weight"
                />
                <span className="top-moving-span">Average Weight (in gm)</span>
              </label>
              <div>
                <label className="w-full flex m-4 font-semibold ">
                  Total Feed
                </label>

                <label htmlFor="TotalFeed510" className="blue-border-label">
                  <input
                    type="number"
                    id="totalFeed510"
                    name="totalFeed510"
                    required
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
                    required
                    id="totalFeed511"
                    name="totalFeed511"
                    value={formData.totalFeed511}
                    onChange={handleChange}
                    className="peer text-input"
                    placeholder="511"
                  />
                  <span className="top-moving-span">511</span>
                </label>
              </div>
              <div>
                <label className="w-full flex m-4 font-semibold">
                  Farm Stock
                </label>

                <label className="blue-border-label">
                  <input
                    type="number"
                    id="farmStock510"
                    name="farmStock510"
                    required
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
                    required
                    value={formData.farmStock511}
                    onChange={handleChange}
                    className="peer text-input"
                    placeholder="511"
                  />
                  <span className="top-moving-span">511</span>
                </label>
              </div>
              <label className="blue-border-label">
                <input
                  type="text"
                  id="disease"
                  name="disease"
                  required
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
                  required
                  value={formData.medicine}
                  onChange={handleChange}
                  className="peer text-input"
                />
                <span className="top-moving-span">Medicine</span>
              </label>
              <button
                type="submit"
                className="bg-[skyblue]/50 text-black font-semibold  px-4 py-4 mt-6 shadow-xl border-black rounded-full w-full hover:bg-[green]/20 col-span-2 sm:col-span-1"
              >
                Calculate FCR
              </button>
            </form>{' '}
            <div
              className={`text-black whitespace-break-spaces leading-[.75] p-4 justify-center items-center rounded-lg shadow-2xl m-4 mt-8 bg-white transition duration-300 transform hover:scale-105 text-start ml-8 pl-10 ${
                visibility ? 'block' : 'hidden'
              } animate-color-change`}
              id="message_div"
            >
              {msgData}
              <button
                onClick={handleCopy}
                className="bg-[skyblue]/50 text-black font-semibold  px-4 py-4 mt-6 shadow-xl border-black rounded-full w-full hover:bg-[green]/20"
              >
                Copy Message
              </button>
              <button
                onClick={handleSave}
                className="bg-[skyblue]/50 text-black font-semibold  px-4 py-4 mt-6 shadow-xl border-black rounded-full w-full hover:bg-[green]/20"
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
