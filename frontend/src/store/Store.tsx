import { create } from "zustand";

interface State {
  email: string;
  firstName: string;
  lastName: string;
}

export const Store = create<State>(() => ({
  email: "",
  firstName: "",
  lastName: "",
}));
