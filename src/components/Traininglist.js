import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { GETTAPI_URL, TAPI_URL } from '../constants';
import { format } from 'date-fns';
import { Button } from '@mui/material';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [columnDefs] = useState([
        {
            field: 'date',
            sortable: true,
            filter: true,
            valueFormatter: (params) =>
                format(new Date(params.value), 'dd.MM.yyyy hh:mm'),
        },
        {
            field: 'duration',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            field: 'activity',
            sortable: true,
            filter: true,
        },
        {
            headerName: 'Booker',
            field: 'customer.firstname&customer.lastname',
            sortable: true,
            filter: true,
            valueGetter: (params) =>
                params.data.customer.firstname +
                ' ' +
                params.data.customer.lastname,
        },
        {
            width: 120,
            cellRenderer: (params) => (
                <Button
                    color="error"
                    size="small"
                    onClick={() => deleteTraining(params.data)}
                >
                    Delete
                </Button>
            ),
        },
    ]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch(GETTAPI_URL)
            .then((response) => {
                if (response.ok) return response.json();
                else alert('Something went wrong');
            })
            .then((data) => setTrainings(data))
            .catch((err) => console.error(err));
    };

    const deleteTraining = (data) => {
        if (window.confirm('Are you sure?')) {
            fetch(TAPI_URL + '/' + data.id, { method: 'DELETE' })
                .then((response) => {
                    if (response.ok) getTrainings();
                    else alert('Something went wrong');
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <>
            <div
                className="ag-theme-material"
                style={{
                    height: '50vh',
                    width: '90%',
                    display: 'inline-block',
                    maxWidth: 1250,
                    margin: 'auto',
                }}
            >
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    suppressCellFocus={true}
                    paginationPageSize={10}
                    animateRows={true}
                />
            </div>
        </>
    );
}
