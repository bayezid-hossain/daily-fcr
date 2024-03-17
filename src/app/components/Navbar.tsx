'use client';
import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
interface NavbarProps {
  isUserApproved: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isUserApproved }) => {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.post('/api/users/logout');
      // console.log(response);
      toast.success('Logout successful');
      router.replace('/login');
      router.refresh();
    } catch (error: any) {
      // console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-[90px] bg-[green]/40">
      <div>
        {' '}
        <Image
          src={'/assets/logo.jpg'}
          height={1000}
          width={1000}
          alt=""
          className="h-[60px] w-[60px] mx-8 my-2"
        />
      </div>
      <div className="flex justify-center items-center gap-4 mr-8">
        <button
          className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${
            !isUserApproved ? 'hidden' : ''
          }`}
          onClick={() => {
            router.push('/dashboard/');
          }}
        >
          Dashboard
        </button>{' '}
        <button
          className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${
            !isUserApproved ? 'hidden' : ''
          }`}
          onClick={() => {
            router.push('/dashboard/history');
          }}
        >
          View History
        </button>{' '}
        <ArrowTopRightOnSquareIcon
          className="h-[30px] text-white hover:cursor-pointer "
          onClick={logout}
        ></ArrowTopRightOnSquareIcon>
      </div>
    </div>
  );
};

export default Navbar;
