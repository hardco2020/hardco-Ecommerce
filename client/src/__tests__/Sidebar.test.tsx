import { render, screen } from "@testing-library/react";
import Sidebar from "../components/sidebar/Sidebar";

test("sidebar should be rendered", () => {
  render(<Sidebar />);
  const text = screen.getByText(/test/i);
  expect(text).toBeInTheDocument();
});
