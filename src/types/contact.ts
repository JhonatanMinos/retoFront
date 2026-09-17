export type Department = "Ventas" | "Desarrollo" | "Marketing" | "Soporte";

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: Department;
};
