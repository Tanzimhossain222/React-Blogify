import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileBlogs from "../components/blogs/ProfileBlogs";

const AuthorPage = () => {
    const { userId } = useParams();
    const {auth:{user}} = useAuth();
    const navigation = useNavigate();

    const isMe = userId === user?.id;

    if(isMe){
        navigation('/profile');
    }
    

  return (
    <>
        <main className="mx-auto max-w-[1020px] py-8">
        <div className="container">
          <ProfileInfo />
          <ProfileBlogs />
        </div>
      </main>
    </>
  )
}

export default AuthorPage