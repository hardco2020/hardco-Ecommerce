
import React, { useState } from 'react'
import { Container, ListContainer, ListDelete, ListEdit, ListImg } from './Theme'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { UserRows } from '../../dummyData';
import { Link } from 'react-router-dom';

const Userlist = () => {
const [data,setData] = useState(UserRows);
const handleDelete = (id:any)=>{
    setData(data.filter((item)=>item.id!==id));
}
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'user', headerName:'User',width:200, renderCell:(params)=>{
      return(
          <ListContainer>
              <ListImg src={params.row.avatar} alt=""/>
              {params.row.username}
          </ListContainer>

      )
  }},
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'status',
    headerName: 'Status',
    width: 90,
  },
  {
    field: 'transaction',
    headerName: 'Transaction Volume',
    width: 160,
  },
  {
      field:"action",
      headerName:"Action",
      width: 150,
      renderCell:(params)=>{
          return(
              <>
                <Link to={"user/"+ params.row.id}>
                 <ListEdit>Edit</ListEdit>
                </Link>
                 <ListDelete onClick={()=>handleDelete(params.row.id)}/>
              </>
          )
      }
  },
];

    return (
        <Container>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
            />
        </Container>
    )
}

export default Userlist
