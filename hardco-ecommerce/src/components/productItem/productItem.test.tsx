import { fireEvent, render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import ProductItem from "./ProductItem";

test("Check Product Hover", () => {
  const { getByTestId } = render(
    <ProductItem item={{ id: 7, img: "https://i.imgur.com/aYMvzlX.png" }} />
  );
  const productContainer = getByTestId("productContainer");
  const productInfo = getByTestId("productInfo");

  userEvent.click(productContainer)
  expect(productInfo).toHaveStyle("opacity:1");

});
