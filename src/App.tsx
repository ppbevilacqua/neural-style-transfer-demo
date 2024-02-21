import {Box, Tab, Typography} from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import React, {useCallback, useState} from 'react'
import './App.css'
import {TabList, TabPanel} from '@mui/lab'
import ArtBankPredictionCompontent from './components/artbank-prediction/ArtBankPredictionCompontent'
import NNSTPredictionComponent from './components/nnst-prediction/NNSTPredictionComponent'

enum EStyleTransferTabs {
    NNST = 'NNST',
    ARTBANK = 'ARTBANK'
}

const App = () => {

    const [value, setValue] = useState(EStyleTransferTabs.NNST)

    const handleChange = useCallback((event: React.SyntheticEvent, newValue: EStyleTransferTabs) => {
        setValue(newValue)
    }, [])

    return <div className="container py-5">

        <div className="row mb-2">
            <div className="d-flex justify-content-center">
                <Typography variant="h3" style={{fontWeight: 'bold'}}>NEURAL STYLE TRANSFER</Typography>
            </div>
        </div>

        <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="NNST" value={EStyleTransferTabs.NNST}/>
                    <Tab label="ArtBank" value={EStyleTransferTabs.ARTBANK}/>
                </TabList>
            </Box>

            <TabPanel value={EStyleTransferTabs.NNST}>
                <NNSTPredictionComponent/>
            </TabPanel>

            <TabPanel value={EStyleTransferTabs.ARTBANK}>
                <ArtBankPredictionCompontent/>
            </TabPanel>
        </TabContext>

    </div>
}

export default App
