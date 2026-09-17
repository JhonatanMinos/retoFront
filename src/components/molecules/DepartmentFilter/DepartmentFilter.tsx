import type { Department } from "@/types/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEPARTMENTS: Department[] = [
  "Ventas",
  "Desarrollo",
  "Marketing",
  "Soporte",
];

type DepartmentFilterProps = {
  value: Department | null;
  onChange: (value: Department | null) => void;
};

export function DepartmentFilter({ value, onChange }: DepartmentFilterProps) {
  const handleClick = (department: Department) => {
    onChange(value === department ? null : department);
  };

  return (
    <div
      className="flex-wrap justify-start gap-2"
      role="group"
      aria-label="Filtrar por departamento"
    >
      {DEPARTMENTS.map((department) => {
        const isActive = value === department;
        return (
          <Button
            key={department}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => handleClick(department)}
            aria-pressed={isActive}
            className={cn("transition-colors", isActive && "font-semibold")}
          >
            {department}
          </Button>
        );
      })}
    </div>
  );
}
