import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calculator from "../components/Calculator";

describe("Calculator", () => {

beforeEach(() => {render(<Calculator />);})

  it("Render First Number field", () => {
    const input = screen.getByLabelText("First Number")
    expect(input).toBeInTheDocument();
  });

  it("Render Second Number field", () => {
    const inputEl = screen.getByLabelText("Second Number")
    expect(inputEl).toBeInTheDocument();
  });

  // it("Render all operation options", () => {
  //   const options = screen.getByTestId("operation");
  //   expect()
  // })

});
