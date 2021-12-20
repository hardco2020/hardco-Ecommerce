import React, { useState } from "react";
import styled from "styled-components";
import { Button as ThemeButton } from "./Theme";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useAddProductMutation } from '../../redux/api'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import app from "../../firebase";
import { AddProductInterface } from "../../type/type";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";
// import { useAddProductMutation } from '../../redux/api'

const Container = styled.div`
  display: flex;
  flex: 4;
`;
const FormContainer = styled.div`
  /* display: flex; */
  padding: 10px;
  flex: 2;
`;
const ImgContainer = styled.div`
  display: flex;
  padding: 10px;
  flex: 2;
`;
const Img = styled.img`
  width: 80%;
  height: 80%;
  object-fit: cover;
`;
const Title = styled.h1``;

const ProductForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductItem = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-right: 20px;
`;

const Productlabel = styled.label`
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;

type errorProp = {
    error:boolean;
}
const Error = styled.span<errorProp>`
    color:red;
    display: ${(prop)=>prop.error===true ? "flex" : "none"};
`

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Suits",
  "Sweaters",
  "Hoodies",
  "T-shirt",
  "Polo Shirts",
  "Pants",
  "Vests",
  "Coats"
];
const sizes = [
    "XL",
    "L",
    "3XL",
    "S",
    "XS",
    "2XS",
    "M",
  ];

const NewProduct = () => {
  const history = useHistory();
  const [addProduct,{isLoading}] = useAddProductMutation();
  const [updatePic, setUpdatePic] = useState<File | null>(null);
  const [updateImgData, setUpdateImgData] = useState<string | null>(null);
  const UpdatePic = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      if (event.target.files[0] !== null && event.target.files[0]) {
        setUpdatePic(event.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setUpdateImgData(reader.result as string);
        });
        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      setUpdatePic(null);
    }
  };
  // const [addProduct ,{isLoading}] = useAddProductMutation();
  //TODO:
  //  -[x] preview the upload image
  //  -[ ] upload image API
  //     -[x] get all the argument
  //     -[x] implement firebase
  //     -[x] error handling
  //  -[x] Fix form
  const [categoriesName, setCategoriesName] = React.useState<string[]>([]);
  const [size, setSize] = React.useState<string[]>([]);
  const [inStock, setInStock] = React.useState<string>("");
  const [desc,setDesc] = React.useState<string>("");
  const [productName,setProductName] = React.useState<string>("");
  const [price,setPrice] = React.useState<number>(-1);
  const [errorMessage,setErrorMessage] = React.useState<string>("");
  const handleSizeChange = (event: SelectChangeEvent<typeof size>) => {
    const {
      target: { value },
    } = event;
    setSize(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleCategoriesChange = (event: SelectChangeEvent<typeof categoriesName>) => {
    const {
      target: { value },
    } = event;
    setCategoriesName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleStockChange = (event: SelectChangeEvent) => {
    setInStock(event.target.value as string);
  };

  const handleUpdate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try{
        //if not fill all the form 
        if(size.length!==0 && categoriesName.length!==0 && inStock!=="" && desc!=="" && price>=0 && productName!==""  ){
            //check update pic or not
            let updateProduct:AddProductInterface;
            if(updatePic!==null){
                console.log(updatePic)
                const fileName = new Date().getTime() + updatePic.name;
                const storage = getStorage(app);
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, updatePic);
                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                        console.log("Upload is paused");
                        break;
                        case "running":
                        console.log("Upload is running");
                        break;
                    }
                    },
                    (error) => {
                    // Handle unsuccessful uploads
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                            console.log("File available at", downloadURL);
                            updateProduct = {
                                title: productName,
                                desc: desc,
                                price: price,
                                categories: categoriesName,
                                inStock: inStock==="1",
                                img: downloadURL,
                                size: size,
                                color: ["#BBFFFF","#F2E6E6","#BB5E00"]
                            };
                            await addProduct(updateProduct)
                        });
                    }
                );
            }
            else{
                updateProduct = {
                    title: productName,
                    desc: desc,
                    price: price,
                    categories: categoriesName,
                    inStock: inStock==="1",
                    size: size,
                    color: ["#BBFFFF","#F2E6E6","#BB5E00"]
                };
                await addProduct(updateProduct)
            }
            history.push('/admin/products')
            setErrorMessage("")
        }else{
            setErrorMessage("Not Completed");
        }
    }catch(err){
        setErrorMessage("Something is wrong,please refresh the page or contact us");
    }
    //upload the pic to firestore first
  };
  return (
    <Container>
      <FormContainer>
        <Title>New Product</Title>
        <ProductForm>
          <ProductItem>
            {/* <Productlabel>Image</Productlabel>
                    <ProductInput type="file" id="file"/> */}
            <input
              hidden
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(e) => UpdatePic(e)}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </ProductItem>
          <ProductItem>
            {/* <Productlabel>Name</Productlabel> */}
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
              onChange={(e)=>setProductName(e.target.value as string)}
            />
          </ProductItem>
          <ProductItem>
            {/* <Productlabel>Description</Productlabel> */}
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              required
              onChange={(e)=>setDesc(e.target.value as string)}
            />
            {/* <ProductInput type="text" placeholder="Description" required/> */}
          </ProductItem>
          <ProductItem>
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              type="number"
              required
              onChange={(e)=>setPrice(parseInt(e.target.value))}
            />
            {/* <Productlabel>Price</Productlabel>
                    <ProductInput type="number" placeholder="Price" required/> */}
          </ProductItem>
          <ProductItem>
            <Productlabel>Categories</Productlabel>
            <Select
              labelId="categorySelect"
              id="categorySelect"
              multiple
              value={categoriesName}
              onChange={handleCategoriesChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              required
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={categoriesName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </ProductItem>
          <ProductItem>
            <Productlabel>Size</Productlabel>
            <Select
              labelId="sizeSelect"
              id="sizeSelect"
              multiple
              value={size}
              onChange={handleSizeChange}
              input={<OutlinedInput label="Size" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              required
            >
              {sizes.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={size.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </ProductItem>
          <ProductItem>
            <Productlabel>Stock</Productlabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={inStock}
              onChange={handleStockChange}
              label="InStock"
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </Select>
            {/* <ProductSelect name="stock" id="Stock">
                        <ProductOption value="true">Yes</ProductOption>
                        <ProductOption value="false">No</ProductOption>
                    </ProductSelect> */}
          </ProductItem>
          <ProductItem>
            <Error error={errorMessage!==""}>{errorMessage}</Error>
          </ProductItem>
          <ThemeButton onClick={(e)=>handleUpdate(e)}>{isLoading ? <CircularProgress size="12px"/> :"Create"}</ThemeButton>
        </ProductForm>
      </FormContainer>
      <ImgContainer>
        <Img
          src={
            updateImgData !== null
              ? updateImgData
              : "https://i.imgur.com/HeIi0wU.png"
          }
          alt=""
        />
      </ImgContainer>
    </Container>
  );
};

export default NewProduct;
