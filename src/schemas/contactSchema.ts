import * as Yup from "yup";
import type { Department } from "@/types/contact";

const DEPARTMENTS: Department[] = [
  "Ventas",
  "Desarrollo",
  "Marketing",
  "Soporte",
];

export const contactSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .required("El nombre es obligatorio."),

  email: Yup.string()
    .trim()
    .email("Ingresa un correo electrónico válido.")
    .required("El correo es obligatorio."),

  phone: Yup.string()
    .trim()
    .matches(
      /^[\d\s\-().+]{7,20}$/,
      "Formato inválido (ej. 33 1234 5678 o +52 33 1234 5678).",
    )
    .optional(),

  department: Yup.string()
    .oneOf(DEPARTMENTS, "Selecciona un departamento válido.")
    .required("El departamento es obligatorio."),
});

/** Valores iniciales vacíos alineados al schema — se usan en Formik initialValues */
export const contactInitialValues = {
  name: "",
  email: "",
  phone: "",
  department: "" as Department | "",
};

export type ContactFormValues = typeof contactInitialValues;
