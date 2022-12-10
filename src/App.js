// @ts-nocheck
import './App.css';
import { HashRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import React from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import CalendarPg from './components/CalendarPg';

function App() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="App">
            <HashRouter>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab component={Link} to="/customers" label="Customers" />
                    <Tab component={Link} to="/trainings" label="Trainings" />
                    <Tab component={Link} to="/Calendar" label="Calendar" />
                </Tabs>
                <Routes>
                    <Route path="/" element={<Navigate to="/customers" />} />
                    <Route exact path="/customers" element={<Customerlist />} />
                    <Route exact path="/trainings" element={<Traininglist />} />
                    <Route exact path="/calendar" element={<CalendarPg />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
