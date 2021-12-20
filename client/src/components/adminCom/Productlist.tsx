import { Container, ListContainer, ListDelete, ListEdit, ListImg } from './Theme'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useGetProductsQuery, useDeleteProductByIdMutation} from '../../redux/api'
import { CircularProgress } from '@material-ui/core';
import { useState } from 'react';
const Productlist = () => {
    const [page,setPage] = useState(0);
    const { data , isError, isLoading} = useGetProductsQuery(page);
    const [ deleteProduct,{isLoading:deleteLoading} ] = useDeleteProductByIdMutation();
    
    const handleDelete = async(id:any)=>{
        try{
            await deleteProduct(id)
        }catch(err){
            console.log(err)
        }
    }
    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'product', headerName:'Product',width:300, renderCell:(params)=>{
            return(
                <ListContainer>
                    <ListImg src={params.row.img} alt=""/>
                    {params.row.title}
                </ListContainer>
      
            )
        }},
        { field: 'inStock', headerName: 'Stock', width: 200 },
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
                      <Link to={"/admin/product/"+ params.row._id}>
                       <ListEdit>Edit</ListEdit>
                      </Link>
                       {deleteLoading ? <CircularProgress/> :<ListDelete onClick={()=>handleDelete(params.row._id)}/> }
                    </>
                )
            }
        },
      ];
    return (
        <Container>
            {isError ? (
            <>Oh no, there was an error</>
            ) : isLoading ? (
            <>Loading...</>
            ) : data && (
            <DataGrid
                rows={data.data}
                columns={columns}
                pagination
                getRowId={(row)=> row._id}
                pageSize={8}
                rowsPerPageOptions={[8]}
                rowCount={data.totalPage*8}
                loading={isLoading}
                paginationMode="server"
                onPageChange={(newPage)=>setPage(newPage)}
                // checkboxSelection
                disableSelectionOnClick
            /> )}
        </Container> 
    )
}

export default Productlist
