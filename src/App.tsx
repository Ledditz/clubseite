import { Box } from "@mui/material";
import { useState } from "react";
import { HashRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useColorMode } from "./ColorModeContext";
import Home from "./components/Home";
import Login from "./components/Login";
import SessionEndedInfo from "./components/SessionEndedInfo";
import useToken from "./hooks/useToken";


function App() {
    const { isTokenValid, setToken, deleteToken, token } = useToken()
    const { mode } = useColorMode()
    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: mode === 'light' ? '#d3d3d3' : '#424242' }}>
            <HashRouter>
                <Routes>
                    <Route path="/login" element={isTokenValid ? <Navigate to="/home" /> : <Login setToken={setToken} />} />
                    <Route path="/home" element={
                        <RequireAuth token={token} isValid={isTokenValid} deleteToken={deleteToken}>
                            <Home onLogoutClick={deleteToken} />
                        </RequireAuth>
                    } />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </HashRouter>
        </Box>
    );
}

export default App;


interface RequireAuthProps {
    token: string | undefined,
    children: JSX.Element,
    isValid: boolean,
    deleteToken: () => void
}

const RequireAuth = (props: RequireAuthProps) => {
    const { token, children, deleteToken, isValid } = props
    const [showInfo, setShowInfo] = useState(true)
    const navigate = useNavigate()

    const handleCloseInfo = () => {
        setShowInfo(false)
        deleteToken()
        navigate('/login')
    }

    // here check if jwt token is expired
    if (!token) {
        return <Navigate to="/login" />
    }
    if (!isValid) {
        return <SessionEndedInfo open={showInfo} onClose={handleCloseInfo} />
    }

    return children
}