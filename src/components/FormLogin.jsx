import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

export const FormLogin = () => {
  const { updateData, setUpdateData, setAuth } = useContext(AuthContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const validar = async (value) => {
    console.log(value);

    const { data } = await axios.get("http://192.168.0.125:3000/users");
    const userValid = data.find(
      (user) => value.email === user.email && value.password === user.password
    );
    console.log(userValid);

    if (!!userValid === false) return console.log("Datos Incorrectos");

    const usuario = JSON.stringify(userValid);
    localStorage.setItem("user_Auth", usuario);
    setAuth(() => {
      const data = localStorage.getItem("user_Auth");
      return !!data;
    });
    setUpdateData(!updateData);
    navigate("/");
    // const passwordValid = data.find((user) => value.email == user.email);

    // console.log(!!userValid != true);
  };

  return (
    <form onSubmit={handleSubmit(validar)}>
      <input
        type="email"
        name="email"
        placeholder="Correo"
        {...register("email", { required: true })}
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        {...register("password", { required: true })}
      />
      <button type="submit">Ingresar</button>
    </form>
  );
};
