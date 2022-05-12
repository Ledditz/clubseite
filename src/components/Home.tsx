import { Stack } from '@mui/material';
import React, { useState } from 'react';
import BuyDialog from './userCard/BuyDialog';
import UserCard from './userCard/UserCard';

interface user {
    name: string,
    amount: number
}

export interface buyObj {
    user: string,
    selectedDrinks: any
}

const userDataMock: user[] = [
    { name: "Hans Wurst", amount: 1.5 },
    { name: "Max Mustermann", amount: 10 },
    { name: "R. Satzmann", amount: 6.5 },
    { name: "Spritt Kanne", amount: 0.5 }
]

const Home = () => {
    const [isExpanded, setIsExpanded] = useState<number>(-1)
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [drinkData, setDrinkData] = useState<any>({})

    const handleExpandChange = (idx: number) => {
        setIsExpanded(idx === isExpanded ? -1 : idx)
    }

    const handleBuyClick = (_drinksObj: buyObj) => {
        console.log(_drinksObj)
        setDrinkData(_drinksObj)
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setIsExpanded(-1)
    }

    return (
        <div>
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
                {userDataMock.map((user, idx) => <UserCard key={idx} name={user.name} amount={user.amount} onExpand={handleExpandChange} expandIdx={idx} expandedIdx={isExpanded} onBuyClick={handleBuyClick} />)}
            </Stack>
            <BuyDialog open={dialogOpen} onClose={handleCloseDialog} drinksData={drinkData} />
        </div>
    )
}

export default Home;