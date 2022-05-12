import { Stack } from '@mui/material';
import React, { useState } from 'react';
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
    { name: "Spritt Kanne", amount: 0.5 }
]

const Home = () => {
    const [isExpanded, setIsExpanded] = useState<number>(-1)
    const [dialogOpen, setDialogOpen] = useState<string>('')
    const [drinkData, setDrinkData] = useState<any>({})
    const [rechargeData, setRechargeData] = useState<any>({})

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

    return (
        <div>
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
                {userDataMock.map((user, idx) =>
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
        </div>
    )
}

export default Home;