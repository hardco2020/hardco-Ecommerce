import { render, screen } from "@testing-library/react";
import Footer from "../components/footer/Footer";

beforeEach(() => {
  render(<Footer />);
});
describe("Render Components", () => {
  test("List should be rendered", () => {
    expect(screen.getAllByText(/Contact/i)).not.toBeNull();
  });
});
