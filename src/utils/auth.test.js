import {
  authenticateUser,
  createUserAccount,
  getCurrentSession,
  logoutUser,
} from "./auth";

describe("local auth fallback", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("creates a local account and signs the user in", () => {
    const createdUser = createUserAccount({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "secret123",
    });

    expect(createdUser.email).toBe("jane@example.com");

    const session = authenticateUser({
      email: "jane@example.com",
      password: "secret123",
    });

    expect(session.user.email).toBe("jane@example.com");
    expect(session.session.email).toBe("jane@example.com");
  });

  it("clears the active session on logout", () => {
    createUserAccount({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "secret123",
    });

    authenticateUser({
      email: "jane@example.com",
      password: "secret123",
    });

    expect(getCurrentSession()).not.toBeNull();

    logoutUser();

    expect(getCurrentSession()).toBeNull();
  });
});
