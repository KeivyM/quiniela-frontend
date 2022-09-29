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
import { ModalErrors } from "./ModalErrors";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../utils/schemas";
// probando sweetalert2
import Swal from "sweetalert2";
// import "sweetalert2/src/sweetalert2.scss";

export const FormLogin = () => {
  const [values, setValues] = useState({
    password: "",
    email: "",
    showPassword: false,
  });
  const [open, setOpen] = useState([false, { msgTitle: "", msgError: "" }]);
  const { setUserAuth, setUsername } = useContext(AuthContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const validar = async (value) => {
    try {
      const { data } = await AxiosConfig.post("auth/login", value);

      if (typeof data === "string") throw new Error(data);

      const TOKEN = JSON.stringify(data.token);
      localStorage.setItem("user_Auth", TOKEN);

      setUsername(data._doc.username);
      setUserAuth(data.token);
      navigate("/");
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        return setOpen([
          true,
          {
            msgTitle: "Ha ocurrido un error.",
            msgError: "Problemas con el servidos",
          },
        ]);
      }

      if (error.code === "ERR_BAD_REQUEST") {
        return setOpen([
          true,
          {
            msgTitle: "Tus datos no son correctos.",
            msgError: "Verificalos",
          },
        ]);
      }
      console.log("datos incorrectos");
      Swal.fire({
        title: "Tus datos no son correctos!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });

      // setOpen([
      //   true,
      //   { msgTitle: "Tus datos no son correctos.", msgError: error.message },
      // ]);
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
      <ModalErrors open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <TextField
            id="outlined-basic"
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

      <Button type="submit" variant="contained">
        Ingresar
      </Button>
    </form>
  );
};
