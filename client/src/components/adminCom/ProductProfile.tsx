import { Publish } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ProductData } from "../../dummyData";
import Chart from "./Chart";
import app from "../../firebase";
import {
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
} from "../../redux/api";
import { ProductUpdateRequestInterface } from "../../type/type";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { CircularProgress } from "@material-ui/core";

const ProductContainer = styled.div`
  flex: 4;
  padding: 20px;
`;
const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProductTitle = styled.h1``;
const ProductAddButton = styled.button`
  border: none;
  width: 80px;
  padding: 5px;
  border-radius: 5px;
  background-color: teal;
  cursor: pointer;
  color: white;
  font-size: 16px;
`;
const ProductTop = styled.div`
  display: flex;
`;
const ProductTopLeft = styled.div`
  flex: 1;
`;
const ProductTopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;
`;

const ProductInfoBottom = styled.div`
  margin-top: 10px;
`;

const ProductInfoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductName = styled.span`
  font-weight: 600;
`;

const ProductInfoItem = styled.div`
  width: 150px;
  display: flex;
  padding: 10px;
`;
const ProductInfoKey = styled.span`
  margin-right: 10px;
`;
const ProductInfoValue = styled.span`
  font-weight: 300;
`;
const ProductBottom = styled.div`
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`;
const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductFormLeftLabel = styled.label`
  margin-bottom: 10px;
  color: gray;
`;
const ProductFormLeftInput = styled.input`
  margin-bottom: 10px;
  border: none;
  padding: 5px;
  border-bottom: 1px solid gray;
`;
const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductFormSelect = styled.select`
  margin-bottom: 10px;
`;

const ProductFormOption = styled.option``;

const ProductUpload = styled.div`
  display: flex;
  align-items: center;
`;

const ProductUploadImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductUploadLabel = styled.label``;

const ProductUpdateButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
type ErrorProp = {
  error: boolean;
  display: boolean;
};
const ErrorMes = styled.div<ErrorProp>`
  display: ${(props) => (props.display === true ? "flex" : "none")};
  color: ${(props) => (props.error === true ? "red" : "green")};
