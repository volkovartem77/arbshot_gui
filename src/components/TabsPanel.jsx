import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Log from "./Log";
import Dashboard from "./Dashboard";
import History from "./History";
import Settings from "./Settings";
import Trades from "./Trades";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabsPanel() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Dashboard" {...a11yProps(0)} />
                    <Tab label="Trades" {...a11yProps(1)} />
                    <Tab label="Settings" {...a11yProps(2)} />
                    <Tab label="Log" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Dashboard/>
                <History/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Trades/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Settings/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Log/>
            </TabPanel>
        </Box>
    );
}

export default TabsPanel;