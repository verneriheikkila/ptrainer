// @ts-nocheck
import { Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import { CAPI_URL, TAPI_URL } from '../constants';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import ExportCSV from './ExportCSV';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState([
        {
            headerName: 'Name',
            field: 'firstname&lastname',
            sortable: true,
            filter: true,
            width: 160,
            valueGetter: (params) =>
                params.data.firstname + ' ' + params.data.lastname,
        },
        {
            headerName: 'Street adress',
            field: 'streetaddress',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            headerName: 'Postal code',
            field: 'postcode',
            sortable: true,
            filter: true,
            width: 135,
        },
        {
            field: 'city',
            sortable: true,
            filter: true,
            width: 120,
        },
        {
            field: 'email',
            sortable: true,
            filter: true,
        },
        {
            headerName: 'Phone number',
            field: 'phone',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            width: 110,
            cellRenderer: (params) => (
                <AddTraining data={params.data} addTraining={addTraining} />
            ),
        },
        {
            width: 75,
            cellRenderer: (params) => (
                <EditCustomer
                    data={params.data}
                    updateCustomer={updateCustomer}
                />
            ),
        },
        {
            width: 115,
            cellRenderer: (params) => (
                <Button
                    color="error"
                    size="small"
                    onClick={() => deleteCustomer(params.data)}
                >
                    Delete
                </Button>
            ),
        },
    ]);

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch(CAPI_URL)
            .then((response) => {
                if (response.ok) return response.json();
                else alert('Something went wrong');
            })
            .then((data) => setCustomers(data.content))
            .catch((err) => console.error(err));
    };

    const addCustomer = (customer) => {
        fetch(CAPI_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer),
        })
            .then((response) => {
                if (response.ok) getCustomers();
                else alert('Something went wrong');
            })
            .catch((err) => console.error(err));
    };

    const updateCustomer = (customer, url) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer),
        })
            .then((response) => {
                if (response.ok) getCustomers();
                else alert('Something went wrong');
            })
            .catch((err) => console.error(err));
    };

    const deleteCustomer = (data) => {
        if (window.confirm('Are you sure you want to delete?'))
            fetch(data.links[0].href, { method: 'DELETE' }).then((response) => {
                if (response.ok) getCustomers();
                else
                    alert('Something went wrong in deletion').catch((err) =>
                        console.error(err)
                    );
            });
    };

    const addTraining = (training) => {
        training = {
            ...training,
            date: new Date(training.date).toISOString(),
        };
        fetch(TAPI_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training),
        })
            .then((response) => {
                if (response.ok) getCustomers();
                else alert('Something went wrong');
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div
                className="ag-theme-material"
                style={{
                    height: 600,
                    width: '90%',
                    display: 'inline-block',
                    maxWidth: 1250,
                    margin: 'auto',
                }}
            >
                <AddCustomer addCustomer={addCustomer} />
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    suppressCellFocus={true}
                    paginationPageSize={10}
                    animateRows={true}
                />
                <ExportCSV />
            </div>
        </>
    );
}
