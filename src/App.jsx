import React, { useContext, useEffect } from 'react';
import { Box, Stack } from '@mui/material'
import Login from './components/login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { UserContext } from './context/user';
import Chat from './components/chat/Chat';
import StateContextProvider from './context/state';
import { IoLogoSnapchat } from 'react-icons/io';

function App() {

  let { userListner } = useContext(UserContext);


  useEffect(() => {

    if (localStorage.getItem("userInfo")) {
      userListner(JSON.parse(localStorage.getItem("userInfo")));
    }

  }, [])



  const ProtectRoute = ({ children }) => {

    if (localStorage.getItem("userInfo") === null) {
      return <Navigate to={'/login'} />
    }
    else {
      return children;
    }
  }

  const ProtectAuth = ({ children }) => {

    if (localStorage.getItem("userInfo")) {
      return <Navigate to={'/home'} />
    }
    else {
      return children;
    }
  }



  return (
    <StateContextProvider>
      <h1>kareem</h1>

      <Box height={'100vh'} overflow={'hidden'}>
        <Routes>
          <Route path='/' element={
            <ProtectAuth>
              <Login />
            </ProtectAuth>} />

          <Route path='/login' element={
            <ProtectAuth>
              <Login />
            </ProtectAuth>
          } />
          <Route path='/home' element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          } >
            <Route path='chat/:id' element={<Chat />} />
            <Route path='' element={<Stack alignItems={'center'} justifyContent={'center'} height={'100%'}>
              <IoLogoSnapchat size={100} />
              <h1>click a Chat now</h1>
            </Stack>} />

          </Route>


        </Routes>
      </Box >
    </StateContextProvider>

  )
}

export default App
