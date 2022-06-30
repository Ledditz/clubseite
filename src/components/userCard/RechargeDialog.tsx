import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { rechargeObj } from '../Home';

interface RechargeDialogProps extends DialogProps {
    onClose: () => void,
    rechargeObj: rechargeObj
}

const RechargeDialog = (props: RechargeDialogProps) => {
    const { open, onClose, rechargeObj: { rechargeAmount, user } } = props
    const [inputValue, setInputValue] = useState<number | string>('')
    const [inputError, setInputError] = useState(false)
    const [showInputPrompt, setShowInputPromp] = useState(false)

    useEffect(() => {
        setShowInputPromp(rechargeAmount === 'new')
    }, [rechargeAmount, user])

    const handleClose = (_status: 'confirm' | 'cancel') => {
        if (_status === 'confirm' && !inputError) {
            console.log("send API request")
            console.log(inputValue + " aufladen")
        }
        setInputValue('')
        onClose()
    }

    useEffect(() => {
        if (open && rechargeAmount && rechargeAmount !== 'new') {
            setInputValue(rechargeAmount)
        } else {
            setShowInputPromp(true)
        }
    }, [open])

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
        <Dialog open={open} onClose={() => handleClose('cancel')} fullWidth maxWidth='xs'>
            <DialogTitle>
                Aufladen
            </DialogTitle>
            <DialogContent>
                {
                    !showInputPrompt && <>
                        <Typography display='inline'>Für {user}</Typography>
                        <Typography display='inline' variant='h6' color='primary'> {getAmountString(Number(inputValue))}€</Typography>
                        <Typography display='inline'> aufladen?</Typography>
                    </>
                }
                {
                    showInputPrompt &&
                    <form onSubmit={handleSubmit}>
                        <OutlinedInput autoFocus error={inputError} value={inputValue} onChange={handleInputChange} endAdornment={<InputAdornment position="end">€</InputAdornment>} />
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