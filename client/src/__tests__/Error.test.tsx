import { render, screen } from "@testing-library/react";
import Error from "../components/error/Error";

beforeEach(() => {
  render(<Error />);
});
describe("Render Components", () => {
  test("Container should be rendered", () => {
    expect(screen.queryByRole("container")).toBeInTheDocument();
  });
});
