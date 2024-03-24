"use client"

import React, { useState, FormEvent } from 'react'
import { CustomInput, CustomButton } from '@/components';
import { BsArrowRightShort } from 'react-icons/bs';
import { login } from '@/services/auth';
import { toast } from 'sonner';
import { setCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUserLogin } from '@/redux/actions/AuthAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.AuthReducer);

  const router = useRouter();

  const [inputField, setInputField] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputField({ ...inputField, [name]: value });
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await login(inputField);
    if (data.status) {
      toast.success(data.message);
      setCookie('accessToken', data.data.accessToken);
      dispatch(AuthUserLogin(data.data.admin));
      router.push('/dashboard');
    }
    else {
      toast.error(data.message);
    }
  }

  if (auth) {
    router.push('/dashboard');
  }
  
  return (
    <React.Fragment>
      <figure>
        <form className="space-y-6" onSubmit={(event) => handleFormSubmit(event)}>

          <div className="space-y-3">
            <h1 className="font-semibold text-ascent text-4xl">Sign In</h1>
            <p className="text-xs text-gray-500">Enter your email and password to sign in!</p>
          </div>

          <CustomInput value={inputField.email} handleChange={(event) => handleInputChange(event)} name='email' type='email' placeHolder='Email Address' label='Email Address' required={true} />
          <CustomInput value={inputField.password} handleChange={(event) => handleInputChange(event)} name='password' type='password' placeHolder='Password' label='Password' required={true} />

          <CustomButton type='submit' text='Submit' styles='w-full' theme='primary' rightIcon={<BsArrowRightShort size={20} strokeWidth={0.5} className='ml-1' />} />

          <div>
            <p className="text-xs">Forgot your password ? <Link href="/auth/forgot-password" className="link">Reset Password</Link></p>
          </div>

        </form>
      </figure>
    </React.Fragment>
  )
}

export default Login
