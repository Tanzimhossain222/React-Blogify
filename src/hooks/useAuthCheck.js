import useAuth from "./useAuth"

const useAuthCheck =(checkId)=>{
    const {auth:{user}} = useAuth();

    const isMe = user?.id === checkId;

    return isMe;
}

export default useAuthCheck;
