"use client"

import React, { useState, FormEvent } from 'react'
import { CustomInput, CustomButton } from '@/components';
import { BsArrowRightShort } from 'react-icons/bs';
import { resetPassword, sendPasswordResetOtp } from '@/services/auth';
import { toast } from 'sonner';
import { setCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUserLogin } from '@/redux/actions/AuthAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ForgotPassword = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state: any) => state.AuthReducer);

  const router = useRouter();

  const [isOtpSent, setOtpSentState] = useState(false);

  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    password: ""
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputField({ ...inputField, [name]: value });
  }

  const handleSendResetOtp = async () => {
    const data = await sendPasswordResetOtp({
      email: inputField.email
    });
    if (data.status) {
      toast.success(data.message);
      setOtpSentState(true);
    }
    else {
      toast.error(data.message);
    }
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await resetPassword(inputField);
    if (data.status) {
      toast.success(data.message);
      router.push('/auth/login');
    }
    else {
      toast.error(data.message);
    }
  }

  return (
    <React.Fragment>
      <figure>
        <form className="space-y-6" onSubmit={(event) => handleFormSubmit(event)}>

          <div className="space-y-3">
            <h1 className="font-semibold text-ascent text-4xl">Forgot Password?</h1>
            <p className="text-xs text-gray-500">Enter your email to get password reset OTP</p>
          </div>

          <div className='space-y-6'> 

            <CustomInput value={inputField.email} handleChange={(event) => handleInputChange(event)} name='email' type='email' placeHolder='Email Address' label='Email Address' required={true} isHidden={isOtpSent} />

            {isOtpSent ?
              <div className='space-y-6'>

                <CustomInput value={inputField.otp} handleChange={(event) => handleInputChange(event)} name='otp' type='number' placeHolder='Verification OTP (6 Digits)' label='Verification OTP' required={true} />

                <CustomInput value={inputField.password} handleChange={(event) => handleInputChange(event)} name='password' type='password' placeHolder='New Passsword' label='Set Password' required={true} />

                <CustomButton type='submit' text='Rest Password' styles='w-full' theme='primary' rightIcon={<BsArrowRightShort size={20} strokeWidth={0.5} className='ml-1' />} />

              </div>
              :
              <>
                <CustomButton type='button' handleClick={() => handleSendResetOtp()} text='Send Rest OTP' styles='w-full' theme='primary' rightIcon={<BsArrowRightShort size={20} strokeWidth={0.5} className='ml-1' />} />
              </>
            }
          </div>

          <div>
            <p className="text-xs">Already have an account ? <Link href="/auth/login" className="link">Login Now</Link></p>
          </div>

        </form>
      </figure>
    </React.Fragment>
  )
}

export default ForgotPassword
