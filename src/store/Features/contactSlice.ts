import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  id: number | null;
  firstName: string;
  lastName: string;
  status: boolean;
}

interface ContactState {
  contact: Contact[];
}

const initialState: ContactState = {
  contact: [],
};

const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        status: boolean;
      }>
    ) => {
      state.contact.push({
        id: Date.now(),
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        status: action.payload.status,
      });
    },
    editContact: (
      state,
      action: PayloadAction<{
        id: number;
        firstName: string;
        lastName: string;
        status: boolean;
      }>
    ) => {
      const { id, firstName, lastName, status } = action.payload;
      const contact = state.contact.find((contact) => contact.id === id);
      if (contact) {
        if (firstName !== undefined) contact.firstName = firstName;
        if (lastName !== undefined) contact.lastName = lastName;
        if (status !== undefined) contact.status = status;
      }
    },
    deleteContact: (state, actions: PayloadAction<number>) => {
      state.contact = state.contact.filter(
        (contact) => contact.id !== actions.payload
      );
    },
  },
});

export const { addContact, deleteContact, editContact } = ContactSlice.actions;

export default ContactSlice.reducer;
