import { Outlet } from "react-router-dom"
import Layout from "../components/layout/Layout"


const PublicRoutes = () => {
  return (
    <Layout>
        <Outlet />
    </Layout>
  )
}

export default PublicRoutes