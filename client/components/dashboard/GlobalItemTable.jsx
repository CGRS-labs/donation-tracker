import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const sortable = true;
// const editable = true;

const columns = [
  { field: 'id', headerName: 'id', hide: true, },
  { field: 'name', headerName: 'Item', width: 300, flex: 3, sortable },
  { field: 'category', headerName: 'Category', width: 300, flex: 3, sortable },
  { field: 'total_needed', headerName: 'Total Needed', width: 150, flex: 1, align: 'center', headerAlign: 'center', sortable },
  { field: 'total_received', headerName: 'Total Received', width: 150, flex: 1, align: 'center', headerAlign: 'center', sortable },
];

export default function ItemTable() {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = React.useState(15);

  useEffect(() => {
    // TODO: Cancel this if component unmounts
    fetch('/api/items')
      .then((data) => data.json())
      .then(({ items }) => {
        setTableData(items);
      })
      .catch((err => console.error(err)));
  }, []);

  return (
    <div style={{ height: 500, }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 15, 50]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </div>
  );
}