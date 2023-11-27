import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from "../Pages/Home"; 

describe("Home Component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });

  it('should add a question when "Add Poll" button is clicked', async () => {
    const { getByText, getAllByText } = render(<Home />);
    fireEvent.click(getByText("Add Poll"));

    await waitFor(() => {
      const addedQuestions = getAllByText(/Question/i);
      expect(addedQuestions.length).toBeGreaterThan(1);
    });
  });

  it('should generate a poll when "Generate Poll" button is clicked', async () => {
    const { getByText, getAllByPlaceholderText } = render(<Home />);
    fireEvent.click(getByText("Generate Poll"));

    const questionInputs = getAllByPlaceholderText(/Ask a Question/i);
    questionInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: `Question ${index + 1}` } });
    });

    const optionInputs = getAllByPlaceholderText(/Option/i);
    optionInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: `Option ${index + 1}` } });
    });

    fireEvent.click(getByText("Generate Poll"));
  });
});
