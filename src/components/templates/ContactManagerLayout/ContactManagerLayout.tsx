import type { ReactNode } from "react";

type ContactManagerLayoutProps = {
  /** Botón "Agregar contacto" y cualquier acción de cabecera */
  headerAction: ReactNode;
  /** FilterBar */
  filters: ReactNode;
  /** ContactList */
  list: ReactNode;
};

/**
 * Template = estructura visual sin lógica de negocio.
 * Define el layout de la página (header / filtros / lista) usando slots (props ReactNode).
 * Si el diseño cambia (sidebar, grid de cards en vez de lista), solo toca este archivo.
 *
 * No importa ningún hook, no conoce Contact, no sabe de filtros —
 * solo sabe cómo distribuir los tres bloques en la pantalla.
 */
export function ContactManagerLayout({
  headerAction,
  filters,
  list,
}: ContactManagerLayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contactos</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona tu lista de contactos.
          </p>
        </div>
        {headerAction}
      </div>

      {/* Filtros */}
      <section aria-label="Filtros de contactos">{filters}</section>

      {/* Lista */}
      <section aria-label="Lista de contactos">{list}</section>
    </div>
  );
}
