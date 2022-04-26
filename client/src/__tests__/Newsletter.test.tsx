import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Newsletter from "../components/newsletter/Newsletter";
import { BrowserRouter as Router } from "react-router-dom";

beforeEach(() =>
  render(
    <Router>
      <Newsletter />
    </Router>
  )
);
describe("Render components", () => {
  test("Render", () => {
    // Title
    const title = screen.getByRole("title");
    expect(title).toBeInTheDocument();

    // Placeholder
    const placeholder = screen.getByPlaceholderText("Your email");
    expect(placeholder).toBeInTheDocument();
  });

  test("Click send button should open dialog", async () => {
    // First we should not see any dialog
    expect(screen.queryByRole("popup")).not.toBeInTheDocument();
    const button = screen.getByRole("popupButton");
    fireEvent.click(button);
    // After click the button we can see dialog popup
    expect(screen.queryByRole("popup")).toBeInTheDocument();

    // Confirm rendering inside popup
    expect(screen.queryByRole("logoTitle")).toBeInTheDocument();

    // Close popup
    const closeButton = screen.getByTestId("close");

    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(screen.queryByRole("popup")).not.toBeInTheDocument()
    );
  });
});
