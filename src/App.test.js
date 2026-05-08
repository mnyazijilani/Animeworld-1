import { render, screen } from "@testing-library/react";
import React from "react";
import axios from "axios";

jest.mock(
  "react-router-dom",
  () => ({
    HashRouter: ({ children }) => <>{children}</>,
    Routes: ({ children }) => <>{children}</>,
    Route: ({ element }) => element,
    Link: ({ children, to, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
    useLocation: () => ({ pathname: "/" }),
    useNavigate: () => jest.fn(),
    useSearchParams: () => [new URLSearchParams(), jest.fn()],
    useParams: () => ({ category: "test" }),
  }),
  { virtual: true },
);

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

import App from "./App";

test("renders app heading", async () => {
  axios.get.mockResolvedValue({ data: [] });
  render(<App />);
  const linkElement = await screen.findByText(/welcome to animeworld/i);
  expect(linkElement).toBeInTheDocument();
});
