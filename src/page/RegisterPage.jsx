import RegisterForm from "../components/auth/register/RegisterForm";
import SocialIcons from "../components/footer/SocialIcons";
import Header from "../components/header/Header";

const RegisterPage = () => {
  return (
    <>
      <Header />
      <main>
        <section className="container">
          <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <RegisterForm />
          </div>
        </section>
      </main>

      <footer className="my-6 md:my-8 bg-[#030317]">
        <div className="container mx-auto flex items-center justify-between">
          <SocialIcons />
        </div>
      </footer>
    </>
  );
};

export default RegisterPage;
