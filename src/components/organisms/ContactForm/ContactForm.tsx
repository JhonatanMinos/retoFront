import { Formik, Form } from "formik";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/molecules/FormField";
import {
  contactSchema,
  contactInitialValues,
  type ContactFormValues,
} from "@/schemas/contactSchema";
import type { Department } from "@/types/contact";

const DEPARTMENTS: Department[] = [
  "Ventas",
  "Desarrollo",
  "Marketing",
  "Soporte",
];

type ContactFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ContactFormValues) => void;
};

/**
 * Por qué el campo "departamento" no usa FormField:
 * FormField envuelve un <Input> de texto. Departamento es un enum cerrado
 * (4 valores fijos) — un Select es más correcto semánticamente y evita
 * que el usuario ingrese texto libre que rompería el tipado.
 * Conectar Formik con shadcn/Select requiere setFieldValue manual
 * porque Select no emite un evento nativo onChange con target.value.
 */
export function ContactForm({ open, onOpenChange, onSubmit }: ContactFormProps) {
  const handleSubmit = (
    values: ContactFormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    onSubmit(values);
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar contacto</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={contactInitialValues}
          validationSchema={contactSchema}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnBlur
        >
          {({ isSubmitting, isValid, dirty, setFieldValue, values, errors, touched }) => (
            <Form className="flex flex-col gap-4" noValidate>
              <FormField
                name="name"
                label="Nombre"
                placeholder="Ana García"
                required
              />

              <FormField
                name="email"
                label="Correo electrónico"
                type="email"
                placeholder="ana@example.com"
                required
              />

              <FormField
                name="phone"
                label="Teléfono"
                type="tel"
                placeholder="33 1234 5678"
              />

              {/* Departamento — Select de shadcn conectado manualmente a Formik */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="department">
                  Departamento
                  <span className="ml-0.5 text-destructive">*</span>
                </Label>
                <Select
                  value={values.department}
                  onValueChange={(value) =>
                    setFieldValue("department", value, true)
                  }
                >
                  <SelectTrigger
                    id="department"
                    aria-invalid={touched.department && Boolean(errors.department)}
                    className={
                      touched.department && errors.department
                        ? "border-destructive focus:ring-destructive/40"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Selecciona un departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {touched.department && errors.department && (
                  <p role="alert" className="text-sm text-destructive">
                    {errors.department}
                  </p>
                )}
              </div>

              <DialogFooter className="mt-2 gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>

                {/*
                  Botón deshabilitado mientras:
                  - el form no está "dirty" (el usuario no tocó nada aún), O
                  - hay errores de validación
                  Así evitamos el caso de entrar al modal y darle submit sin tocar nada.
                */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  Guardar contacto
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
