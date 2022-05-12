import React from 'react';
import { Box } from '@mui/material';

interface TabContentProps {
    children?: React.ReactNode;
    index: number;
    openTab: number;
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

export default TabContent