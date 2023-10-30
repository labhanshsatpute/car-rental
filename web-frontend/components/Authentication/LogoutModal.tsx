import { AuthUserLogout } from '@/redux/actions/AuthAction';
import { Dialog, Transition } from '@headlessui/react'
import { deleteCookie } from 'cookies-next';
import React, { Fragment, useRef } from 'react'
import { useDispatch } from 'react-redux';
import CustomButton from '../FormControls/CustomButton';
import { PiWarningCircleBold } from 'react-icons/pi';

interface LoginModalProps {
	isOpen: boolean;
	closeModal: () => void;
}

const LogoutModal = ({ isOpen, closeModal }: LoginModalProps) => {

	const focusRef = useRef(null);

	const dispatch = useDispatch();

	const handleLogout = () => {
		deleteCookie('accessToken');
		dispatch(AuthUserLogout());
	}


	return (
		<React.Fragment>
			<Transition appear as={Fragment} show={isOpen}>
				<Dialog as='div' className={'relative z-50'} onClose={closeModal} initialFocus={focusRef}>

					{/* Backdrop Overlay */}
					<Transition.Child as={Fragment}
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
								<Dialog.Panel className={"relative w-full max-w-sm bg-white max-h-[90vh] overflow-y-auto transform rounded-xl shadow-[0px_0px_50px_rgba(0,0,0,0.4)] flex flex-col gap-10 px-10 py-12"} ref={focusRef}>
									<div className='flex flex-col space-y-5 text-center'>

										<div className='flex items-center justify-center'>
											<PiWarningCircleBold size={70} className='fill-orange-400' />
										</div>

										<div className='space-y-3'>
											<h1 className='text-2xl font-semibold'>Are you sure ?</h1>
											<p className='text-sm text-gray-500 leading-relaxed'>Once you clicked on ok then you will be logged out!</p>
										</div>

										<div className='flex items-center justify-center space-x-10'>
											<button onClick={closeModal} className='font-medium text-sm'>Cancel</button>
											<CustomButton type='button' text='Logout' handleClick={() => handleLogout()} />
										</div>

									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>

				</Dialog>
			</Transition>
		</React.Fragment>
	)
}

export default LogoutModal