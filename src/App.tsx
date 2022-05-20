import { Box } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SessionEndedInfo from "./components/SessionEndedInfo";
import useToken from "./hooks/useToken";


function App() {
    const { isTokenValid, setToken, deleteToken } = useToken()

    return (
        <Box sx={{ height: "100vh", backgroundColor: "#e6f2ff" }}>
            {/* <BrowserRouter> */}
            <HashRouter>
                <Routes>
                    <Route path="/login" element={isTokenValid ? <Navigate to="/home" /> : <Login setToken={setToken} />} />
                    <Route path="/home" element={
                        <RequireAuth>
                            <Home onLogoutClick={deleteToken} />
                        </RequireAuth>
                    } />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </HashRouter>
            {/* </BrowserRouter> */}
        </Box>
    );
}

export default App;

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { isTokenValid, token, deleteToken } = useToken()
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
    if (!isTokenValid) {
        return <SessionEndedInfo open={showInfo} onClose={handleCloseInfo} />
    }

    return children
}