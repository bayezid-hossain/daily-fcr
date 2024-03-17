'use client';
import Link from 'next/link';
import React, { ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    mobile: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);

  const handleMobileNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^[0-9+]*$/;

    if (regex.test(inputValue)) {
      setUser({ ...user, mobile: e.target.value });
    }
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.target.value });
  };

  const onRegistration = async () => {
    router.push('/registration');
  };
  const onLogin = async () => {
    try {
      if (
        (user.mobile.startsWith('+') && user.mobile.length != 14) ||
        (!user.mobile.startsWith('+') && user.mobile.length != 11)
      ) {
        toast.error('Invalid Mobile Number');
        return;
      }
      if (user.password.length <= 6) {
        toast.error('Password Too Small');
        return;
      }
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      // console.log('Login success', response.data);
      toast.success('Login success');
      router.push('/dashboard');
    } catch (error: any) {
      // console.log(error);
      // console.log('Login failed', error.message);
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('/assets/login-bg.png')] bg-blue-950 bg-blend-normal text-black">
      <div className="h-full w-full flex flex-col items-center justify-center min-h-screen bg-[url('/assets/bg-grid.svg')] bg-cover sm:bg-contain">
        <div className="bg-white flex flex-col items-center justify-center p-12 max-w-[70vw]">
          <div className="w-full flex flex-col items-center justify-center mb-2">
            <Image
              src={'/assets/logo.jpg'}
              height={1000}
              width={1000}
              alt=""
              className="h-[60px] w-[60px] mr-4"
            />
            <h1 className="text-center text-lg font-semibold ">
              Shadow IT Inc.
            </h1>
          </div>
          <Image
            src={'/assets/lock.png'}
            alt=""
            height={1000}
            width={1000}
            className="w-full h-auto"
          />
          <h4 className="text-center font-bold text-2xl m-4">
            Daily FCR Calculator
          </h4>
          <div className="flex flex-col w-full p-4">
            <h1 className=" w-full text-center p-2 mb-4 text-sm">
              {loading ? 'Processing' : 'Login with Mobile No. and Password'}
            </h1>
            <hr />

            <label htmlFor="Mobile Number" className="blue-border-label">
              <input
                type="text"
                className="peer text-input"
                id="mobile"
                value={user.mobile}
                placeholder="Enter Mobile number"
                pattern="[0-9+]*"
                onChange={handleMobileNumberChange}
                required
              />

              <span className="top-moving-span">Mobile Number</span>
            </label>

            <label htmlFor="password" className="blue-border-label">
              <input
                className="peer text-input"
                id="password"
                type="password"
                value={user.password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />

              <span className="top-moving-span">Password</span>
            </label>

            <button
              onClick={onLogin}
              className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled: font-bold`}
              //   disabled={buttonDisabled}
            >
              Login
            </button>
            <p className="w-full text-center text-sm p-2 ">
              Don&apos;t have an account?
            </p>
            <button
              onClick={onRegistration}
              className={`p-1  border-b border-t mt-2 border-black text-sm font-semibold`}
              //   disabled={buttonDisabled}
            >
              Create one now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
