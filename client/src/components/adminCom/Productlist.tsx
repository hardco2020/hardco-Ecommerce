import { Container, ListContainer, ListDelete, ListEdit, ListImg } from './Theme'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ProductRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Productlist = () => {
    const [data,setData] = useState(ProductRows);

    const handleDelete = (id:any)=>{
        setData(data.filter((item)=>item.id!==id));
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'product', headerName:'Product',width:200, renderCell:(params)=>{
            return(
                <ListContainer>
                    <ListImg src={params.row.img} alt=""/>
                    {params.row.name}
                </ListContainer>
      
            )
        }},
        { field: 'stock', headerName: 'Stock', width: 200 },
        {
          field: 'status',
          headerName: 'Status',
          width: 90,
        },
        {
          field: 'price',
          headerName: 'Price',
          width: 160,
        },
        {
            field:"action",
            headerName:"Action",
            width: 150,
            renderCell:(params)=>{
                return(
                    <>
                      <Link to={"/admin/product/"+ params.row.id}>
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

export default Productlist
