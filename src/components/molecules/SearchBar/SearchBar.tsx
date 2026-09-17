import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

/** Input de búsqueda controlado — el estado y el debounce (si se agrega) viven en useContactFilters, no acá. */
export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar por nombre...",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="pl-8"
        aria-label="Buscar contactos por nombre"
      />
    </div>
  );
}
