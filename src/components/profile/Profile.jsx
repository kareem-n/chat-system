import { Avatar, Card, CardContent, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { UserContext } from '../../context/user'

function Profile() {

    const { user } = useContext(UserContext);
    return (

        <Card sx={{
            backgroundColor: 'transparent',
            color: '#fff',
            height: '100%',
            textAlign: 'center'
        }}>
            <CardContent>
                <Avatar alt={user.displayName} src={user.photoURL} style={{ width: 100, height: 100, margin: 'auto', marginBottom: 16}} />
                <Typography variant="h5" component="h2" >
                    {user.displayName}
                </Typography>
                <Typography variant="body1" sx={{
                    opacity: '0.5'
                }} >
                    {user.email}
                </Typography>


            </CardContent>
        </Card>

    )
}

export default Profile