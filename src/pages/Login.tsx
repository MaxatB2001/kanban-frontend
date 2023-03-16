import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import FormInput from "../components/ui/FormInput";
import Spinner from "../components/ui/Spinner";
import { HOME_ROUTE } from "../data/constants";
import { useSigninMutation } from "../features/authentication/services/authenticationService";
import useInput from "../hooks/useInput";

const Login = () => {
  const email = useInput("");
  const password = useInput("");
  const navigate = useNavigate();
  const [login, { isError, isLoading }] = useSigninMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await login({ email: email.value, password: password.value });
    if ("data" in res) {
      navigate(HOME_ROUTE);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="p-5 max-w-lg w-full shadow-2xl flex-col space-y-4 rounded-lg"
      >
        <FormInput {...email} name="email" placeholder="email" type="email" />
        <FormInput
          {...password}
          name="password"
          placeholder="password"
          type="password"
        />
        {isError && <p className="text-red-600">Ошибка попроубуйте ещё раз</p>}
        <Button>{isLoading ? <Spinner /> : "Войти"}</Button>
      </form>
    </div>
  );
};

export default Login;
