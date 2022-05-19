import React, { useEffect, useState } from 'react';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import useDebounce from '../hooks/useDebounce';

interface SearchBarProps {
    onInputChange: (term: string) => void
}

export default function SearchBar(props: SearchBarProps) {
    const { onInputChange } = props
    const [value, setValue] = useState<string>('')
    const debouncedSearchTerm = useDebounce(value, value === '' ? 0 : 500)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value.trim())
    }

    useEffect(() => {
        onInputChange(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    return (
        <OutlinedInput
            sx={{ backgroundColor: "#ffffff" }}
            placeholder="Suchen"
            fullWidth
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

    );
}