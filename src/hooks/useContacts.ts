import { useState, useEffect, useCallback } from "react";
import type { Contact } from "@/types/contact";
import type { ContactFormValues } from "@/schemas/contactSchema";
import seedData from "@/data/data.json";

type ContactsState = {
  contacts: Contact[];
  isLoading: boolean;
};

export function useContacts() {
  const [state, setState] = useState<ContactsState>({
    contacts: [],
    isLoading: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({
        contacts: seedData as Contact[],
        isLoading: false,
      });
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const addContact = useCallback((values: ContactFormValues) => {
    const newContact: Contact = {
      id: crypto.randomUUID(),
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone?.trim() || undefined,
      department: values.department as Contact["department"],
    };

    setState((prev) => ({
      ...prev,
      contacts: [newContact, ...prev.contacts],
    }));
  }, []);

  const deleteContact = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((c) => c.id !== id),
    }));
  }, []);

  return {
    contacts: state.contacts,
    isLoading: state.isLoading,
    addContact,
    deleteContact,
  };
}
