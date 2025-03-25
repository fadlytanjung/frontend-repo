/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Box, Paper, TextField, Typography } from "@mui/material";

export default function DataTable({
  columns,
  rows,
  meta,
  onChangeSearch,
  onPageChange,
  searchValue,
  title,
}: {
  columns: GridColDef[];
  rows: Record<string, any>[];
  meta: {
    total: number;
    count: number;
    page: number;
    page_size: number;
  };
  onChangeSearch: (s: string) => void;
  onPageChange: (page: number, pageSize: number) => void;
  searchValue?: string;
  title?: string;
}) {
  return (
    <>
      <Box className="flex items-center justify-between my-4">
        <Typography variant="h6" gutterBottom>
          {title || "Data Table"}
        </Typography>
        <TextField
          label="Search"
          size="small"
          onChange={(e) => onChangeSearch(e.target.value)}
          value={searchValue || ""}
        />
      </Box>
      <Paper sx={{ minHeight: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={meta.total || 10}
          paginationMode="server"
          paginationModel={{
            page: meta.page - 1 || 0,
            pageSize: meta.page_size || 10,
          }}
          onPaginationModelChange={(model: GridPaginationModel) => {
            onPageChange?.(model.page + 1, model.pageSize);
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  );
}
