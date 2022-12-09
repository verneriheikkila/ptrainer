import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import { CAPI_URL } from '../constants';

const Customerlist = () => {
    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState([
        {
            headerName: 'First name',
            field: 'firstname',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            headerName: 'Last name',
            field: 'lastname',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            headerName: 'Street adress',
            field: 'streetaddress',
            sortable: true,
            filter: true,
        },
        {
            headerName: 'Postal code',
            field: 'postcode',
            sortable: true,
            filter: true,
            width: 150,
        },
        {
            field: 'city',
            sortable: true,
            filter: true,
            width: 150,
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

    return (
        <>
            <div
                className="ag-theme-material"
                style={{ height: 600, width: '90%', margin: 'auto' }}
            >
                <AgGridReact
                    rowData={customers}
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

export default Customerlist;
