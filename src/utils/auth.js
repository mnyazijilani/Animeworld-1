const STORAGE_KEY = "mindwell-users";
const SESSION_KEY = "mindwell-session";

function readUsers() {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function createUserAccount({ name, email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const users = readUsers();

  if (users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    const error = new Error("An account with that email already exists.");
    error.code = "EMAIL_EXISTS";
    throw error;
  }

  const user = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(name || "").trim(),
    email: normalizedEmail,
    password: String(password || "").trim(),
  };

  users.push(user);
  writeUsers(users);
  return user;
}

function authenticateUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const users = readUsers();
  const user = users.find(
    (candidate) =>
      normalizeEmail(candidate.email) === normalizedEmail &&
      String(candidate.password || "") === String(password || ""),
  );

  if (!user) {
    const error = new Error("Invalid email or password.");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const session = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    email: user.email,
    name: user.name,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return { user, session };
}

function getCurrentSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function logoutUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}

export { createUserAccount, authenticateUser, getCurrentSession, logoutUser };
