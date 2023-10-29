'use client'

import '../styles/globals.css';
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { combineReducers, legacy_createStore } from 'redux';
import AuthReducer from "../redux/reducers/AuthReducer"
import AppLayout from './app';
const store = legacy_createStore(combineReducers({ AuthReducer }));

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={inter.className}>
          <AppLayout children={children} />
        </body>
      </html>
    </Provider>
  )
}