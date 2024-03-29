import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const requireField = () => yup.string().required("Este campo es requerido.");

export const schemaRegister = yup
  .object({
    name: yup
      .string()
      .required("Este campo es requerido.")
      .matches(/^[a-zA-Zs\s]*$/, "Los números no son permitidos."),
    lastName: yup
      .string()
      .required("Este campo requerido.")
      .matches(/^[a-zA-Zs\s]*$/, "Los números no son permitidos."),
    username: yup.string().required("Este campo es requerido."),
    email: yup
      .string()
      .email("Correo no válido.")
      .required("Este campo es requerido."),
    password: requireField()
      .min(8, "Debe tener mínimo 8 letras.")
      .minLowercase(1, "Debe tener 1 letra minúscula.")
      .minUppercase(1, "Debe tener 1 letra mayúscula.")
      .minNumbers(1, "Debe tener 1 número."),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref("password"), null], "Contraseña no coincide.")
      .required("Este campo es requerido."),
  })
  .required()
  .strict();

export const schemaLogin = yup
  .object({
    email: yup
      .string()
      .email("Este correo no es válido.")
      .required("El correo es requerido."),
    password: requireField().min(8, "Debe tener mínimo 8 letras."),
  })
  .required()
  .strict();
