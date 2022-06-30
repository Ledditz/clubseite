import React, { useState } from 'react';
import { Button, CardContent, Stack, styled, Tab, Tabs } from '@mui/material';
import Counter from './DrinkCounter';
import TabContent from '../styledComponents/TabContent';
import ButtonCircle from '../styledComponents/ButtonCircles';
import { QuestionMark } from '@mui/icons-material';

const StyledTab = styled(Tab)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: 'large',
        '&.Mui-selected': {
            fontWeight: theme.typography.fontWeightBold,
        },
    }),
);

const StyledTabs = styled(Tabs)({
    borderTop: '1px solid #cccccc'
})

const drinkMockData = [
    { id: 1, name: 'Bier', cost: 1.5 },
    { id: 2, name: 'Limo', cost: 1 },
    { id: 3, name: 'Dickes', cost: 2 },
]

interface CardFlyoutProps {
    userMoney: number,
    onBuyClick: (selectedDrinksObj: any) => void
    onRechargeClick: (amount: number | 'new') => void
}

const CardFylout = (props: CardFlyoutProps) => {
    const { onBuyClick, onRechargeClick, userMoney } = props
    const [openTab, setOpenTab] = useState(userMoney < 1 ? 1 : 0)
    const [currentAmountToPay, setCurrentAmountToPay] = useState(0)
    const [drinkCounts, setDrinkCounts] = useState<any>({})
    const presets = [5, 10, 15];

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setOpenTab(newValue);
    };

    const handleDrinkAmountChange = (_drinkID: number, _newAmount: number) => {
        let newDrinkCounts = drinkCounts
        if (_newAmount === 0) {
            delete newDrinkCounts[_drinkID]
        } else {
            // just rember id and amount if API handels costs self
            newDrinkCounts[_drinkID] = {
                amount: _newAmount,
                name: drinkMockData.find(el => el.id === _drinkID)?.name
            }

            // or rember costs to send cost sum to API
            // const position = drinkMockData.findIndex(el => el.id === _drinkID)
            // drinkCounts[_drinkID] = {
            //     amount: _newAmount,
            //     cost: drinkMockData[position].cost
            // }
        }
        let newAmount = 0;
        Object.keys(newDrinkCounts).forEach((drink) => {
            const position = drinkMockData.findIndex(el => el.id === parseInt(drink))
            newAmount += drinkMockData[position].cost * newDrinkCounts[drink].amount
        })
        setCurrentAmountToPay(newAmount)
        setDrinkCounts(newDrinkCounts)
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
                            <Counter disabled={currentAmountToPay + drink.cost > userMoney} drink={drink} onAmountChange={handleDrinkAmountChange} />
                        </div>
                    )}
                </Stack>
                <Button disabled={Object.keys(drinkCounts).length === 0} variant='contained' sx={{ width: '100%', marginTop: '1rem' }} onClick={() => onBuyClick(drinkCounts)}>
                    Abfahrt
                </Button>
            </TabContent>
            <TabContent openTab={openTab} index={1}>
                <Stack direction="row" spacing={2} justifyContent='center'>
                    {presets.map((pre, idx) =>
                        <Button key={idx} onClick={() => onRechargeClick(pre)}>
                            <ButtonCircle >{pre}€</ButtonCircle>
                        </Button>
                    )}
                    <Button onClick={() => onRechargeClick('new')}>
                        <ButtonCircle>
                            <QuestionMark />
                        </ButtonCircle>
                    </Button>
                </Stack>
            </TabContent>
        </CardContent >
    )
}

export default CardFylout;