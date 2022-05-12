import React, { useEffect, useState } from 'react';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Close, Search } from '@mui/icons-material';

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

function useDebounce(value: any, delay: number) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}