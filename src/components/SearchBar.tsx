import React, { useEffect, useState } from 'react';
import { AppBar, Box, Grid, IconButton, InputAdornment, OutlinedInput, styled } from '@mui/material';
import { Brightness4, Brightness7, Close, Logout, Search } from '@mui/icons-material';
import useDebounce from '../hooks/useDebounce';
import { useColorMode } from '../ColorModeContext';

interface SearchBarProps {
    onInputChange: (term: string) => void;
    onLogoutClick: () => void;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light,
    marginBottom: '1rem',
    padding: '0.5rem'
}))

export default function SearchBar(props: SearchBarProps) {
    const { onInputChange, onLogoutClick } = props
    const [value, setValue] = useState<string>('')
    const debouncedSearchTerm = useDebounce(value, value === '' ? 0 : 500)

    const { mode, toggleColorMode } = useColorMode()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value.trim())
    }

    useEffect(() => {
        onInputChange(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    return (
        <StyledAppBar>
            <Grid container justifyContent="space-between" alignItems="center">
                <IconButton onClick={() => toggleColorMode()}>
                    {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                <OutlinedInput
                    placeholder="Suchen"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setValue('')}
                                disabled={value === ''}
                            >
                                {value === '' ? <Search /> : <Close />}
                            </IconButton>
                        </InputAdornment>
                    }
                    value={value}
                    onChange={handleChange}
                />
                <IconButton onClick={() => onLogoutClick()}>
                    <Logout />
                </IconButton>
            </Grid>
        </StyledAppBar>
    );
}