import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ children, to, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  }),
  { virtual: true },
);

import Getproduct from "./Getproduct";

describe("Getproduct therapy booking", () => {
  it("links to the dedicated appointments page", () => {
    render(<Getproduct />);

    expect(
      screen.getByRole("link", { name: /book therapy appointment/i }),
    ).toHaveAttribute("href", "/appointments");
    expect(
      screen.getByRole("link", { name: /open appointments/i }),
    ).toHaveAttribute("href", "/appointments");
  });
});
