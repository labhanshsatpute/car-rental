"use client";

import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { LiaTimesSolid } from "react-icons/lia";
import { CustomInput, CustomButton } from '@/components';
import { BsArrowRightShort } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { UserRegister } from '../../services/authentication';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AuthUserLogin } from '@/redux/actions/AuthAction';

interface SignupModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const SignupModal = ({ isOpen, closeModal }: SignupModalProps) => {

  const [inputFields, setInpuFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInpuFields({ ...inputFields, [name]: value });
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const result = await UserRegister(inputFields);
    if (result.status) {
      handleCloseModal();
      dispatch(AuthUserLogin(result.data.data.user))
    }
    else {
      toast.error(result.message);
    }
  }

  const focusRef = useRef(null);

  const handleCloseModal = () => {
    setInpuFields({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    closeModal();
  }

  return (
    <React.Fragment>
      <Transition appear as={Fragment} show={isOpen}>
        <Dialog as='div' className={'relative z-50'} onClose={handleCloseModal} initialFocus={focusRef}>

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
                <Dialog.Panel className={"relative w-full bg-white max-w-xl max-h-[90vh] overflow-y-auto transform rounded-xl shadow-[0px_0px_50px_rgba(0,0,0,0.4)] flex flex-col gap-10 lg:px-12 lg:py-14 sm:px-10 sm:py-12 text-left"} ref={focusRef}>
                  <form className='lg:space-y- sm:space-y-4' onSubmit={(event) => handleFormSubmit(event)}>
                    <div className='space-y-5'>
                      <div className='text-center space-y-1 py-2'>
                        <h1 className='text-2xl font-semibold text-ascent-dark'>Create an Account</h1>
                        <p className='text-xs text-gray-600'>Cnter the required fields to create account</p>
                      </div>
                      <div className='space-y-3'>
                        <CustomInput name='name' value={inputFields.name} type='text' placeHolder='Enter Name' handleChange={(event) => handleInputChange(event)} label='Your Name' required={true} />
                        <CustomInput name='email' value={inputFields.email} type='email' placeHolder='Enter Email Address' handleChange={(event) => handleInputChange(event)} label='Email Address' required={true} />
                        <CustomInput name='password' value={inputFields.password} type='password' placeHolder='Enter Passsword' handleChange={(event) => handleInputChange(event)} label='Password' required={true} />
                        <CustomInput name='confirmPassword' value={inputFields.confirmPassword} type='password' placeHolder='Repeat Passsword' handleChange={(event) => handleInputChange(event)} label='Confirm Password' required={true} />
                        <div>
                          <div className='flex items-center justify-start space-x-2'>
                            <input type="checkbox" name='termConditions' />
                            <label htmlFor="termConditions" className='font-medium text-xs'>I accept terms & conditions</label>
                          </div>
                        </div>
                        <CustomButton text='Submit' styles='w-full rounded-lg' textStyles='text-sm' rightIcon={<BsArrowRightShort size={20} strokeWidth={0.5} />} />
                      </div>
                      <div className='flex space-x-4 items-center justify-center'>
                        <hr className='w-1/3' />
                        <span className='text-xs text-gray-500'>OR</span>
                        <hr className='w-1/3' />
                      </div>
                      <div>
                        <CustomButton type='submit' text='Continue with Google' styles='w-full bg-white border rounded-lg group hover:bg-slate-100' textStyles='text-sm text-ascent-dark' rightIcon={<FcGoogle size={20} strokeWidth={0.5} className='ml-1' />} />
                      </div>
                    </div>
                  </form>
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

export default SignupModal