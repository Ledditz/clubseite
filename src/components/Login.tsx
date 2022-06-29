import { Brightness4, Brightness7, Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../ColorModeContext';
import login from '../hooks/useLogin';
import { TokenObj } from '../hooks/useToken';

interface LoginProps {
    setToken: (token: TokenObj, save: boolean) => void
}

function Login(props: LoginProps) {
    const { setToken } = props
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [stayLoggedIn, setStayLoggedIn] = useState(true)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { mode, toggleColorMode } = useColorMode()

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
            if (token) {
                setToken({ token }, stayLoggedIn)
                navigate('/home')
            } else {
                setOpen(true)
            }
        } else {
            setOpen(true)
        }
    }

    const handleLoginFailed = () => {
        setOpen(false)
        setUserName('')
        setPassword('')
    }

    return (<>
        <IconButton sx={{ padding: '1rem' }} onClick={() => toggleColorMode()}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Box paddingTop={'25vh'}>
            <Container maxWidth="xs">
                <Card>
                    <form onSubmit={handleLoginClick}>
                        <CardContent>
                            <Typography>Herzlich Willkommen</Typography>
                            <OutlinedInput
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
                <Dialog open={open} onClose={() => handleLoginFailed()} fullWidth maxWidth='xs'>
                    <DialogTitle>
                        <Typography>Login fehlgeschlagen</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Typography>Nutzername oder Passwort falsch.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleLoginFailed()}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box >
    </>
    );
}

export default Login;
