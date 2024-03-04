import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {auth?.accessToken ? (
        <>
          <Layout>
            <Outlet />
          </Layout>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoutes;
