import { useState, useMemo } from "react";
import type { Contact, Department } from "@/types/contact";

type Filters = {
  search: string;
  department: Department | null;
};

export function useContactFilters(contacts: Contact[]) {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    department: null,
  });

  console.log(filters);

  const filtered = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return contacts.filter((contact) => {
      const matchesSearch =
        search === "" || contact.name.toLowerCase().includes(search);

      const matchesDepartment =
        filters.department === null ||
        contact.department === filters.department;

      return matchesSearch && matchesDepartment;
    });
  }, [contacts, filters]);

  const setSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const setDepartment = (value: Department | null) => {
    setFilters((prev) => ({ ...prev, department: value }));
  };

  return {
    filtered,
    resultCount: filtered.length,
    hasActiveFilters:
      filters.search.trim() !== "" || filters.department !== null,
    search: filters.search,
    department: filters.department,
    setSearch,
    setDepartment,
  };
}
