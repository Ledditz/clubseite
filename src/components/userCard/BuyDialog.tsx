import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Typography } from '@mui/material';
import { buyObj } from '../Home';

interface BuyDialogProps extends DialogProps {
    onClose: () => void,
    drinksData: buyObj,
    onConfirm: () => void
}

const BuyDialog = (props: BuyDialogProps) => {
    const { open, onClose, onConfirm, drinksData: { selectedDrinks, userName } } = props

    const getDrinkTable = () => {
        let returnObj: any = [];
        for (const key in selectedDrinks) {
            returnObj.push(<Typography variant='h6' key={key}>{selectedDrinks[key].amount} x {selectedDrinks[key].name}</Typography>)
        }
        return returnObj
    }

    return (
        <Dialog open={open} onClose={() => onClose()} fullWidth={true}>
            <DialogTitle>
                Kauf bestätigen
            </DialogTitle>
            <DialogContent>
                <Typography>Für {userName} gibts:</Typography>
                <Box paddingLeft={4}>
                    {
                        getDrinkTable()
                    }
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Abbruch</Button>
                <Button onClick={() => onConfirm()}>zum hä</Button>
            </DialogActions>
        </Dialog>
    )
}

export default BuyDialog;