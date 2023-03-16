import { FormEvent } from "react";
import Button from "../components/ui/Button";
import FormInput from "../components/ui/FormInput";
import Spinner from "../components/ui/Spinner";
import { signup } from "../features/authentication/services/authenticationService";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import useInput from "../hooks/useInput";

const Signup = () => {
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const { isAuth } = useAppSelector(
    (state) => state.authReducer
  );
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(signup({ name: name.value, email: email.value, password: password.value }));
  };

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="p-5 max-w-lg w-full shadow-2xl flex-col space-y-4 rounded-lg"
      >
        <FormInput {...name} name="name" placeholder="name"/>
        <FormInput {...email} name="email" placeholder="email" type="email" />
        <FormInput
          {...password}
          name="password"
          placeholder="password"
          type="password"
        />
        {/* {error && typeof error == "string" ? (
          <p className="text-red-600">{error}</p>
        ) : error ? (
          (error as string[]).map((e) => <p key={e} className="text-red-600">{e}</p>)
        ) : null}
        <Button>{isLoading ?  <Spinner/> : "Зарегистрироваться"}</Button> */}
      </form>
    </div>
  );
};

export default Signup;
