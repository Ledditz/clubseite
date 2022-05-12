import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import SearchBar from './SearchBar';
import BuyDialog from './userCard/BuyDialog';
import RechargeDialog from './userCard/RechargeDialog';
import UserCard from './userCard/UserCard';

interface user {
    name: string,
    amount: number
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

const Home = () => {
    const [isExpanded, setIsExpanded] = useState<number>(-1)
    const [dialogOpen, setDialogOpen] = useState<string>('')
    const [drinkData, setDrinkData] = useState<any>({})
    const [rechargeData, setRechargeData] = useState<any>({})
    const [filteredUserData, setFilteredUserData] = useState<user[]>([])


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

        <Box >
            <Box padding={1} bgcolor="lightblue" marginBottom={2}>
                <SearchBar onInputChange={handleInputChange} />
            </Box>
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
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
            <BuyDialog open={dialogOpen === 'buy'} onClose={handleCloseDialog} drinksData={drinkData} />
            <RechargeDialog open={dialogOpen === 'recharge'} onClose={handleCloseDialog} rechargeObj={rechargeData} />
        </Box>

    )
}

export default Home;