`;

const ProductProfile = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const TitleRef = useRef<HTMLInputElement>(null);
  const DescRef = useRef<HTMLInputElement>(null);
  const PriceRef = useRef<HTMLInputElement>(null);
  const InStockRef = useRef<HTMLSelectElement>(null);
  const [formError, setFormError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [updatePic, setUpdatePic] = useState<File | null>(null);
  const [updateImgData, setUpdateImgData] = useState<string | null>(null);

  const { data, isError, isLoading } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });
  const [update] = useUpdateProductByIdMutation();
  const [updateLoading,setUpdateLoading] = useState<boolean>(false);
  const handleUpdate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    //upload the pic to firestore first
    try {
      if (
        TitleRef.current?.value !== "" &&
        DescRef.current?.value !== "" &&
        PriceRef.current?.value !== "" &&
        InStockRef.current?.value !== "" &&
        PriceRef.current?.value !== undefined &&
        InStockRef.current?.value !== undefined
      ) {
        //if all that passed then update the img
        setUpdateLoading(true);
        let updateProduct: ProductUpdateRequestInterface;
        if (updatePic !== null) {
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
                if (
                  PriceRef.current?.value !== undefined &&
                  InStockRef.current?.value !== undefined
                ) {
                  let InStock = InStockRef.current.value === "true";
                  updateProduct = {
                    productId,
                    productData: {
                      desc: DescRef.current?.value,
                      title: TitleRef.current?.value,
                      price: parseInt(PriceRef.current?.value),
                      inStock: InStock,
                      img: downloadURL,
                    },
                  };
                  await update(updateProduct);
                }
              });
            }
          );
        } else {
          let InStock = InStockRef.current.value === "true";
          updateProduct = {
            productId,
            productData: {
              desc: DescRef.current?.value,
              title: TitleRef.current?.value,
              price: parseInt(PriceRef.current?.value),
              inStock: InStock,
            },
          };
          await update(updateProduct)
        }
        // let InStock = InStockRef.current.value === "true";
        // const updateProduct: ProductUpdateRequestInterface = {
        //   productId,
        //   productData: {
        //     desc: DescRef.current?.value,
        //     title: TitleRef.current?.value,
        //     price: parseInt(PriceRef.current?.value),
        //     inStock: InStock,
        //   },
        // };
        setFormSuccess(true);
        setFormError(false);
        setMessage("Successfully updated");
        setUpdateLoading(false);
        // window.location.reload();
      } else {
        setFormError(true);
        setMessage("Not Completed");
      }
    } catch (err) {
      setFormError(true);
      setMessage("Something is wrong");
    }
  };

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
  return (
    <ProductContainer>
      <ProductTitleContainer>
        <ProductTitle>Product</ProductTitle>
        <Link to="/admin/createproduct">
          <ProductAddButton>Create</ProductAddButton>
        </Link>
      </ProductTitleContainer>
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        data && (
          <>
            <ProductTop>
              <ProductTopLeft>
                <Chart
                  data={ProductData}
                  dataKey="Sales"
                  title="Sales Performance"
                />
              </ProductTopLeft>

              <ProductTopRight>
                <ProductInfoTop>
                  <ProductInfoImg src={data.img} />
                  <ProductName>{data.title}</ProductName>
                </ProductInfoTop>
                <ProductInfoBottom>
                  <ProductInfoItem>
                    <ProductInfoKey>Id:</ProductInfoKey>
                    <ProductInfoValue>{data._id}</ProductInfoValue>
                  </ProductInfoItem>
                  <ProductInfoItem>
                    <ProductInfoKey>Sales:</ProductInfoKey>
                    <ProductInfoValue>5123</ProductInfoValue>
                  </ProductInfoItem>

                  <ProductInfoItem>
                    <ProductInfoKey>In Stock</ProductInfoKey>
                    <ProductInfoValue>
                      {data.inStock ? "Yes" : "No"}
                    </ProductInfoValue>
                  </ProductInfoItem>
                </ProductInfoBottom>
              </ProductTopRight>
            </ProductTop>
            <ProductBottom>
              <ProductForm>
                <ProductFormLeft>
                  <ProductFormLeftLabel>Product Name</ProductFormLeftLabel>
                  <ProductFormLeftInput
                    ref={TitleRef}
                    type="text"
                    placeholder={data.title}
                  />
                  <ProductFormLeftLabel>
                    Product Description
                  </ProductFormLeftLabel>
                  <ProductFormLeftInput
                    ref={DescRef}
                    type="text"
                    placeholder={data.desc}
                  />
                  <ProductFormLeftLabel>Product Price</ProductFormLeftLabel>
                  <ProductFormLeftInput
                    ref={PriceRef}
                    type="number"
                    placeholder={data.price.toString()}
                  />
                  <ProductFormLeftLabel>In Stock </ProductFormLeftLabel>
                  <ProductFormSelect
                    ref={InStockRef}
                    name="inStock"
                    id="idStock"
                  >
                    <ProductFormOption value="true">Yes</ProductFormOption>
                    <ProductFormOption value="false">No</ProductFormOption>
                  </ProductFormSelect>
                  <ErrorMes
                    display={formError || formSuccess}
                    error={formError}
                  >
                    {message}
                  </ErrorMes>
                </ProductFormLeft>
                <ProductFormRight>
                  <ProductUpload>
                    <ProductUploadImg
                      src={updateImgData !== null ? updateImgData : data.img}
                    />
                    <ProductUploadLabel htmlFor="file">
                      <Publish />
                    </ProductUploadLabel>
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={(e) => UpdatePic(e)}
                    />
                  </ProductUpload>
                  <ProductUpdateButton onClick={(event) => handleUpdate(event)}>
                    {updateLoading? <CircularProgress size="12px"/> : "Update"}
                  </ProductUpdateButton>
                </ProductFormRight>
              </ProductForm>
            </ProductBottom>
          </>
        )
      )}
    </ProductContainer>
  );
};

export default ProductProfile;
