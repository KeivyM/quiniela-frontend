import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../utils/schemas";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//FALTA AGREGAR UN CAMPO PARA REVALIDAR CONTRASEÑA

export const FormRegister = () => {
  const { setUserAuth, setUsername } = useContext(AuthContext);
  let navigate = useNavigate();

  const [values, setValues] = useState({
    lastName: "",
    name: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
  });

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

      setUsername(data._doc.username);
      setUserAuth(data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(validar)}>
      {/* <input
        type="text"
        placeholder="Nombre"
        name="name"
        {...register("name", { required: true })}
      />
      {errors.name?.message} */}

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <TextField
          id="outlined-basic-name"
          label="Nombre"
          type="text"
          name="name"
          {...register("name", { required: true })}
          onChange={handleChange("name")}
          value={values.name}
          variant="outlined"
        />
        {errors.name?.message}
      </FormControl>

      {/* <input
        type="text"
        placeholder="Apellido"
        name="lastName"
        {...register("lastName", { required: true })}
      />
      {errors.lastName?.message} */}

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <TextField
          id="outlined-basic-lastname"
          label="Apellido"
          type="text"
          name="lastName"
          {...register("lastName", { required: true })}
          onChange={handleChange("lastName")}
          value={values.lastName}
          variant="outlined"
        />
        {errors.lastName?.message}
      </FormControl>

      {/* <input
        type="text"
        placeholder="Nombre de Usuario"
        name="username"
        {...register("username", { required: true })}
      />
      {errors.username?.message} */}

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <TextField
          id="outlined-basic-username"
          label="Nombre de usuario"
          type="text"
          name="username"
          {...register("username", { required: true })}
          onChange={handleChange("username")}
          value={values.username}
          variant="outlined"
        />
        {errors.username?.message}
      </FormControl>

      {/* <input
        type="email"
        name="email"
        placeholder="Correo"
        {...register("email", { required: true })}
      />
      {errors.email?.message} */}

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <TextField
          id="outlined-basic-email"
          label="Correo"
          type="email"
          name="email"
          {...register("email", { required: true })}
          onChange={handleChange("email")}
          value={values.email}
          variant="outlined"
        />
        {errors.email?.message}
      </FormControl>

      {/* <input
        type="password"
        name="password"
        placeholder="Contraseña"
        {...register("password", { required: true })}
      />
      {errors.password?.message} */}

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          name="password"
          {...register("password", { required: true })}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {errors.password?.message}
      </FormControl>

      <button type="submit">Registrarse</button>
    </form>
  );
};
