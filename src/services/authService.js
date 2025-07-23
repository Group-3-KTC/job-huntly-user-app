import { users } from "@/mock/users";

export const login = async ({ email, password }) => {
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return new Promise((resolve) => setTimeout(() => resolve({ user }), 500));
};

export const register = async ({ email, password, name }) => {
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) throw new Error("Email already registered");

  const newUser = {
    id: Date.now(),
    email,
    password,
    name,
    role: "candidate",
  };
  users.push(newUser);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ user: newUser }), 500),
  );
};
