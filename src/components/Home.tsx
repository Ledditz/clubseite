import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import SearchBar from './SearchBar';
import BuyDialog from './userCard/BuyDialog';
import RechargeDialog from './userCard/RechargeDialog';
import UserCard from './userCard/UserCard';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../ColorModeContext';

interface user {
    name: string,
    amount: number
}

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

const userDataMock: user[] = [
    { name: "Hans Wurst", amount: 1.5 },
    { name: "Max Mustermann", amount: 10 },
    { name: "R. Satzmann", amount: 6.5 },
    { name: "Spritt Kanne", amount: 0.5 },
    { name: "Karl Gustav", amount: 1.5 },
    { name: "Hinz", amount: 10 },
    { name: "Kunz", amount: 6.5 },
    { name: "Max", amount: 0.5 },
    { name: "Moritz", amount: 1.5 },
    { name: "Dings Bums", amount: 10 },
    { name: "R. Satzmann", amount: 6.5 },
    { name: "Spritt Kanne", amount: 0.5 },
    { name: "Hans Günther", amount: 1.5 },
    { name: "Max Mustermann", amount: 10 },
    { name: "R. Satzmann", amount: 6.5 },
    { name: "Spritt Kanne", amount: 0.5 }
]

const Home = (props: HomeProps) => {
    const { onLogoutClick } = props
    const [isExpanded, setIsExpanded] = useState<number>(-1)
    const [dialogOpen, setDialogOpen] = useState<string>('')
    const [drinkData, setDrinkData] = useState<any>({})
    const [rechargeData, setRechargeData] = useState<any>({})
    const [filteredUserData, setFilteredUserData] = useState<user[]>([])
    const { mode } = useColorMode()
    const navigate = useNavigate()

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
            newData = userDataMock
        } else {
            const lowerCaseSearchTerm = _term.toLowerCase()
            newData = userDataMock.filter(user => {
                const lowerCaseUserName = user.name.toLowerCase();
                return lowerCaseUserName.indexOf(lowerCaseSearchTerm) !== -1
            })

        }
        setFilteredUserData(newData)
        // console.log(_term)
    }

    return (
        <Box bgcolor={mode === 'light' ? "lightgrey" : "grey"}>
            <SearchBar onInputChange={handleInputChange} onLogoutClick={handleLogoutClick} />
            <Stack direction="column" alignItems="flex-start" justifyContent="center" marginTop={8} paddingTop={2}>
                {filteredUserData.map((user, idx) =>
                    <UserCard
                        key={idx}
                        name={user.name}
                        amount={user.amount}
                        onExpand={handleExpandChange}
                        expandIdx={idx}
                        expandedIdx={isExpanded}
                        onBuyClick={handleBuyClick}
                        onRechargeClick={handleRechargeClick}
                    />)}
            </Stack>
            {dialogOpen === 'buy' && <BuyDialog open onClose={handleCloseDialog} drinksData={drinkData} />}
            {dialogOpen === 'recharge' && <RechargeDialog open onClose={handleCloseDialog} rechargeObj={rechargeData} />}
        </Box>

    )
}

export default Home;