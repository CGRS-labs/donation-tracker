import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const sortable = true;

const columns = [
  { field: 'id', headerName: 'id', hide: true, },
  { field: 'name', headerName: 'Item', width: 300, flex: 3, sortable },
  { field: 'category', headerName: 'Category', width: 300, flex: 3, sortable },
  { field: 'total_needed', headerName: 'Total Needed', width: 150, flex: 1, align: 'center', headerAlign: 'center', sortable },
  { field: 'total_received', headerName: 'Total Received', width: 150, flex: 1, align: 'center', headerAlign: 'center', sortable },
];

export default function GlobalItemTable({ rows }) {
  const [pageSize, setPageSize] = React.useState(15);

  return (
    <div style={{ height: 500, }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 15, 50]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </div>
  );
}
