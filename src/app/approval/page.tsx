'use client';
import React, { ChangeEvent, useEffect } from 'react';
import Navbar from '../components/Navbar';
export default function LoginPage() {
  const text = 'Please wait while your account is approved by an admin';

  return (
    <div className="flex flex-col bg-white w-full h-screen">
      <Navbar isUserApproved={false} />

      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="w-16 h-16 relative p-4 mb-10">
            <div className="absolute w-full h-full rounded-full border-4 border-gray-500"></div>
            <div className="absolute w-full h-full rounded-full border-t-4 border-blue-500 animate-spin"></div>
          </div>
          <h1 className="overflow-hidden text-2xl font-bold leading-6 text-black lg:text-sm">
            {text.match(/./gu)!.map((char, index) => (
              <span
                className="animate-text-reveal inline-block [animation-fill-mode:backwards]"
                key={`${char}-${index}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
}
