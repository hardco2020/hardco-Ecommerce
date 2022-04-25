import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Categories from "../components/categories/Categories";
import { createMemoryHistory } from "history";

beforeEach(() => {
  render(
    <Router>
      <Categories />
    </Router>
  );
});
describe("Button", () => {
  test("Button should be rendered and contain specific message", () => {
    const categories = screen.getByRole("CategoriesContainer");
    expect(categories).toHaveTextContent("SHOP NOW");
  });
});
