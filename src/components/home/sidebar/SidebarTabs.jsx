import React, { useState } from 'react'
import { Box, Stack, Tab, Tabs } from '@mui/material';
import { FiMessageSquare, FiUser, FiUsers } from 'react-icons/fi';
import Profile from '../../profile/Profile';
import Chats from '../../chats/Chats';


function SidebarTabs() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  


  return (

    <Stack height={'100vh'}>
      <Tabs variant='fullWidth' value={value} onChange={handleChange}>
        <Tab label={
          <Stack color={'white'} alignItems={'center'}>
            <FiMessageSquare size={22} />
            {value === 0 && <span style={{ fontSize: '14px', paddingBottom: '1rem' }}>Chats</span>}
          </Stack>
        } />
        <Tab label={
          <Stack color={'white'} alignItems={'center'}>
            <FiUsers size={22} />
            {value === 1 && <span style={{ fontSize: '14px', paddingBottom: '1rem' }}>Groups</span>}
          </Stack>
        } />
        <Tab label={
          <Stack color={'white'} alignItems={'center'}>
            <FiUser size={22} />
            {value === 2 && <span style={{ fontSize: '14px', paddingBottom: '1rem' }}>My profile</span>}
          </Stack>
        } />

      </Tabs>

      <div style={{
        height:'1px', 
        backgroundColor:'#fff',
        opacity:'0.3'
      }}></div>

      <input type="text" style={{
        width:'90%',
        margin: '1rem auto',
        fontSize:'1rem' ,
        padding:'0.8rem 1.5rem' ,
        borderRadius:'200px' ,
        opacity:'0.7'
      }} placeholder='search ... '/>

      <div style={{
        height:'1px', 
        backgroundColor:'#fff',
        opacity:'0.3'
      }}></div>

      <Box height={'70%'} >
        {value === 0 &&  <Chats /> }
        {value === 1 && <div>group chats is under develope</div>}
        {value === 2 && <Profile />}
      </Box>

    </Stack>


  )
}

export default SidebarTabs