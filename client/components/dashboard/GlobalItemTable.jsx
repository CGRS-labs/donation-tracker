import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const sortable = true;
// const editable = true; // TODO: Determin what columsn to make editable

const columns = [
  { field: 'id', headerName: 'id', hide: true, },
  { field: 'name', headerName: 'Item', width: 300, flex: 3, sortable },
  { field: 'category', headerName: 'Category', width: 300, flex: 3, sortable },
  { field: 'total_needed', headerName: 'Total Needed', width: 150, flex: 1, align: 'center', headerAlign: 'center', sortable },
  { field: 'tocal_received', headerName: 'Total Received', width: 150, flex: 1, align: 'center', headerAlign: 'center', sortable },
];

export default function ItemTable() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // TODO: Cancel this if component unmounts
    fetch('/api/items')
      .then((data) => data.json())
      .then((rows) => {
        setTableData(rows);
      })
      .catch((err => console.error(err)));
  }, []);

  return (
    <div style={{ height: 500, }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={15}
      />
    </div>
  );
}