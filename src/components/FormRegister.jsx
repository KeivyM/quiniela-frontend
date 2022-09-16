import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../utils/schemas";

export const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const validar = (value) => {
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit(validar)}>
      <input
        type="text"
        placeholder="Nombre"
        name="name"
        {...register("name", { required: true })}
      />
      {errors.name?.message}

      <input
        type="text"
        placeholder="Apellido"
        name="lastName"
        {...register("lastName", { required: true })}
      />
      {errors.lastName?.message}

      <input
        type="text"
        placeholder="Nombre de Usuario"
        name="username"
        {...register("username", { required: true })}
      />
      {errors.username?.message}

      <input
        type="email"
        name="email"
        placeholder="Correo"
        {...register("email", { required: true })}
      />
      {errors.email?.message}

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        {...register("password", { required: true })}
      />
      {errors.password?.message}

      <button type="submit">Registrarse</button>
    </form>
  );
};
