import { create } from "zustand";

type State = {
  email: string;
  firstName: string;
  lastName: string;
  searching: boolean;
};

type Action = {
  updateEmail: (email: State["email"]) => void;
  updateFirstName: (firstName: State["firstName"]) => void;
  updateLastName: (lastName: State["lastName"]) => void;
  updateSearching: (searching: State["searching"]) => void;
};

export const Store = create<State & Action>((set) => ({
  // State
  email: "",
  firstName: "",
  lastName: "",
  searching: false,

  // Action
  updateEmail: (email) => set(() => ({ email: email })),
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
  updateSearching: (searching) => set(() => ({ searching: searching })),
}));
