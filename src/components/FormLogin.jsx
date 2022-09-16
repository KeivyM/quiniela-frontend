import React from "react";
import { useForm } from "react-hook-form";

export const FormLogin = () => {
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const validar = (value) => {
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit(validar)}>
      <input
        type="email"
        name="email"
        placeholder="Correo"
        // {...register("email", { required: true })}
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        // {...register("password", { required: true })}
      />
      <button type="submit">Ingresar</button>
    </form>
  );
};
