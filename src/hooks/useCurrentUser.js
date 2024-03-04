import useAuth from "./useAuth";
import useProfile from "./useProfile";

export const useCurrentUser = () => {
    const { auth } = useAuth();
    const { state } = useProfile();
    const activeUser = state?.user ?? auth?.user;

    return activeUser;

}


