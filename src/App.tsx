import { Box } from "@mui/material";
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import useToken from "./hooks/useToken";


function App() {
    const { isTokenValid, setToken, deleteToken } = useToken()

    return (
        <Box>
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
    const { isTokenValid } = useToken()
    const location = useLocation()

    // here check if jwt token is expired
    if (!isTokenValid) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children
}