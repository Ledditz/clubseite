import { Box, Card, CardContent, Collapse, Container, Grid, IconButton, IconButtonProps, Stack, styled, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { lightBlue } from '@mui/material/colors';
import CardFlyout from './CardFlyout';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface UserCardProps {
    name: string,
    amount: number,
    expandIdx: number,
    onExpand: (idx: number) => void,
    expandedIdx: number
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: '1rem',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const StyledCard = styled(Card)({
    minHeight: "3rem",
    padding: "1rem",
    marginBottom: "1rem"
})

const UserCard = (props: UserCardProps) => {
    const { name, amount, expandIdx, expandedIdx, onExpand } = props
    const roundedAmount = amount.toFixed(2)
    const isExpanded = expandedIdx === expandIdx

    const handleBuyClick = (_drinksObj: any) => {
        alert("Herzlichen Glückwunsch: " + _drinksObj.toString())
        onExpand(expandIdx)
    }

    return (
        <Container maxWidth="sm">
            <StyledCard>
                <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" onClick={() => onExpand(expandIdx)}>
                        <Typography variant="h6">{name}</Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" color={amount < 2 ? 'red' : ''}>{roundedAmount} €</Typography>
                            <ExpandMore
                                expand={isExpanded}
                                onClick={() => onExpand(expandIdx)}
                                aria-expanded={isExpanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </Stack>
                    </Stack>
                </Box>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ backgroundColor: '#f2f2f2' }}>
                    <CardFlyout onBuyClick={handleBuyClick} />
                </Collapse>
            </StyledCard>
        </Container>
    )
}

export default UserCard;