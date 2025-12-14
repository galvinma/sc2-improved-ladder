import { create } from "zustand";

interface State {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
}

export const Store = create<State>(() => ({
  email: "",
  token: "",
  firstName: "",
  lastName: "",
}));
