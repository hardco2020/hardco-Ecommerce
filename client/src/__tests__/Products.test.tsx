import { render, screen } from "@testing-library/react";
import Products from "../components/products/Products";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { setCredentials } from "../redux/authRedux";

// beforeEach(() => {
//   render(
//     <Router>
//       <Provider store={store}>
//         <Products />
//       </Provider>
//     </Router>
//   );
// });

test("hello", () => {});
