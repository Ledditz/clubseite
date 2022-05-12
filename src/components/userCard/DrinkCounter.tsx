import React, { useEffect, useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import { Avatar, IconButton, Stack, styled, Typography } from '@mui/material';

const ButtonCircle = styled(Avatar)({
    minWidth: "3rem", minHeight: "3rem"
})

interface CounterProps {
    id: number
    drinkName: string,
    onAmountChange: (_drinkID: number, _newAmount: number) => void
}

const Counter = (props: CounterProps) => {
    const { id, drinkName, onAmountChange } = props
    const [count, setCount] = useState(0)

    const handleCountChange = (_diff: number) => {
        if ((count + _diff) < 0) {
            setCount(0)
        } else {
            setCount(count + _diff)
        }
    }

    useEffect(() => {
        onAmountChange(id, count)
    }, [count])

    return (
        <Stack key={id} direction="row" spacing={2} alignItems="center">
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
            <Typography variant='h6'>{drinkName}</Typography>
        </Stack >
    )
}

export default Counter