import { render, screen } from "@testing-library/react";
import Newsletter from "../components/newsletter/Newsletter";

beforeEach(() => render(<Newsletter />));
describe("Render components", () => {
  test("Render", () => {
    // Title
    const title = screen.getByRole("title");
    expect(title).toBeInTheDocument();

    // Placeholder
    const placeholder = screen.getByPlaceholderText("Your email");
    expect(placeholder).toBeInTheDocument();
  });

  test("Click send button should open dialog", () => {});
});
