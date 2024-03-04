import { Navigate, Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";
import useAuth from "../hooks/useAuth";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {auth?.accessToken ? (
        <>
          <ProfileProvider>
            <Layout>
              <Outlet />
            </Layout>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoutes;
