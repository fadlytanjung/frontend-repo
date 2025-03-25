/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/store/actions";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { Meta } from "@/store/reducers";
import { EditNoteOutlined } from "@mui/icons-material";
import { useLocalUid } from "./hooks/useLocalUid";
import DataTable from "./atoms/DataTable";
import dayjs from "dayjs";

export default function ListUser() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [q, setQ] = useState("");
  const uid = useLocalUid();
  const { users } = useAppSelector((s) => s.user);

  useEffect(() => {
    dispatch(
      fetchUsers({
        page,
        size,
        q,
      })
    );
  }, [page, size, q]);

  const handlePageChange = (newPage: number, newSize: number) => {
    setPage(newPage);
    setSize(newSize);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 50,
    },
    {
      field: "recentlyActive",
      headerName: "Recently Active",
      type: "string",
      width: 250,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => router.push(`/users/${params.row.id}`)}
          disabled={uid === params.row.id}
        >
          <EditNoteOutlined />
        </Button>
      ),
    },
  ];

  const rows = (users.data || []).map((el) => ({
    id: el.id,
    name: el.name,
    email: el.email,
    age: el.age,
    recentlyActive: dayjs(el.recentlyActive).format("YYYY-MM-DDTHH:mm"),
  }));

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <DataTable
        title="User Lists"
        searchValue={q}
        onChangeSearch={(e) => setQ(e)}
        rows={rows}
        columns={columns}
        meta={users.meta as Meta}
        onPageChange={(p, s) => handlePageChange(p, s)}
      />
    </Box>
  );
}
