import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Typography } from '@mui/material';
import { buyObj } from '../Home';

interface BuyDialogProps extends DialogProps {
    onClose: () => void,
    drinksData: buyObj
}

const BuyDialog = (props: BuyDialogProps) => {
    const { open, onClose, drinksData } = props

    const handleClose = (_status: 'confirm' | 'cancel') => {
        if (_status === 'confirm') {
            console.log("send API request")
        }
        onClose()
    }

    const getDrinkTable = () => {
        let returnObj: any = [];
        for (const key in drinksData.selectedDrinks) {
            returnObj.push(<Typography key={key}>{drinksData.selectedDrinks[key]} x {key}</Typography>)
        }
        return returnObj
    }

    return (
        <Dialog open={open} onClose={() => handleClose('cancel')} fullWidth={true}>
            <DialogTitle>
                Kauf bestätigen
            </DialogTitle>
            <DialogContent>
                <Typography>Für {drinksData.user} gibts:</Typography>
                {
                    getDrinkTable()
                }

            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose('cancel')}>Abbruch</Button>
                <Button onClick={() => handleClose('confirm')}>zum hä</Button>
            </DialogActions>
        </Dialog>
    )
}

export default BuyDialog;