import LoginForm from "../components/auth/login/LoginForm";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const LoginPage = () => {
  return (
    <>
      <Header />
      <main>
        <section className="container">
          <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <LoginForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
