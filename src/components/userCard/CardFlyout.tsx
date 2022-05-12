import React, { useState } from 'react';
import { Button, CardContent, Stack, styled, Tab, Tabs, Typography } from '@mui/material';
import Counter from './DrinkCounter';
import TabContent from '../styledComponents/TabContent';

const StyledTab = styled(Tab)(
    ({ theme }) => ({
        textTransform: 'none',
        backgroundColor: '#ffffff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: 'large',
        color: 'rgba(0, 0, 0, 0.85)',
        '&.Mui-selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightBold,
        },
    }),
);

const StyledTabs = styled(Tabs)({
    borderTop: '1px solid #cccccc'
})

const drinkMockData = [
    { id: 1, name: 'Bier', cost: 1.5 },
    { id: 2, name: 'Cola', cost: 1 },
    { id: 3, name: 'Dickes', cost: 2 },
]

interface CardFlyoutProps {
    onBuyClick: (selectedDrinksObj: any) => void
}

const CardFylout = (props: CardFlyoutProps) => {
    const { onBuyClick } = props
    const [openTab, setOpenTab] = useState(0)
    let drinkCounts: any = {}


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setOpenTab(newValue);
    };

    const handleDrinkAmountChange = (_drinkID: number, _newAmount: number) => {
        if (_newAmount === 0) {
            delete drinkCounts[_drinkID]
        } else {
            // just rember id and amount if API handels costs self
            drinkCounts[_drinkID] = _newAmount

            // or rember costs to send cost sum to API
            // const position = drinkMockData.findIndex(el => el.id === _drinkID)
            // drinkCounts[_drinkID] = {
            //     amount: _newAmount,
            //     cost: drinkMockData[position].cost
            // }
        }
    }

    return (
        <CardContent sx={{ padding: '0 !important' }}>
            <StyledTabs value={openTab} onChange={handleChange} variant='fullWidth' >
                <StyledTab label="saufen" />
                <StyledTab label="aufladen" />
            </StyledTabs>
            <TabContent openTab={openTab} index={0}>
                <Stack spacing={2}>
                    {drinkMockData.map((drink, idx) =>
                        <div key={idx}>
                            <Counter drink={drink} onAmountChange={handleDrinkAmountChange} />
                        </div>
                    )}
                </Stack>
                <Button variant='contained' sx={{ width: '100%', marginTop: '1rem' }} onClick={() => onBuyClick(drinkCounts)}>
                    Abfahrt
                </Button>
            </TabContent>
            <TabContent openTab={openTab} index={1}>
                <Typography>Hier wird aufgeladen</Typography>
            </TabContent>
        </CardContent >
    )
}


export default CardFylout;