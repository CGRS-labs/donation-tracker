import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// const rows = [
//   { id: 1, item: 'Hello', category: 'World', chapter: 'Boston', qty: '100' },
//   { id: 2, item: 'DataGrid', category: 'is Awesome', chapter: 'Boston', qty: '100' },
//   { id: 3, item: 'MUI', category: 'is Amazing', chapter: 'Boston', qty: '100' },
// ];

// json server  {"id" , "total_needed", "name"}

const columns = [
  { field: 'name', headerName: 'Item', width: 300 },
  { field: 'id', headerName: 'Chapter', width: 300 },
  { field: 'total_needed', headerName: 'Quantity', width: 150 },
];

export default function ItemTable() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let mounted = true;

    fetch('/api/items')
      .then((data) => data.json())
      .then((rows) => {
        // only update if component is still mounted
        if (mounted) setTableData(rows);
      });

    // This cleanup function runs just before the component unmounts and before every re-render. 
    return () => mounted = false;
  }, []);

  // console.log(tableData);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={tableData} columns={columns} pageSize={15} />
    </div>
  );
}