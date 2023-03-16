import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Spinner from "./components/ui/Spinner";
import { useCheckAuthMutation } from "./features/authentication";

function App() {
  const [checkAuth, {data, isLoading, isError}] = useCheckAuthMutation()
  useEffect(() => {
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner/>
      </div>
    )
  }
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
