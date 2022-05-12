import React, { useEffect, useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import ButtonCircle from '../styledComponents/ButtonCircles';


interface CounterProps {
    drink: { id: number, name: string, cost: number }
    onAmountChange: (_drinkID: number, _newAmount: number) => void
}

const Counter = (props: CounterProps) => {
    const { drink, onAmountChange } = props
    const [count, setCount] = useState(0)

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
                    <ButtonCircle sx={{ minWidth: "3rem", minHeight: "3rem" }}>
                        <Remove />
                    </ButtonCircle>
                </IconButton>
                <Typography variant="h4">{count}</Typography>
                <IconButton onClick={() => handleCountChange(1)}>
                    <ButtonCircle>
                        <Add />
                    </ButtonCircle>
                </IconButton>
            </Stack>
            <Typography variant='h6'>{drink.name}</Typography>
        </Stack >
    )
}

export default Counter