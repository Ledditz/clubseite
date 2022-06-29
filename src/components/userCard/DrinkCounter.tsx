import { useEffect, useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import ButtonCircle from '../styledComponents/ButtonCircles';
import { useColorMode } from '../../ColorModeContext';


interface CounterProps {
    disabled: boolean
    drink: { id: number, name: string, cost: number }
    onAmountChange: (_drinkID: number, _newAmount: number) => void
}

const Counter = (props: CounterProps) => {
    const { drink, onAmountChange, disabled } = props
    const [count, setCount] = useState(0)
    const { mode } = useColorMode()
    const theme = useTheme()

    const handleCountChange = (_diff: number) => {
        if ((count + _diff) < 0) {
            setCount(0)
        } else {
            setCount(count + _diff)
        }
    }

    useEffect(() => {
        onAmountChange(drink.id, count)
    }, [count])

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="flex-start">
                <IconButton onClick={() => handleCountChange(-1)}>
                    <ButtonCircle>
                        <Remove />
                    </ButtonCircle>
                </IconButton>
                <Typography variant="h4">{count}</Typography>
                <IconButton color={disabled ? 'error' : 'default'} disabled={disabled} onClick={() => handleCountChange(1)}>
                    <ButtonCircle sx={disabled ? { backgroundColor: mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800] } : undefined}>
                        <Add />
                    </ButtonCircle>
                </IconButton>
            </Stack>
            <Typography variant='h6'>{drink.name}</Typography>
        </Stack >
    )
}

export default Counter