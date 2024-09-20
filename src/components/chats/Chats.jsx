import React, { useContext, useEffect, useState } from 'react'
import { Box, Stack, Typography, Avatar } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { Comment } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import { StateManagment } from '../../context/state';


function Chats() {

    let { users, setUsers } = useContext(StateManagment);

    const [loader, setLoader] = useState(false);

    let self = JSON.parse(localStorage.getItem("userInfo"));

    let { setChatDetected } = useContext(StateManagment);

    const getUsers = async () => {
        setLoader(true)
        const querySnapshot = await getDocs(collection(db, "users"));
        let tmp = [];

        querySnapshot.forEach((doc) => {

            if (doc.id === self) return;

            let ttt = {
                ...doc.data(),
                id: doc.id
            };
            tmp.push(ttt);
            setUsers(tmp);
        });
        setLoader(false);

    }

    useEffect(() => {
        getUsers();
    }, [])


    return (
        <>
            <Box
            margin={'10px'}
            height={'100%'}

            position={'relative'} 
            sx={{
                overflowY : 'scroll'
            }} 
            >
                {
                    users ?
                        users.map((user, i) => {
                            return <NavLink
                                onClick={() => { setChatDetected(true) }}
                                className={({ isActive }) =>
                                    isActive ? ' active ' : 'pending'
                                }
                                style={{
                                    textDecoration: 'none',
                                }}
                                key={i} to={`chat/${user.id}`} >
                                <Stack
                                    sx={{
                                        borderBottom: '1px solid #ffffff3b',
                                        padding: '1rem',
                                        alignItems: 'center'
                                    }} flexDirection={'row'} >
                                    <Avatar sx={{
                                        marginRight: '1rem'
                                    }} alt={user.displayName} src={user.photoURL} />
                                    <Box>
                                        <Typography>
                                            {user.displayName}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </NavLink>
                        }) : ''
                }
                {
                    loader ?
                        <Stack justifyContent={'center'} alignItems={'center'} sx={{
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                        }}>
                            <Comment />
                        </Stack> : ''


                }



            </Box>

        </>
    )
}

export default Chats