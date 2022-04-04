import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// const [tableData, setTableData] = useState([]);

// useEffect(() => {
//   fetch('/api/items/all')
//     .then((data) => data.json())
//     .then((data) => setTableData(data));
// }, []);

const rows = [
  { id: 1, item: 'Hello', category: 'World', chapter: 'Boston', qty: '100' },
  { id: 2, item: 'DataGrid', category: 'is Awesome', chapter: 'Boston', qty: '100' },
  { id: 3, item: 'MUI', category: 'is Amazing', chapter: 'Boston', qty: '100' },
];

const columns = [
  { field: 'item', headerName: 'Item', width: 300 },
  { field: 'category', headerName: 'Category', width: 300 },
  { field: 'chapter', headerName: 'Chapter', width: 300 },
  { field: 'qty', headerName: 'Quantity', width: 150 },
];
export default function ItemTable() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={15} />
    </div>
  );
}