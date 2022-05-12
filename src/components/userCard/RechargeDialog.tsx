import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { rechargeObj } from '../Home';

interface RechargeDialogProps extends DialogProps {
    onClose: () => void,
    rechargeObj: rechargeObj
}

const RechargeDialog = (props: RechargeDialogProps) => {
    const { open, onClose, rechargeObj } = props
    const [inputValue, setInputValue] = useState<number | string>('')
    const [inputError, setInputError] = useState(false)

    const handleClose = (_status: 'confirm' | 'cancel') => {
        if (_status === 'confirm' && !inputError) {
            console.log("send API request")
            console.log(inputValue + " aufladen")
        }
        setInputValue('')
        onClose()
    }

    useEffect(() => {
        if (open && rechargeObj.rechargeAmount && rechargeObj.rechargeAmount !== 'new') {
            setInputValue(rechargeObj.rechargeAmount)
        }
    }, [open])

    useEffect(() => {
        if (inputValue === '' || Number(inputValue) > 0) {
            setInputError(false)
        } else {
            setInputError(true)
        }
    }, [inputValue])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    return (
        <Dialog open={open} onClose={() => handleClose('cancel')} fullWidth={true}>
            <DialogTitle>
                Aufladen
            </DialogTitle>
            <DialogContent>
                {
                    rechargeObj.rechargeAmount !== 'new' && <>
                        <Typography>Für {rechargeObj.user}</Typography>
                        <Typography>{rechargeObj.rechargeAmount}€</Typography>
                        <Typography> aufladen?</Typography>
                    </>
                }
                {
                    rechargeObj.rechargeAmount === 'new' &&
                    <OutlinedInput error={inputError} value={inputValue} onChange={handleInputChange} endAdornment={<InputAdornment position="end">€</InputAdornment>} />
                }

            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose('cancel')}>Abbruch</Button>
                <Button disabled={inputValue === '' || inputError} onClick={() => handleClose('confirm')}>und los</Button>
            </DialogActions>
        </Dialog>
    )
}

export default RechargeDialog;