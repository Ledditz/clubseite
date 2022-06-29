import { Avatar, styled } from '@mui/material';

const ButtonCircle = styled(Avatar)(({ theme }) => ({
    minWidth: "3rem", minHeight: "3rem", backgroundColor: theme.palette.primary.main
}))
export default ButtonCircle