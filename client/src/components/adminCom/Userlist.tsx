import React, { useEffect, useState } from "react";
import {
  Container,
  ListContainer,
  ListDelete,
  ListEdit,
  ListImg,
} from "./Theme";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDeleteUserMutation, useGetAllUserQuery } from "../../redux/api";
import { CircularProgress } from "@material-ui/core";
import Error from "../error/Error";
import {format} from 'timeago.js'
import { UserDataInterface } from "../../type/type";

const Userlist = () => {
  //Call RTK query
  const { data:userData, isLoading, isError } = useGetAllUserQuery();
  const [deleteUser,{isLoading:deleteLoading}] = useDeleteUserMutation();
  const [data, setData] = useState<UserDataInterface[]>([]);
  useEffect(() => {
    if(userData!==undefined){
        setData(userData)
    }
  }, [userData])
  const handleDelete = async(id: any) => {
    await deleteUser(id);
    // setData(data.filter((item) => item._id !== id));
    
  };
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <ListContainer>
            <ListImg src={params.row.img} alt="" />
            {params.row.username}
          </ListContainer>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 90,
    // },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 160,
      renderCell: (params) => {
        return (
          <>
           {format(params.row.createdAt)}
          </>
        );
      },
    },
    {
      field: "isAdmin",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"user/" + params.row._id}>
              <ListEdit>Edit</ListEdit>
            </Link>
            {deleteLoading ? <CircularProgress/> : <ListDelete onClick={() => handleDelete(params.row._id)}/>}
          </>
        );
      },
    },
  ];

  return (
    <Container>
      {isError ? (
        <Error />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          getRowId={(row)=> row._id}
          disableSelectionOnClick
        />
      )}
    </Container>
  );
};

export default Userlist;
