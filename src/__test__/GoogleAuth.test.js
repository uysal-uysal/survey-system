import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import GoogleAuth from "../Pages/Auth";

describe("GoogleAuth Component", () => {
  it("should render without crashing", () => {
    const { container } = render(<GoogleAuth />);
    expect(container).toBeInTheDocument();
  });

  it("should call handleLogin when button is clicked", async () => {
    const mockHandleLogin = jest.fn();

    const { getByText } = render(<GoogleAuth />);
    fireEvent.click(getByText("Log in with Google"));

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalled();
    });
  });

  it("should redirect if user is authenticated", async () => {
    const mockHistoryPush = jest.fn();

    const { rerender } = render(
      <GoogleAuth history={{ push: mockHistoryPush }} />
    );
    rerender(<GoogleAuth history={{ push: mockHistoryPush }} />);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/");
    });
  });
});
