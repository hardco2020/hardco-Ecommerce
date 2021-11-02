import { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../../axiosURL";
import { Filters, Product, ProductListResponse } from "../../type/type";
import ProductItem from "../productItem/ProductItem";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
interface ProductsInterface {
  cat?: string;
  filters?: Filters;
  sort?: string;
}

const Products = ({ cat, filters, sort }: ProductsInterface) => {
  const [products, setProducts] = useState<Product[]>();
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get<ProductListResponse>(
          cat ? `/products?category=${cat}` : `/products`
        );
        console.log(res.data.data);
        setProducts(res.data.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

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
    <Container>
      {cat
        ? filterProducts.map((item: Product) => (
            <ProductItem item={item} key={item._id} />
          ))
        : products &&
          products.map((item: Product) => (
            <ProductItem item={item} key={item._id} />
          ))}
      {/* : products && products.slice(0,8).map((item: Product) => (
            <ProductItem item={item} key={item._id} />
          ))} */}
    </Container>
  );
};

export default Products;
