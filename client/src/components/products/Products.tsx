import { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../../axiosURL";
import {
  Filters,
  ProductInterface,
  ProductListResponse,
} from "../../type/type";
import ProductItem from "../productItem/ProductItem";
import Skeletion from "../skeleton/Skeletion";
import Error from "../error/Error";

interface PageButtonProp {
  selected: boolean;
}
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;
const LastButton = styled.button`
  border: none;
  cursor: pointer;
`;
const PageButton = styled.button<PageButtonProp>`
  margin: 0px 10px;
  background-color: ${(props) => (props.selected ? "#C4E1FF" : "white")};
  border: none;
  cursor: pointer;
`;
const NextButton = styled.button`
  border: none;
  cursor: pointer;
`;

interface ProductsInterface {
  cat?: string;
  filters?: Filters;
  sort?: string;
}

const Products = ({ cat, filters, sort }: ProductsInterface) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductInterface[]>();
  const [filterProducts, setFilterProducts] = useState<ProductInterface[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get<ProductListResponse>(
          cat
            ? `/products?category=${cat}&page=${page}`
            : `/products?page=${page}`
        );
        console.log(res.data);
        setTotalPage(res.data.totalPage);
        setProducts(res.data.data); //將previous的加進去
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    };
    getProducts();
  }, [cat, page]);

  useEffect(() => {
    cat &&
      filters &&
      products &&
      setFilterProducts(
        products.filter((item: any) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cat, filters, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilterProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <>
      <Container>
        {isError ? (
          <Error />
        ) : isLoading ? (
          Array.from({ length: 8 }, (item, index) => <Skeletion key={index} />)
        ) : cat ? (
          filterProducts.map((item: ProductInterface) => (
            <ProductItem item={item} key={item._id} />
          ))
        ) : (
          products &&
          products.map((item: ProductInterface) => (
            <ProductItem item={item} key={item._id} />
          ))
        )}
      </Container>
      <PageContainer>
        <LastButton onClick={() => setPage(page - 1)} disabled={page === 0}>
          上一頁
        </LastButton>
        {Array.from({ length: totalPage }, (item, index) => (
          <PageButton
            selected={index === page}
            key={index}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </PageButton>
        ))}
        <NextButton
          onClick={() => setPage(page + 1)}
          disabled={page === totalPage}
        >
          下一頁
        </NextButton>
      </PageContainer>
    </>
  );
};

export default Products;
