import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Container, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const navigate = useNavigate()

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value.trim())
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value.trim())
    }

    const handleLoginClick = () => {
        if (userName !== '' && password !== '') {
            console.log("check if correct login ")
            navigate('/home')
        }
    }

    return (
        <Box paddingTop={40}>
            <Container maxWidth="xs">
                <Card>
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
                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant='contained' onClick={handleLoginClick}> Login</Button>
                    </CardActions>
                </Card>
            </Container>
        </Box >
    );
}

export default Login;
