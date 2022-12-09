// @ts-nocheck
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import React from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';

function App() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="App">
            <BrowserRouter>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab component={Link} to="/customers" label="Customers" />
                    <Tab component={Link} to="/trainings" label="Trainings" />
                </Tabs>
                <Routes>
                    <Route exact path="/customers" element={<Customerlist />} />
                    <Route exact path="/trainings" element={<Traininglist />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
