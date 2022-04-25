import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Navbar from "../components/navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { setCredentials } from "../redux/authRedux";
import { addProduct } from "../redux/cartRedux";
// import reducer, { setCredentials } from "../redux/authRedux";

const server = setupServer(
  rest.get("http://localhost:3001/products/search/sw", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            categories: [
              "Beanies",
              "Polo Shirts",
              "Vests",
              "Hoodies",
              "T-shirt",
            ],
            size: ["XS", "XS", "XL"],
            color: ["Crimson", "Turquoise", "Khaki", "Blue", "Mauv"],
            inStock: true,
            _id: "61a71f3bfc13ae39c7000039",
            title: "Sauce - Apple, Unsweetened",
            desc: "Diseases of the skin, subcu comp pregnancy, unsp trimester",
            img: "http://dummyimage.com/400x400.png/cc0000/ffffff",
            price: 805,
          },
        ],
        message: "search",
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

beforeEach(() => {
  render(
    <Router>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </Router>
  );
});

describe("Search", () => {
  test("Search placeholdertext should be rendered", () => {
    //   const mockStore = configureStore();
    //   let store;
    //   store = mockStore();
    const searchBarText = screen.getByPlaceholderText(/search/i);
    expect(searchBarText).toBeInTheDocument();
  });

  test("Click on search should show popover", async () => {
    // Find search and click on input
    // Should show
    const searchInput = screen.getByTestId("searchInput");
    const searchResultContainer = screen.getByTestId("searchResultContainer");
    expect(searchResultContainer).not.toBeVisible();
    searchInput.focus();
    expect(searchResultContainer).toBeVisible();
    searchInput.blur();
    await waitFor(() => expect(searchResultContainer).not.toBeVisible());
  });

  test("Type keyword should trigger api and show search results", async () => {
    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, { target: { value: "sw" } });
    const searchResult = screen.getByTestId("searchResultContainer");
    await waitFor(() =>
      expect(searchResult).toHaveTextContent("Sauce - Apple, Unsweetened")
    );
  });
  test("Type empty keyword should show no result", async () => {
    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, { target: { value: "    " } });
    await waitFor(() =>
      expect(screen.queryByRole("searchResultItems")).toBeNull()
    );
  });
});

describe("Label", () => {
  let labelMan: any;
  let labelWoman: any;
  beforeEach(() => {
    labelMan = screen.getByTestId("labelMan");
    labelWoman = screen.getByTestId("labelWoman");
  });
  test("Should render label with Man and woman", () => {
    expect(labelMan).toBeVisible();
    expect(labelMan).toHaveTextContent("Man");
    expect(labelWoman).toBeVisible();
    expect(labelWoman).toHaveTextContent("Woman");
  });

  test("Click on label should show category popove", async () => {
    fireEvent.mouseOver(labelMan);
    //await waitFor(() => screen.getByTestId("popoverMan"));
    expect(screen.getByTestId("popoverMan")).toBeInTheDocument();

    fireEvent.mouseOut(labelMan);
    await waitFor(() =>
      expect(screen.queryByTestId("popoverMan")).not.toBeInTheDocument()
    );

    fireEvent.mouseOver(labelWoman);
    expect(screen.getByTestId("popoverWoman")).toBeInTheDocument();
    fireEvent.mouseOut(labelWoman);
    await waitFor(() =>
      expect(screen.queryByTestId("popoverWoman")).not.toBeInTheDocument()
    );
  });
});

describe("Cart", () => {
  let cart: any;
  beforeEach(() => {
    cart = screen.getByTestId("cart");
    store.dispatch(
      addProduct({
        product: {
          _id: "123",
          title: "testProduct",
          desc: "this is a good product",
          img: "testURL",
          createdAt: "",
          updatedAt: "",
          price: 100,
          size: "XL",
          color: "red",
        },
        quantity: 1,
      })
    );
  });
  test("Cart item Should be rendered", () => {
    fireEvent.click(cart);
    expect(screen.getByRole("popoverCart")).toBeInTheDocument();

    const cartProductContainer = screen.getByRole("CartProductContainer");

    expect(cartProductContainer).toHaveTextContent("testProduct");
  });

  test("When click on delete product, car items should be removed", async () => {
    fireEvent.click(cart);

    // await waitFor(() =>
    //   expect(screen.getByTestId("deletetestProduct")).toBeInTheDocument()
    // );

    const deleteButton = screen.getByTestId("deletetestProduct");

    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() =>
      expect(screen.getByRole("CartProductContainer")).not.toHaveTextContent(
        "testProduct"
      )
    );
  });

  test("When click on cart, should show cart popover, click again should close cart popover", async () => {
    // const popoverCart = screen.getByTestId("popoverCart");
    // expect(popoverCart).not.toBeInTheDocument();
    fireEvent.click(cart);
    expect(screen.getByRole("popoverCart")).toBeInTheDocument();

    //Click again to close cart
    fireEvent.click(cart);
    await waitFor(() => expect(screen.queryByRole("popoverCart")).toBeNull());
  });
});

describe("logout", () => {
  test("Logout label should be rendered", () => {});
  test("When click on logout,it will trigger handle logout", async () => {
    //TODO: should let the user state to not be empty first
    store.dispatch(
      setCredentials({
        user: {
          username: "Kai",
          _id: "efekfjefke",
          email: "school021195@gmail.com",
          createdAt: new Date(2013, 13, 1),
          updatedAt: new Date(2013, 13, 1),
          img: "223232",
        },
        token: "test12345",
      })
    );
    //TODO: then we can track if logout label exist
    await waitFor(() =>
      expect(screen.queryByRole("userTitle")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByTestId("logout")).toBeInTheDocument()
    );
    //TODO: click on logout button and mock localstorage maybe ?
    const userLogout = screen.getByTestId("logout");
    fireEvent.click(userLogout);
    // should not be able to query the userTitle since it's logout
    await waitFor(() =>
      expect(screen.queryByRole("userTitle")).not.toBeInTheDocument()
    );
  });
});
