import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ShareBtn from "./ShareBtn";

describe("ShareBtn", () => {
  test("Find the Share button exist in the document", () => {
    // rendering button in jest
    render(<ShareBtn />);

    // saving button in const
    const button = screen.getByText(/Share/i)

    // checking button is present on the page
    expect(button).toBeInTheDocument();

    // clicking button
    fireEvent.click(button);

    // cheking that tolltip is present now on the page
    expect(screen.getByText(/Copy link/i)).toBeInTheDocument();

    // can print out button to console
    // screen.debug();

  });
})