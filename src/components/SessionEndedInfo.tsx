import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Typography } from '@mui/material';

interface SessionEndedInfoProps extends DialogProps {
    onClose: () => void
}

const SessionEndedInfo = (props: SessionEndedInfoProps) => {
    const { open, onClose } = props

    return (
        <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth='xs'>
            <DialogTitle>
                Session abgelaufen
            </DialogTitle>
            <DialogContent>
                <Typography>Bitte Logge dich erneut ein.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SessionEndedInfo;