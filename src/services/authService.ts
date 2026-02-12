import { ref } from "vue";
import type { User } from "../types/User";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

const fakeDelay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

/* ============================= */
/* REACTIVE AUTH STATE */
/* ============================= */

const currentUser = ref<User | null>(
  JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null")
);

export const authService = {
  currentUser, // expose reactive state

  /* ============================= */
  /* REGISTER */
  /* ============================= */
  async register(user: User) {
    await fakeDelay(1000);

    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );

    const exists = users.find(u => u.email === user.email);
    if (exists) throw new Error("Email already registered");

    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  /* ============================= */
  /* LOGIN */
  /* ============================= */
  async login(email: string, password: string) {
    await fakeDelay(1000);

    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) throw new Error("Invalid credentials");

    currentUser.value = user; // reactive update
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },

  /* ============================= */
  /* LOGOUT */
  /* ============================= */
  logout() {
    currentUser.value = null; // reactive update
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  /* ============================= */
  /* GET CURRENT USER */
  /* ============================= */
  getCurrentUser(): User | null {
    return currentUser.value;
  },

  /* ============================= */
  /* UPDATE PROFILE */
  /* ============================= */
  async updateProfile(updatedUser: User) {
    await fakeDelay(1000);

    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );

    const index = users.findIndex(
      u => u.email === updatedUser.email
    );

    if (index === -1) throw new Error("User not found");

    users[index] = updatedUser;

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(updatedUser)
    );

    currentUser.value = updatedUser; // reactive update
  },

  /* ============================= */
  /* RESET PASSWORD */
  /* ============================= */
  async resetPassword(email: string, newPassword: string) {
    await fakeDelay(1000);

    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );

    const user = users.find(u => u.email === email);
    if (!user) throw new Error("Email not found");

    user.password = newPassword;

    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // If current user resets own password, update reactive state
    if (currentUser.value?.email === email) {
      currentUser.value.password = newPassword;
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(currentUser.value)
      );
    }
  }
};
