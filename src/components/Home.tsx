import { Stack } from '@mui/material';
import React, { useState } from 'react';
import UserCard from './userCard/UserCard';

interface user {
    name: string,
    amount: number
}

const userDataMock: user[] = [
    { name: "Hans Wurst", amount: 1.5 },
    { name: "Max Mustermann", amount: 10 },
    { name: "R. Satzmann", amount: 6.5 },
    { name: "Spritt Kanne", amount: 0.5 }
]

const Home = () => {
    const [isExpanded, setIsExpanded] = useState<number>(-1)

    const handleExpandChange = (idx: number) => {
        setIsExpanded(idx === isExpanded ? -1 : idx)
    }

    return (
        <Stack direction="column" alignItems="flex-start" justifyContent="center">
            {userDataMock.map((user, idx) => <UserCard key={idx} name={user.name} amount={user.amount} onExpand={handleExpandChange} expandIdx={idx} expandedIdx={isExpanded} />)}
        </Stack>
    )
}

export default Home;