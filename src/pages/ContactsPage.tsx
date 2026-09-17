import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactManagerLayout } from "@/components/templates/ContactManagerLayout";
import { FilterBar } from "@/components/organisms/FilterBar";
import { ContactList } from "@/components/organisms/ContactList";
import { ContactForm } from "@/components/organisms/ContactForm";
import { useContacts } from "@/hooks/useContacts";
import { useContactFilters } from "@/hooks/useContactFilters";

export function ContactsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const { contacts, isLoading, addContact, deleteContact } = useContacts();

  const {
    filtered,
    resultCount,
    hasActiveFilters,
    search,
    department,
    setSearch,
    setDepartment,
  } = useContactFilters(contacts);

  return (
    <>
      <ContactManagerLayout
        headerAction={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Agregar contacto
          </Button>
        }
        filters={
          <FilterBar
            search={search}
            department={department}
            resultCount={resultCount}
            totalCount={contacts.length}
            onSearchChange={setSearch}
            onDepartmentChange={setDepartment}
          />
        }
        list={
          <ContactList
            contacts={filtered}
            isLoading={isLoading}
            hasActiveFilters={hasActiveFilters}
            onDelete={deleteContact}
          />
        }
      />

      <ContactForm
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={addContact}
      />
    </>
  );
}
