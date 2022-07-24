import { createTheme, PaletteMode, ThemeOptions, ThemeProvider, useMediaQuery } from "@mui/material";
import { blue, grey, yellow } from "@mui/material/colors";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface IColorModeContext {
    toggleColorMode: () => void;
    mode: 'dark' | 'light'
}

export const ColorModeContext = createContext<IColorModeContext>({
    toggleColorMode: () => { },
    mode: 'light'
})

export const ColorModeContextProvider = ({ children }: any) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark')

    useEffect(() => {
        const themeMode = localStorage.getItem("themeMode")
        if (themeMode && (themeMode === "light" || themeMode === "dark")) {
            setMode(themeMode)
        }
    }, [])

    useEffect(() => {
        if (prefersDarkMode) {
            setMode('dark')
        }
    }, [prefersDarkMode])

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                localStorage.setItem('themeMode', mode === "light" ? "dark" : "light")
                setMode((prev) => prev === 'light' ? 'dark' : 'light')
            },
            mode,
        }), [mode])

    const getCustomTheme = (mode: PaletteMode): ThemeOptions => ({
        palette: {
            mode,
            primary: {
                ...blue,
                ...(mode === 'dark' && {
                    main: yellow[300]
                })
            },
            secondary: {
                ...(mode === 'dark' ? {
                    main: grey[800]
                } : {
                    main: grey[200]
                })
            }
        }
    })


    const theme = useMemo(
        () => createTheme(getCustomTheme(mode)), [mode]
    )

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export const useColorMode = () => useContext(ColorModeContext);