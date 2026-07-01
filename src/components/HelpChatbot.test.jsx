import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ children, to, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
    useLocation: () => ({ pathname: "/" }),
  }),
  { virtual: true },
);

import HelpChatbot from "./HelpChatbot";

describe("HelpChatbot", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("answers wellness questions and updates mini trackers", () => {
    render(<HelpChatbot />);

    fireEvent.click(screen.getByRole("button", { name: /wellness help/i }));

    fireEvent.click(screen.getByRole("button", { name: /\+1 glass/i }));
    expect(
      screen.getByText(
        (_, element) => element?.textContent === "1 / 8 glasses",
      ),
    ).toBeInTheDocument();

    fireEvent.change(
      screen.getByPlaceholderText(/ask a wellness or support question/i),
      {
        target: { value: "Give me a wellness tip" },
      },
    );
    fireEvent.click(
      screen.getByRole("button", { name: /send help question/i }),
    );

    expect(
      screen.getByText(/one strong wellness habit is to build tiny anchors/i),
    ).toBeInTheDocument();
  });
});
