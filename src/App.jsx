import LoginPage from "./page/LoginPage";
import AuthProvider from "./providers/AuthProvider";

const App = () => {
  return (
    <>
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
    </>
  );
};

export default App;
