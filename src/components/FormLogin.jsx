import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { AxiosConfig } from "../utils/AxiosConfig";

export const FormLogin = () => {
  const { setUserAuth, setUsername } = useContext(AuthContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

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
      console.log(error);
    }

    // const userValid = data.find(
    //   (user) => value.email === user.email && value.password === user.password
    // );
    // console.log(userValid);

    // if (!!userValid === false) return console.log("Datos Incorrectos");

    // const usuario = JSON.stringify(userValid);
    // localStorage.setItem("user_Auth", usuario);
    // setAuth(() => {
    //   const data = localStorage.getItem("user_Auth");
    //   return !!data;
    // });
    // setUpdateData(!updateData);
    // navigate("/");

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
