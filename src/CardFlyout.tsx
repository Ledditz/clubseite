import { Add, Remove } from '@mui/icons-material';
import { Avatar, Box, Button, CardContent, IconButton, Stack, styled, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface TabContentProps {
    children?: React.ReactNode;
    index: number;
    openTab: number;
}
interface StyledTabProps {
    label: string;
}

function TabContent(props: TabContentProps) {
    const { children, openTab, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={openTab !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {openTab === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const StyledTab = styled((props: StyledTabProps) => <Tab {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        minWidth: 0,
        [theme.breakpoints.up('sm')]: {
            minWidth: 0,
        },
        backgroundColor: '#ffffff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: 'large',
        color: 'rgba(0, 0, 0, 0.85)',
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&.Mui-selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightBold,
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#d1eaff',
        },
    }),
);

const StyledTabs = styled(Tabs)({
    borderTop: '1px solid #cccccc'
})

const drinkMockData = [
    { id: 1, name: 'Bier', cost: '1.5' },
    { id: 2, name: 'Cola', cost: '1' },
    { id: 3, name: 'Dickes', cost: '2' },
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
                    {drinkMockData.map(drink =>
                        <Counter id={drink.id} drinkName={drink.name} onAmountChange={handleDrinkAmountChange} />
                    )}
                </Stack>
                <Button variant='contained' sx={{ width: '100%', marginTop: '1rem' }} onClick={() => onBuyClick(drinkCounts)}>
                    Abfahrt
                </Button>
            </TabContent>
            <TabContent openTab={openTab} index={1}>
                <Typography>Hier wird aufgeladen</Typography>
            </TabContent>
        </CardContent>
    )
}

const ButtonCircle = styled(Avatar)({
    minWidth: "3rem", minHeight: "3rem"
})

interface CounterProps {
    id: number
    drinkName: string,
    onAmountChange: (_drinkID: number, _newAmount: number) => void
}

const Counter = (props: CounterProps) => {
    const { id, drinkName, onAmountChange } = props
    const [count, setCount] = useState(0)

    const handleCountChange = (_diff: number) => {
        if ((count + _diff) < 0) {
            setCount(0)
        } else {
            setCount(count + _diff)
        }
    }

    useEffect(() => {
        onAmountChange(id, count)
    }, [count])

    return (
        <Stack key={id} direction="row" spacing={2} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="flex-start">
                <IconButton onClick={() => handleCountChange(-1)}>
                    <ButtonCircle sx={{ minWidth: "3rem", minHeight: "3rem" }}>
                        <Remove />
                    </ButtonCircle>
                </IconButton>
                <Typography variant="h4">{count}</Typography>
                <IconButton onClick={() => handleCountChange(1)}>
                    <ButtonCircle>
                        <Add />
                    </ButtonCircle>
                </IconButton>
            </Stack>
            <Typography variant='h6'>{drinkName}</Typography>
        </Stack >
    )
}

export default CardFylout;