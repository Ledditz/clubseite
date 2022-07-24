import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, InputAdornment, OutlinedInput, Typography, useMediaQuery, useTheme } from '@mui/material';
import { rechargeObj } from '../Home';

interface RechargeDialogProps extends DialogProps {
    onClose: () => void,
    rechargeObj: rechargeObj,
    onConfirm: (amount: number) => void
}

const RechargeDialog = (props: RechargeDialogProps) => {
    const { onClose, onConfirm, rechargeObj: { rechargeAmount, userID, userName } } = props
    const [inputValue, setInputValue] = useState<number | string>('')
    const [inputError, setInputError] = useState(false)
    const [showInputPrompt, setShowInputPromp] = useState(false)
    const theme = useTheme()
    const downSm = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        setShowInputPromp(rechargeAmount === 'new')
    }, [rechargeAmount, userID])

    const handleClose = (_status: 'confirm' | 'cancel') => {
        if (_status === 'confirm' && !inputError) {
            onConfirm(Number(inputValue))
            setInputValue('')
            return;
        }
        setInputValue('')
        onClose()
    }

    useEffect(() => {
        if (rechargeAmount && rechargeAmount !== 'new') {
            setInputValue(rechargeAmount)
        } else {
            setShowInputPromp(true)
        }
    }, [])

    useEffect(() => {
        setInputError(!(inputValue === '' || Number(inputValue) > 0))
    }, [inputValue])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.replace(',', '.'))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!inputError)
            setShowInputPromp(false);
    }

    const getAmountString = (_value: number): string => {
        if (_value % 1) {
            return _value.toFixed(2)
        }
        return _value.toString()
    }

    return (
        <Dialog open onClose={() => handleClose('cancel')} fullWidth={downSm} maxWidth='xs'>
            <DialogTitle>
                Aufladen
            </DialogTitle>
            <DialogContent >
                {
                    !showInputPrompt
                        ? <>
                            <Typography display='inline'>Für {userName}</Typography>
                            <Typography display='inline' variant='h6' color='primary'> {getAmountString(Number(inputValue))}€</Typography>
                            <Typography display='inline'> aufladen?</Typography>
                        </>
                        : <form onSubmit={handleSubmit}>
                            <OutlinedInput fullWidth inputProps={{ inputMode: 'numeric' }} autoFocus error={inputError} value={inputValue} onChange={handleInputChange} endAdornment={<InputAdornment position="end">€</InputAdornment>} />
                        </form>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose('cancel')}>Abbruch</Button>
                <Button disabled={inputValue === '' || inputError} onClick={() => showInputPrompt ? setShowInputPromp(false) : handleClose('confirm')}>und los</Button>
            </DialogActions>
        </Dialog >
    )
}

export default RechargeDialog;