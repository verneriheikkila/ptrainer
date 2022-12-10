import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import Button from '@mui/material/Button';
import { CAPI_URL } from '../constants';

export default function ExportCSV() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => getData(), []);

    const getData = () => {
        fetch(CAPI_URL)
            .then((res) => res.json())
            .then((data) => {
                const parsedData = data.content.map(
                    ({ content, links, ...others }) => others
                );
                setCustomers(parsedData);
            });
    };

    return (
        <div>
            <CSVLink data={customers}>
                <Button size="small" variant="outlined">
                    Export CSV
                </Button>
            </CSVLink>
        </div>
    );
}
