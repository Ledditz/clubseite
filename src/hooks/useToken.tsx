import { useState } from 'react';

export interface TokenObj {
    token: string
}

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        if (!tokenString) return undefined

        const userToken: TokenObj = JSON.parse(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: TokenObj, stayLoggedIn: boolean = false) => {
        // console.log("save", stayLoggedIn)

        if (stayLoggedIn)
            localStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token);
    };

    const tokenIsValid = () => {
        // has to check if toke is expired
        // console.log("check token valid", !!token)
        return !!token
    }

    const deleteToken = () => {
        // console.log("remove token")
        localStorage.removeItem('token')
        setToken(undefined)
    }

    return {
        token,
        setToken: saveToken,
        isTokenValid: tokenIsValid(),
        deleteToken
    } as const
}