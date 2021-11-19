import { DeleteOutline } from "@material-ui/icons";
import styled from "styled-components";


export const Container = styled.div`
    flex:4;
`
export const Title = styled.span`
font-size: 22px;
font-weight: 600;
`

export const Avatar = styled.img`
    width:40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`

export const PageContainer = styled.div`
    display: flex;
    margin-top:10px;
`
export const Button = styled.button`
  margin-top: 30px;
  width:200px;
  padding: 7px 10px;
  border: none;
  border-radius: 10px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`

///////////// List

export const ListContainer = styled.div`
    display: flex;
    align-items: center;
`
export const ListImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`
export const ListEdit = styled.button`
    border:none;
    border-radius: 10px;
    padding:5px 10px;
    background-color: #3bb077;
    color:white;
    cursor:pointer;
    margin-right: 20px;
`
export const ListDelete = styled(DeleteOutline)`
    color:red;
    cursor:pointer;
`