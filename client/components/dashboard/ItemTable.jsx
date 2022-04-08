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
  
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'name', headerName: 'Item', width: 200 },
  { field: 'category', headerName: 'Category', width: 200 },
  { field: 'total_needed', headerName: 'Needed', width: 100 },
  { field: 'total_received', headerName: 'Received', width: 100 },
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

export default function ItemTable(props) {

  // console.log(props.tableData);
  // console.log(columns);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={props.tableData} columns={columns} pageSize={15} />
    </div>
  );
}