import { Box, Avatar, Stack, Paper, Typography } from '@mui/material';
import { addDoc, arrayUnion, collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase/firebase';
import { Comment } from 'react-loader-spinner';
import { AiOutlineSend } from 'react-icons/ai';
import { TbMessage2Off } from 'react-icons/tb';
import { UserContext } from '../../context/user';
import { FiPhoneCall, FiVideo } from 'react-icons/fi';
import { FcAbout } from 'react-icons/fc';
import { IoIosArrowBack } from 'react-icons/io';

function Chat() {

    const self = JSON.parse(localStorage.getItem("userInfo"));
    let { id } = useParams();

    const msgInputRef = useRef();
    const chatBoxRef = useRef();

    const [chatedUser, setChatedUser] = useState(null);

    const [docID, setdocID] = useState(null);

    const [Msg, setMsg] = useState(null);

    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!id) return;
        getUserChat(id);
    }, [id]);


    const convertDate = (data) => {
        let tmp = [];
        data.map((d) => {

            tmp.push({
                ...d,
                time: d.time.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            })



        })

        setMsg(tmp);

    }


    useEffect(() => {
        if (user.msg) {
            user.msg.map((ms) => {
                if (id === ms.chat_with) {
                    onSnapshot(doc(db, "msg", ms.msg_id), (doc) => {
                        convertDate(doc.data().data)
                        setdocID(ms.msg_id);
                    });

                }
            });
        }

    }, []);


    useEffect(() => {
        if (!chatedUser) return;
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [chatedUser])





    const getUserChat = async (id) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setChatedUser(docSnap.data());
        } else {
            console.log("No such document!");
        }
    }



    const createNewMsg = async (msgf) => {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "msg"), {
            data: [{
                from: self,
                to: id,
                msg: msgf,
                time: new Date()
            }]
        });


        const currentUser = doc(db, "users", self);
        let newObject = {
            chat_with: id,
            msg_id: docRef.id
        }

        updateDoc(currentUser, {
            msg: arrayUnion(newObject)
        }).then(() => {
            console.log("Object added to array!");

            const other = doc(db, "users", id);

            newObject = {
                chat_with: self,
                msg_id: docRef.id
            }
            updateDoc(other, {
                msg: arrayUnion(newObject)
            }).then(() => {
                console.log("Object added to array!");
            }).catch((error) => {
                console.error("Error adding object to array:", error);
            });
        }).catch((error) => {
            console.error("Error adding object to array:", error);
        });




    }



    const sendMsg = () => {
        const msgf = msgInputRef.current.value;

        if (msgf === '') {
            return;
        }



        if (!Msg) {
            createNewMsg(msgf);
        } else {
            const docRef = doc(db, "msg", docID);
            const newObject = {
                from: self,
                to: id,
                msg: msgf,
                time: new Date()
            }

            updateDoc(docRef, {
                data: arrayUnion(newObject)
            }).then(() => {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight + 1000;

                msgInputRef.current.value = ''
                console.log("Object added to array!");

            }).catch((error) => {
                console.error("Error adding object to array:", error);
            });

        }


    }


    return (
        <>

            {chatedUser ? <Stack sx={{
                height: '100%',
            }}>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{
                    backgroundColor: '#2C3639',
                    padding: { xs: '0.7rem 1rem', lg: '0.7rem 3rem' },
                    boxShadow: '50px -50px 100px 10px #000'
                }}>
                    <Stack flexDirection={'row'} alignItems={'center'}>
                        <Box onClick={() => {
                            window.history.back();
                        }}
                            sx={{
                                display: { xs: 'block', lg: 'none' },
                                paddingRight: '0.5rem'
                            }}>
                            <IoIosArrowBack onClick={()=>{
                                console.log(0);
                            }} size={30} cursor={'pointer'} />
                        </Box>
                        <Avatar sx={{
                            marginRight: '1rem'
                        }} src={chatedUser.photoURL}></Avatar>
                        <Typography fontWeight={'bolder'} variant='body1'>
                            {chatedUser.displayName}
                        </Typography>
                    </Stack>

                    <Stack flexDirection={'row'} >
                        <FiPhoneCall size={22} />
                        <FiVideo style={{
                            margin: '0 1rem'
                        }} size={22} />
                        <FcAbout size={22} color='yellow' />
                    </Stack>

                </Stack>

                <Stack ref={chatBoxRef} sx={{
                    overflowY: 'scroll',
                    height: '50px',
                    padding: { xs: '0rem 1rem', lg: '0.7rem 3rem' },
                }}

                    className='test'
                    flexGrow={1}>

                    {Msg ?
                        Msg.map((m, i) => {
                            if (m.from === self) {
                                return <Stack flexDirection={'row'} alignItems={'center'} key={i} padding={'0.2rem 0'}>
                                    <Avatar sx={{ marginRight: '0.5rem' }} src={user.photoURL}></Avatar>
                                    <Paper sx={{
                                        maxWidth: { xs: '70%', lg: '50%' },
                                        borderRadius: '15px',
                                        borderTopLeftRadius: '0px',
                                        padding: '1rem',
                                        backgroundColor: '#F0EBCE',
                                    }}>
                                        <Stack alignItems={'flex-start'} flexDirection={'row'}>
                                            <Typography sx={{
                                                opacity: '0.7',
                                                minWidth: '65px',
                                                alignSelf: 'flex-end',
                                                fontSize: '0.8rem'
                                            }}>
                                                {m.time}
                                            </Typography>

                                            <Typography sx={{
                                                wordBreak: 'break-word',
                                                fontSize: { xs: '0.8rem', lg: '1rem' },
                                                fontWeight: "bold"
                                            }}>
                                                {m.msg}
                                            </Typography>



                                        </Stack>


                                    </Paper>
                                </Stack>
                            } else {
                                return <Stack flexDirection={'row'} key={i} padding={'0.2rem 0'} alignItems={'center'} justifyContent={'flex-end'}>
                                    <Paper sx={{
                                        maxWidth: '60%',
                                        borderRadius: '15px',
                                        borderTopRightRadius: '0px',
                                        padding: '1rem',
                                        backgroundColor: 'rgb(172, 172, 194)',
                                        color: '#000',
                                        fontWeight: 'bold',
                                    }}>
                                        <Stack alignItems={'flex-start'} flexDirection={'row'}>


                                            <Typography sx={{
                                                wordBreak: 'break-word',
                                                fontSize: { xs: '0.8rem', lg: '1rem' },
                                                fontWeight: "bold"
                                            }}>
                                                {m.msg}
                                            </Typography>
                                            <Typography sx={{
                                                opacity: '0.7',
                                                minWidth: '65px',
                                                textAlign: 'end',
                                                alignSelf: 'flex-end',
                                                fontSize: '0.8rem'
                                            }}>
                                                {m.time}
                                            </Typography>



                                        </Stack>
                                    </Paper>
                                    <Avatar sx={{ marginLeft: '0.5rem' }} src={chatedUser.photoURL}></Avatar>

                                </Stack>
                            }
                        })
                        :
                        <Stack sx={{ opacity: '0.7' }} alignItems={'center'} justifyContent={'center'} flexGrow={1}>
                            <Paper sx={{
                                padding: '0.5rem 1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <TbMessage2Off size={50} style={{ marginBottom: '0.5rem' }} />
                                <Typography variant='h6'>
                                    No messages yet
                                </Typography>
                                <Typography variant='body2'>
                                    By sending a message you gonna be friends
                                </Typography>
                            </Paper>
                        </Stack>
                    }
                </Stack>





                <Stack justifyContent={'space-between'} flexDirection={'row'} sx={{
                    margin: { xs: '1rem', lg: '0 3rem' },
                    overflow: 'hidden',
                    marginBottom: { xs: '1rem', lg: '2rem' }

                }}>

                    <Box sx={{
                        overflow: 'hidden',
                        borderRadius: { xs: '15px' },
                        borderTopRightRadius: { xs: '15px', lg: '0' },
                        width: { xs: "83%", lg: '92%' },
                        opacity: '0.8',
                        '&:hover': { opacity: '1' },
                    }}>
                        <input rows={'1'} cols={20} ref={msgInputRef} style={{

                            width: '100%',
                            padding: '1rem',
                            fontSize: '1rem'
                        }} type="text" placeholder='message...'
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    sendMsg();
                                }
                            }}
                        />
                    </Box>


                    <Box
                        onClick={() => { sendMsg() }}
                        sx={{
                            opacity: '0.7',
                            '&:hover': { opacity: '1' },
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            width: { xs: "15%", lg: '6%' },
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: { xs: '1.3rem', lg: '1.6rem' }
                        }} >
                        <AiOutlineSend color='#3F4E4F' />
                    </Box>

                </Stack>



            </Stack > :
                <Stack justifyContent={'center'} alignItems={'center'} sx={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                }}>
                    <Comment />
                </Stack>
            }
        </>


    )
}

export default Chat