import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context";
import { AxiosConfig } from "../utils/AxiosConfig";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../utils/schemas";
import Swal from "sweetalert2";

export const FormLogin = () => {
  const [values, setValues] = useState({
    password: "",
    email: "",
    showPassword: false,
  });
  const { setUserAuth, setLoading } = useContext(AuthContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const validateUser = async (userData) => {
    try {
      setLoading(true);
      const { data } = await AxiosConfig.post("auth/login", userData);
      AxiosConfig.defaults.headers.common["Authorization"] =
        `Bearer ${data.token}` || "";

      if (typeof data === "string") throw new Error(data);

      sessionStorage.setItem("user_Auth", data.token);
      setUserAuth(data.token);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.code === "ECONNABORTED") {
        return Swal.fire({
          title: "Problemas con el servidor!",
          text: "Intentalo luego",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }

      if (error.code === "ERR_BAD_REQUEST") {
        return Swal.fire({
          title: "Tus datos no son correctos.!",
          text: "Verificalos",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
      Swal.fire({
        title: "Verifica tus datos!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
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
    <Box
      component="form"
      onSubmit={handleSubmit(validateUser)}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "23px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "7px",
        }}
      >
        <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
            label="Correo"
            type="email"
            name="email"
            color="secondary"
            {...register("email", { required: true })}
            onChange={handleChange("email")}
            value={values.email}
            variant="outlined"
          />
          {errors.email?.message}
        </FormControl>

        <FormControl
          sx={{ m: 1, width: "30ch" }}
          color="secondary"
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            name="email"
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
      </Box>

      <Button type="submit" variant="contained" sx={{ margin: "0 auto" }}>
        Ingresar
      </Button>
    </Box>
  );
};
