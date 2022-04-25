import { render, screen } from "@testing-library/react";
import Announcement from "../components/announcement/Announcement";

describe("Render components", () => {
  test("Render", () => {
    render(<Announcement />);

    // Title
    const announcement = screen.getByRole("announcement");
    expect(announcement).toBeInTheDocument();
  });
});
