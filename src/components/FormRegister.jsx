import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../utils/schemas";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

export const FormRegister = () => {
  const { updateData, setUpdateData, setAuth, setUserAuth } =
    useContext(AuthContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const validar = async (value) => {
    console.log(value);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/register",
        value
      );
      console.log(data);
      if (data.code)
        throw new Error(
          JSON.stringify({ code: data.code, keyValue: data.keyValue })
        );

      const token = JSON.stringify(data.token);
      localStorage.setItem("user_Auth", token);

      setUserAuth(data.token);
      setUpdateData(updateData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
