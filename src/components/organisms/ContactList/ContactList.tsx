import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContactCardSkeleton } from "@/components/molecules/ContactCardSkeleton";
import type { Contact } from "@/types/contact";

/** Cuántas filas skeleton mostrar mientras carga */
const SKELETON_COUNT = 5;

/** Colores semánticos por departamento — fácil de extender si se agregan más */
const DEPARTMENT_BADGE_VARIANT: Record<
  Contact["department"],
  "default" | "secondary" | "outline" | "destructive"
> = {
  Desarrollo: "default",
  Ventas: "secondary",
  Marketing: "outline",
  Soporte: "destructive",
};

// ─── EmptyState ────────────────────────────────────────────────────────────────

type EmptyStateProps = {
  reason: "no-contacts" | "no-results";
};

/**
 * Un solo componente parametrizado en vez de dos componentes distintos —
 * evita duplicar JSX por dos textos diferentes.
 */
function EmptyState({ reason }: EmptyStateProps) {
  const isNoContacts = reason === "no-contacts";

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center"
      role="status"
      aria-label={isNoContacts ? "Sin contactos" : "Sin resultados"}
    >
      <span className="text-4xl" aria-hidden="true">
        {isNoContacts ? "📋" : "🔍"}
      </span>
      <div>
        <p className="font-medium text-foreground">
          {isNoContacts ? "No hay contactos aún" : "Sin resultados"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {isNoContacts
            ? "Agrega tu primer contacto con el botón de arriba."
            : "Intenta con otro nombre o cambia el filtro de departamento."}
        </p>
      </div>
    </div>
  );
}

// ─── ContactRow ────────────────────────────────────────────────────────────────

type ContactRowProps = {
  contact: Contact;
  onDelete: (id: string) => void;
};

function ContactRow({ contact, onDelete }: ContactRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/40">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{contact.name}</span>
          <Badge
            variant={DEPARTMENT_BADGE_VARIANT[contact.department]}
            className="shrink-0"
          >
            {contact.department}
          </Badge>
        </div>
        <span className="truncate text-sm text-muted-foreground">
          {contact.email}
        </span>
        {contact.phone && (
          <span className="text-sm text-muted-foreground">{contact.phone}</span>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        aria-label={`Eliminar contacto ${contact.name}`}
        onClick={() => onDelete(contact.id)}
        className="shrink-0 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

// ─── ContactList ───────────────────────────────────────────────────────────────

type ContactListProps = {
  contacts: Contact[];
  isLoading: boolean;
  hasActiveFilters: boolean;
  onDelete: (id: string) => void;
};

export function ContactList({
  contacts,
  isLoading,
  hasActiveFilters,
  onDelete,
}: ContactListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2" aria-busy="true" aria-label="Cargando contactos">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ContactCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <EmptyState reason={hasActiveFilters ? "no-results" : "no-contacts"} />
    );
  }

  return (
    <div className="flex flex-col gap-2" role="list" aria-label="Lista de contactos">
      {contacts.map((contact) => (
        <div key={contact.id} role="listitem">
          <ContactRow contact={contact} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
