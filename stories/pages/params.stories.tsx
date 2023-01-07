import Param from "../../pages/[...params]";
import React from "react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "DynamicPage",
  component: Param,
  parameters: {
    nextRouter: {
      path: "/[...params]",
      asPath: "/add/1/2",
      query: {
        params: ["add","1","2"]
      }
    },
  },
} as ComponentMeta<typeof Param>;

// const Provider = ({ children } ) => {
//   const { worker, rest } = window.msw;
//   worker.use(
//     rest.get("https://api/calculate/", (req, res, ctx) => {
//       return res(
//         ctx.json({
//           result: "ok",
//         })
//       );
//     })
//   );
//   return <>{children}</>;
// };

const Template: ComponentStory<typeof Param> = (args) => <Param/>;

export const Default = Template.bind({});

// Default.args = {
//   operation: {
//     options: ['add', 'subtract', 'multiply', 'divide'],
//   }
// }




export const InteractiveTest = Template.bind({});
  InteractiveTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const form = canvasElement.querySelector("#calculator-form") as HTMLElement;
  // await userEvent.type(form.querySelector("#first") as HTMLInputElement, "1");
  // await userEvent.type(form.querySelector("#second") as HTMLInputElement, "2");
   await userEvent.selectOptions(form.querySelector("#operation") as HTMLSelectElement, ["add"]);

 await waitFor(async() => {
    await userEvent.click(canvas.getByRole("button"));
    const result = document.querySelector("#result") as HTMLElement | null
    console.log("RESULT", result?.innerText)

   await expect(result?.innerText).toBe("3");
 })
    //  expect(canvas.getByRole('alert')).toBeInTheDocument()});
    // expect(canvas.getByText('first cannot be empty')).toBeInTheDocument()
 };
