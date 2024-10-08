import { Box, Grid, Stack } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import SidebarTabs from './sidebar/SidebarTabs';
import { UserContext } from '../../context/user';
import { Comment } from 'react-loader-spinner'
import { Outlet, useLocation } from 'react-router-dom';
import { StateManagment } from '../../context/state';

function Home() {

    let { user } = useContext(UserContext);
    let { chatDetect, setChatDetected } = useContext(StateManagment);
    const location = useLocation();


    useEffect(() => {
        if (
            location.pathname === '/home' ||
            location.pathname === '/home/'
        ) {
            setChatDetected(false);
        } else {
            setChatDetected(true);
        }



    }, []);




    return (
        <>
            {user ? <Box height={'100vh'}>


                <Grid container sx={{ height: '100%' }}>
                    <Grid item xs={12} lg={3} sx={{
                        display: { xl: 'block' },
                        height: '100%',
                        width: '100%',
                        boxShadow: '-20px 0px 100px 0 #000',
                        backgroundColor: '#2C3639',
                        position: 'relative',
                        zIndex: '5',
                        order: { xs: chatDetect ? '2' : '0', lg: '1' }

                    }}
                    >
                        <SidebarTabs />
                    </Grid>

                    <Grid height={'100%'} order={1} position={'relative'} item xs={12} lg={9}>
                        <Outlet />
                    </Grid>

                </Grid>


            </Box> :
                <Stack justifyContent={'center'} alignItems={'center'} sx={{
                    height: '100vh'
                }}>
                    <Comment />

                </Stack>



            }



        </>

    )
}

export default Home