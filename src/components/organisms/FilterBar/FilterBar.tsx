import { SearchBar } from "@/components/molecules/SearchBar";
import { DepartmentFilter } from "@/components/molecules/DepartmentFilter";
import type { Department } from "@/types/contact";

type FilterBarProps = {
  search: string;
  department: Department | null;
  resultCount: number;
  totalCount: number;
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: Department | null) => void;
};

export function FilterBar({
  search,
  department,
  resultCount,
  totalCount,
  onSearchChange,
  onDepartmentChange,
}: FilterBarProps) {
  const isFiltering = search.trim() !== "" || department !== null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={onSearchChange} />

        {/* Contador de resultados — solo visible cuando hay filtros activos */}
        {isFiltering && (
          <p
            className="shrink-0 text-sm text-muted-foreground"
            aria-live="polite"
          >
            {resultCount === 0
              ? "Sin resultados"
              : `${resultCount} de ${totalCount} contacto${totalCount !== 1 ? "s" : ""}`}
          </p>
        )}
      </div>

      <DepartmentFilter value={department} onChange={onDepartmentChange} />
    </div>
  );
}
