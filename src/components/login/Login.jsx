import { Button, Card, CardContent, IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { FaEye, FaEyeSlash, FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user';

function Login() {

    let { googleLogin, facebookLogin } = useContext(UserContext);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleCreateAccount = () => {
        navigate('/register');
    };
    return (
        <div
            style={{
                height: "100%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: { xs: '0', lg: '5rem' },
            }}
        >
            <Card sx={{ minWidth: { xs: '90%', sm: '90%', md: '500px' }, padding: { lg: '10px' }, backgroundColor: '#d8d8d8' }}>
                <CardContent>
                    <Typography variant='h4' textAlign={'center'} mb={2} fontWeight={'bold'} letterSpacing={3}>
                        Login
                    </Typography>

                    <Stack spacing={2} mb={3}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePasswordVisibility}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button sx={{
                            padding: '10px'
                        }} variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Stack>

                    <Stack rowGap={2}>
                        <Button
                            sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: '#41644A' }, padding: '10px' }}
                            variant="contained"
                            startIcon={<FaGoogle />}
                            fullWidth
                            onClick={() => { googleLogin() }}
                        >
                            Sign in with Google
                        </Button>
                        <Button
                            sx={{ backgroundColor: 'blue', padding: '10px' }}
                            variant="contained"
                            startIcon={<FaFacebookSquare />}
                            fullWidth
                            onClick={() => { facebookLogin() }}
                        >
                            Sign in with Facebook
                        </Button>
                        {/* <Typography variant="body2" color="textSecondary" align="center">
                            Don't have an account?{' '}
                            <Link onClick={() => handleCreateAccount()} component="button" variant="body2">
                                Create one
                            </Link>
                        </Typography> */}
                    </Stack>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login