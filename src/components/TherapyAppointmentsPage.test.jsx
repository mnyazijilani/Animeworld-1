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
  }),
  { virtual: true },
);

import TherapyAppointmentsPage from "./TherapyAppointmentsPage";

describe("TherapyAppointmentsPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-07-01T12:00:00Z"));
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("lets the user open the calendar page and book a therapist slot", () => {
    render(<TherapyAppointmentsPage />);

    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: "Amina" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /select saturday, july 11, 2026/i }),
    );
    expect(screen.getByText(/therapist unavailable/i)).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /select monday, july 6, 2026/i }),
    );
    expect(screen.getByText(/^Therapist is free$/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /9:00 am/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /confirm appointment/i }),
    );

    expect(
      screen.getByText(
        /therapy session booked for Amina on Monday, July 6 at 9:00 AM/i,
      ),
    ).toBeInTheDocument();
  });
});
