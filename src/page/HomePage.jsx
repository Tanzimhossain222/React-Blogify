import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { auth } = useAuth();
  return <div>HomePage</div>;
};

export default HomePage;
