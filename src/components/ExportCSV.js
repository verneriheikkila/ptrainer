import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import Button from '@mui/material/Button';
import { CAPI_URL } from '../constants';

export default function ExportCSV() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => getCustomers(), []);

    const getCustomers = () => {
        fetch(CAPI_URL)
            .then((response) => response.json())
            .then((data) => {
                const parsedCustomers = data.content.map(
                    ({ content, links, ...others }) => others
                );
                setCustomers(parsedCustomers);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <CSVLink data={customers} style={{ textDecoration: 'none' }}>
                <Button size="small" variant="outlined">
                    Export CSV
                </Button>
            </CSVLink>
        </div>
    );
}
