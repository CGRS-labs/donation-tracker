import React, { useContext, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SendIcon from '@mui/icons-material/Send';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useToken from '../../hooks/useToken';
import { UserContext } from '../../hooks/userContext';

export default function ItemTable(props) {
  const [pageSize, setPageSize] = useState(15);
  const { token } = useToken();
  const { user } = useContext(UserContext);

  const increment = async (event, cellValues) => {
    event.preventDefault();

    const itemId = cellValues.id;
    const total = cellValues.row.total_received + 1;
    console.log(cellValues, 'total', cellValues.row.total_received);

    try {
      const response = await fetch(`/api/chapters/${user.chapterId}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ total_received: total }),
      });

      if (response.ok) {
        props.updateTable();
      }

    } catch (err) {
      console.log(err);
    }
  };

  const decrement = async (event, cellValues) => {
    event.preventDefault();

    const itemId = cellValues.id;
    const total = cellValues.row.total_received - 1;
    console.log(cellValues, 'total', cellValues.row.total_received);

    try {
      const response = await fetch(`/api/chapters/${user.chapterId}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ total_received: total }),
      });

      if (response.ok) {
        props.updateTable();
      }

    } catch (err) {
      console.log(err);
    }
  };

  const shipIt = async (event, cellValues) => {
    event.preventDefault();
    const itemId = cellValues.id;
    try {
      const response = await fetch(`/api/chapters/${user.chapterId}/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        // <Alert severity="success"> // FIXME: This isn't working?!
        //   <AlertTitle>Success</AlertTitle>
        //   This item has been shipped — <strong>Thanks for your donation!</strong>
        // </Alert>;
        props.updateTable();
      }

    } catch (err) {
      console.log(err);
    }
  };

  const columns = [

    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Item', width: 200 },
    { field: 'category', headerName: 'Category', width: 200 },
    { field: 'total_needed', headerName: 'Needed', width: 100 },
    { field: 'total_received', headerName: 'Received', width: 100 },
    {
      field: 'Increment', renderCell: (cellValues) => {
        return (
          <div>
            <span>
              <IconButton
                variant="contained"
                color="primary"
                onClick={(event) => {
                  increment(event, cellValues);
                }}
              >< AddCircleIcon /></IconButton>
            </span>
            <span>
              <IconButton
                variant="contained"
                color="primary"
                onClick={(event) => {
                  decrement(event, cellValues);
                }}
              >< RemoveCircleIcon /></IconButton>
            </span>
          </div>
        );
      },
    },
    {
      field: 'Distribute', align: 'center', renderCell: (cellValues) => {
        return (
          <IconButton
            variant="contained"
            color="warning"
            onClick={(event) => {
              shipIt(event, cellValues);
              props.updateTable();
            }}
          >< RocketLaunchIcon /></IconButton>
        );
      },
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={props.tableData}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 15, 50]}
        onPageSizeChange={(newPageSize) => setPageSize()}
        updateTable={props.updateTable} />
    </div>
  );
}