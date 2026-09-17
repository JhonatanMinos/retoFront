import { Skeleton } from "@/components/ui/skeleton";

/** Una fila placeholder. ContactList la repite N veces mientras useContacts está cargando. */
export function ContactCardSkeleton() {
  return (
    <div
      className="flex items-center justify-between gap-4 rounded-lg border p-4"
      aria-hidden="true"
    >
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-56" />
      </div>
      <Skeleton className="h-8 w-16 shrink-0 rounded-md" />
    </div>
  );
}
