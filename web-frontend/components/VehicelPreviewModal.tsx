"use client";

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'

interface VehicelPreviewModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const VehicelPreviewModal = ({ isOpen, closeModal }: VehicelPreviewModalProps) => {
  return (
    <React.Fragment>
      <Transition appear as={Fragment} show={isOpen} >
        <Dialog as='div' className={'relative z-50'} onClose={closeModal}>

          {/* BackDrop Overlay */}
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
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
                  <Dialog.Panel className={"relative w-full bg-white max-w-lg max-h-[90vh] overflow-y-auto transform rounded-lg shadow-2xl shadow-gray-800 flex flex-col gap-10 p-7"}>

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

export default VehicelPreviewModal