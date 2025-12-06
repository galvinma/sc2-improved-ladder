import { create } from "zustand";

interface State {
  // Auth
  userId: string;
  token: string;
}

export const Store = create<State>(() => ({
  // Auth
  token: "",
  // User
  userId: "",
}));
