import { useEffect, useState } from 'react';
import { Alert, AlertTitle, Backdrop, Box, CircularProgress, Collapse, Stack, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import BuyDialog from './userCard/BuyDialog';
import RechargeDialog from './userCard/RechargeDialog';
import UserCard from './userCard/UserCard';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../ColorModeContext';
import { useFetchUsers, user } from '../hooks/useFetchUsers';
import { useSendApiCall } from '../hooks/useSendApiCall';

interface HomeProps {
    onLogoutClick: () => void
}

export interface buyObj {
    user: string,
    selectedDrinks: any
}
export interface rechargeObj {
    user: string,
    rechargeAmount: number | 'new'
}

const Home = (props: HomeProps) => {
    const { onLogoutClick } = props
    const [isExpanded, setIsExpanded] = useState<number>(-1)
    const [dialogOpen, setDialogOpen] = useState<string>('')
    const [drinkData, setDrinkData] = useState<any>({})
    const [rechargeData, setRechargeData] = useState<any>({})
    const { users, isLoading, error } = useFetchUsers()
    const [filteredUserData, setFilteredUserData] = useState<user[]>([])
    const [sortedUsers, setSortedUsers] = useState<user[]>([])
    const { mode } = useColorMode()
    const navigate = useNavigate()
    const { error: sendError, isLoading: sendIsLoading, sendData } = useSendApiCall('/buy')
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        let users = filteredUserData
        setSortedUsers(users.sort((a, b) => a.name > b.name ? 1 : -1))

    }, [filteredUserData])

    useEffect(() => {
        setFilteredUserData(users)
    }, [users])

    useEffect(() => {
        setShowAlert(sendError)
        if (sendError)
            setTimeout(() => {
                console.log("genug Informiert")
                setShowAlert(false)
            }, 3000)
    }, [sendError])

    const handleExpandChange = (idx: number) => {
        setIsExpanded(idx === isExpanded ? -1 : idx)
    }

    const handleBuyClick = (_drinksObj: buyObj) => {
        // console.log(_drinksObj)
        setDrinkData(_drinksObj)
        setDialogOpen('buy')
    }

    const handleCloseDialog = () => {
        setDialogOpen('')
        setIsExpanded(-1)
    }

    const handleConfirmBuyDialog = () => {
        console.log('buy ', drinkData)
        sendData({ "test": "123" })
        handleCloseDialog()
    }

    const handleConfirmRechargeDialog = (_amount: number) => {
        console.log('recharge:', _amount, rechargeData)
        sendData({ "test": "456" })
        handleCloseDialog()
    }

    const handleRechargeClick = (rechargeObj: rechargeObj) => {
        // console.log(rechargeObj)
        setRechargeData(rechargeObj)
        setDialogOpen('recharge')
    }

    const handleLogoutClick = () => {
        onLogoutClick()
        navigate("/login")
    }

    const handleInputChange = (_term: string) => {
        let newData: user[] = []
        if (_term === '') {
            newData = users
        } else {
            const lowerCaseSearchTerm = _term.toLowerCase()
            newData = users.filter(user => {
                const lowerCaseUserName = user.name.toLowerCase();
                return lowerCaseUserName.indexOf(lowerCaseSearchTerm) !== -1
            })

        }
        setFilteredUserData(newData)
        // console.log(_term)
    }

    const showContent = () => {
        if (isLoading)
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', height: '90vh', alignItems: 'center' }}>
                    <CircularProgress size='4rem' />
                </Box>
            )

        if (error)
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', height: '90vh', alignItems: 'center' }}>
                    <Typography color={mode === 'light' ? 'black' : 'white'}>
                        Oh Oh da hat was nicht funktioniert..
                    </Typography>
                </Box>
            )

        return (
            <Stack direction="column" alignItems="flex-start" justifyContent="center" marginTop={8} paddingTop={2}>
                {sortedUsers.map((user, idx) =>
                    <UserCard
                        key={idx}
                        name={user.name}
                        amount={user.amount}
                        onExpand={handleExpandChange}
                        expandIdx={idx}
                        expandedIdx={isExpanded}
                        onBuyClick={handleBuyClick}
                        onRechargeClick={handleRechargeClick}
                    />
                )}
            </Stack>
        )
    }


    return (
        <Box bgcolor={mode === 'light' ? "lightgrey" : "grey"}>
            <SearchBar onInputChange={handleInputChange} onLogoutClick={handleLogoutClick} />
            {showContent()}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={sendIsLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Collapse in={showAlert} sx={{
                position: "fixed",
                bottom: 0,
                width: '100vw'
            }}>
                <Alert severity="error" >
                    <AlertTitle>Achtung</AlertTitle>
                    Das hat leider nicht funktioniert!
                </Alert>
            </Collapse>

            {dialogOpen === 'buy' && <BuyDialog open onClose={handleCloseDialog} onConfirm={handleConfirmBuyDialog} drinksData={drinkData} />}
            {dialogOpen === 'recharge' && <RechargeDialog open onClose={handleCloseDialog} onConfirm={handleConfirmRechargeDialog} rechargeObj={rechargeData} />}
        </Box>

    )
}

export default Home;