import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { GETTAPI_URL } from '../constants';
import { format } from 'date-fns';

const Traininglist = () => {
    const [trainings, setTrainings] = useState([]);
    const [columnDefs] = useState([
        {
            field: 'date',
            sortable: true,
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
    ]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch(GETTAPI_URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Something went wrong');
                }
            })
            .then((data) => setTrainings(data))
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div
                className="ag-theme-material"
                style={{ height: 600, width: '90%', margin: 'auto' }}
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
};

export default Traininglist;
