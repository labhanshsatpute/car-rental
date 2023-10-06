"use client";

import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { LiaTimesSolid } from "react-icons/lia";
import { CustomInput, CustomButton, SignupModal } from '@/components';
import { BsArrowRightShort } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/services/firebase';

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const LoginModal = ({ isOpen, closeModal }: LoginModalProps) => {
  
  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data);
    })
  }

  const focusRef = useRef(null);

  return (
    <React.Fragment>
      <Transition appear as={Fragment} show={isOpen}>
        <Dialog as='div' className={'relative z-50'} onClose={closeModal} initialFocus={focusRef}>

          {/* BackDrop Overlay */}
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-30' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='min-h-full flex items-center justify-center p-4 text-center'>

              {/* Modal Dialog */}
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0 scale-90'
                enterTo='opacity-100 scale-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-90'>
                <Dialog.Panel className={"relative w-full max-w-sm bg-white max-h-[90vh] overflow-y-auto transform rounded-xl shadow-[0px_0px_50px_rgba(0,0,0,0.4)] flex flex-col gap-10 lg:px-12 lg:py-14 sm:px-10 sm:py-12 text-left"}>
                  <div className='lg:space-y- sm:space-y-4' ref={focusRef}>
                    <div className='space-y-5'>
                      <div className='text-center space-y-1 py-2'>
                        <h1 className='text-2xl font-semibold text-ascent-dark'>Welcome Back!</h1>
                        <p className='text-xs text-gray-600'>Enter your credentials to continue</p>
                      </div>
                      <div className='space-y-3'>
                          <CustomInput name='email' value='' type='email' placeHolder='Enter Email Address' label='Email Address' required={true} />
                          <CustomInput name='password' value='' type='password' placeHolder='Enter Passsword' label='Password' required={true} />
                          <div className='text-right'>
                            <a href="#" className='text-xs font-medium text-gray-500 hover:text-ascent transition duration-300 ease-in-out hover:ease-in-out'>Forgot Password?</a>
                          </div>
                          <CustomButton text='Submit' styles='w-full rounded-lg' textStyles='text-sm' rightIcon={<BsArrowRightShort size={20} strokeWidth={0.5} />} />
                      </div>
                      <div className='flex space-x-4 items-center justify-center'>
                        <hr className='w-1/3' />
                        <span className='text-xs text-gray-500'>OR</span>
                        <hr className='w-1/3' />
                      </div>
                      <div>
                        <CustomButton type='button' handleClick={() => handleGoogleSignup()} text='Continue with Google' styles='w-full bg-white border rounded-lg group hover:bg-slate-100' textStyles='text-sm text-ascent-dark' rightIcon={<FcGoogle size={20} strokeWidth={0.5} className='ml-1' />} />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              {/* Modal Dialog */}

            </div>
          </div>

        </Dialog>
      </Transition>
    </React.Fragment>
  )
}

export default LoginModal