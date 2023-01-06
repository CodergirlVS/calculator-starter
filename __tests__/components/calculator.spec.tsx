import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Calculator from "../../components/Calculator";

//sets up userEvent to reuse it through the test
//const user = userEvent.setup()

describe("Calculator component testing", () => {
  const component = render(<Calculator />);
  it("has all the fields", () => {
    expect(document.getElementById("first")).toBeInTheDocument();
    expect(document.getElementById("second")).toBeInTheDocument();
    expect(document.getElementById("operation")).toBeInTheDocument();
    expect(document.querySelector("button[type=submit]")).toBeInTheDocument();
  });
});

// Feature#2 Prevent Double Form Submission TESTs

describe.only("Disable Submit Button", () => {
  beforeEach(() => {
    render(<Calculator />);
  });
  afterEach(cleanup);

  it("Should disable calculate button on click", async () => {

    const inputFieldFirst: HTMLInputElement =
      screen.getByLabelText(/First Number/i);
    await userEvent.type(inputFieldFirst, "2");

    const inputFieldSecond: HTMLInputElement =
      screen.getByLabelText(/Second Number/i);
    await userEvent.type(inputFieldSecond, "3");

    const operations: HTMLElement | null = document.getElementById("operation");

    if (operations) {
      fireEvent.change(operations, {
        target: { value: "add" },
      });
    }
    const form: HTMLElement | null = document.getElementById("calculator-form");
    const submitButton: HTMLElement | null = document.querySelector("button[type=submit]");
    if (form) {
      await fireEvent.submit(form);
    }
    expect(submitButton).toBeDisabled();
  });
});

it.only("Should give us the result after submit", async () => {
const timer =  jest.useRealTimers();
  const inputFieldFirst: HTMLInputElement =
    screen.getByLabelText(/First Number/i);
  await userEvent.type(inputFieldFirst, "2");

  const inputFieldSecond: HTMLInputElement =
    screen.getByLabelText(/Second Number/i);
  await userEvent.type(inputFieldSecond, "3");

  const operations: HTMLElement | null = document.getElementById("operation");

  if (operations) {
    fireEvent.change(operations, {
      target: { value: "add" },
    });
  }
 const submitButton: HTMLElement | null = document.querySelector("button[type=submit]");
 if (submitButton) {
  await fireEvent.click(submitButton);
}
//await waitFor(async () => await expect(submitButton).toBeDisabled())
//jest.useFakeTimers();
//   expect(document.getElementById("result")).toHaveTextContent("5")

});


//expect(submitButton).toHaveAttribute('disabled')
// await userEvent.click(document.querySelector("button[type=submit]"))
// expect(document.getElementById("result")).toHaveTextContent("3")
