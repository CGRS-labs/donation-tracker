import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SendIcon from '@mui/icons-material/Send';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// const rows = [
//   { id: 1, item: 'Hello', category: 'World', chapter: 'Boston', qty: '100' },
//   { id: 2, item: 'DataGrid', category: 'is Awesome', chapter: 'Boston', qty: '100' },
//   { id: 3, item: 'MUI', category: 'is Amazing', chapter: 'Boston', qty: '100' },
// ];

// json server  {"id" , "total_needed", "name"}

const columns = [
  { field: 'name', headerName: 'Item', width: 300 },
  { field: 'id', headerName: 'Chapter', width: 150 },
  { field: 'total_needed', headerName: 'Quantity', width: 100 },
  { field: 'Increment', renderCell: (cellValues) => { 
    return (
      <div>
        <span>
          <IconButton
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >< AddCircleIcon /></IconButton>
        </span>
        <span>
          <IconButton
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >< RemoveCircleIcon /></IconButton> 
        </span>
      </div>
    );},
  },
  { field: 'Distribute', renderCell: (cellValues) => { 
    return (
      <IconButton
        variant="contained"
        color="warning"
        onClick={(event) => {
          handleClick(event, cellValues);
        }}
      >< RocketLaunchIcon /></IconButton>
    );},
  },
];

export default function ItemTable() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('/api/items')
      .then((data) => data.json())
      .then((rows) => {
        console.log(rows);
        setTableData(rows);
      });
  }, []);

  // console.log(tableData);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={tableData} columns={columns} pageSize={15} />
    </div>
  );
}