import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Checkbox, Container, FormControlLabel, FormGroup, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../hooks/useLogin';
import { TokenObj } from '../hooks/useToken';

interface LoginProps {
    setToken: (token: TokenObj) => void
}

function Login(props: LoginProps) {
    const { setToken } = props
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [stayLoggedIn, setStayLoggedIn] = useState(false)

    const navigate = useNavigate()

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value.trim())
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value.trim())
    }

    const handleLoginClick = async (e: any) => {
        e.preventDefault()
        if (userName !== '' && password !== '') {
            const token = await login({ name: userName, password })
            setToken({ token })
            navigate('/clubseite/home')
        }
    }

    return (
        <Box paddingTop={'30vh'}>
            <Container maxWidth="xs">
                <Card>
                    <form onSubmit={handleLoginClick}>
                        <CardContent>
                            <Typography>Herzlich Willkommen</Typography>
                            <OutlinedInput
                                sx={{ backgroundColor: "#ffffff" }}
                                placeholder="Name"
                                fullWidth
                                endAdornment={userName !== '' &&
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setUserName('')}
                                        >
                                            <Close />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                value={userName}
                                onChange={handleNameChange}
                            />
                            <OutlinedInput
                                sx={{ backgroundColor: "#ffffff" }}
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Passwort"
                                fullWidth
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                        >
                                            {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <FormGroup onChange={() => setStayLoggedIn(!stayLoggedIn)}>
                                <FormControlLabel control={<Checkbox value={stayLoggedIn} defaultChecked />} label="eingelogged bleiben" />
                            </FormGroup>
                        </CardContent>
                        <CardActions>
                            <Button fullWidth type="submit" variant='contained'>Login</Button>
                        </CardActions>

                    </form>
                </Card>
            </Container>
        </Box >
    );
}

export default Login;
