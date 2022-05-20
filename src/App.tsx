import { Box } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import useToken from "./hooks/useToken";


function App() {
    const { isTokenValid, setToken, deleteToken } = useToken()

    return (
        <Box>
            <BrowserRouter>
                <Routes>
                    <Route path="/clubseite/login" element={isTokenValid ? <Navigate to="/clubseite/home" /> : <Login setToken={setToken} />} />
                    <Route path="/clubseite/home" element={
                        <RequireAuth>
                            <Home onLogoutClick={deleteToken} />
                        </RequireAuth>
                    } />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </BrowserRouter>
        </Box>
    );
}

export default App;

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { isTokenValid } = useToken()
    const location = useLocation()

    // here check if jwt token is expired
    if (!isTokenValid) {
        return <Navigate to="/clubseite/login" state={{ from: location }} />
    }

    return children
}