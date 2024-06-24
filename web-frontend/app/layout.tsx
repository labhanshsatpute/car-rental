'use client'

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { combineReducers, legacy_createStore } from 'redux';
import AuthReducer from "../redux/reducers/AuthReducer"
import AppLayout from './app';
const store = legacy_createStore(combineReducers({ AuthReducer }));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>CarsHub</title>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body>
          <AppLayout children={children} />
        </body>
      </html>
    </Provider>
  )
}