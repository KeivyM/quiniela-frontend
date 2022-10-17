import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../utils/schemas";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { AxiosConfig } from "../utils";

export const FormRegister = () => {
  const { setUserAuth, setUsername } = useContext(AuthContext);
  let navigate = useNavigate();

  const [values, setValues] = useState({
    lastName: "",
    name: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    showPassword: false,
    showPasswordRepeat: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const validar = async (value) => {
    delete value.passwordRepeat;

    try {
      const { data } = await AxiosConfig.post("auth/register", value);

      if (data.code) {
        let nameKey =
          Object.keys(data.keyPattern)[0] === "username"
            ? "Un usuario ya existe con ese nombre de usuario"
            : "Un usuario ya existe con ese correo";
        throw new Error(nameKey);
      }

      localStorage.setItem("user_Auth", data.token);

      setUsername(data._doc.username);
      setUserAuth(data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Verifica tus datos!",
        text: error.message,
        icon: "info",
        confirmButtonText: "Ok",
      });
    }

    // if (data.code) {
    //   let nameKey =
    //     Object.keys(data.keyPattern)[0] === "username"
    //       ? "nombre de usuario"
    //       : "correo";
    //   return setOpen([
    //     true,
    //     {
    //       msgTitle: "Verifica los datos.",
    //       msgError: `Ya existe un usuario con ese ${nameKey}`,
    //     },
    //   ]);
    // }

    // const token = JSON.stringify(data.token);
    // localStorage.setItem("user_Auth", token);

    // setUsername(data._doc.username);
    // setUserAuth(data.token);
    // navigate("/");
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

  const handleClickShowPasswordRepeat = () => {
    setValues({
      ...values,
      showPasswordRepeat: !values.showPasswordRepeat,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    // <form onSubmit={handleSubmit(validar)}>
    <Box
      component="form"
      onSubmit={handleSubmit(validar)}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
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

        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
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
            label="Contraseña"
          />
          {errors.password?.message}
        </FormControl>

        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password-repeat">
            Repite la Contraseña
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-repeat"
            type={values.showPasswordRepeat ? "text" : "password"}
            value={values.passwordRepeat}
            name="passwordRepeat"
            {...register("passwordRepeat", { required: true })}
            onChange={handleChange("passwordRepeat")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordRepeat}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPasswordRepeat ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Repite la Contraseña"
          />
          {errors.passwordRepeat?.message}
        </FormControl>
      </Box>

      <Button type="submit" variant="contained">
        Registrarse
      </Button>
    </Box>
  );
};
