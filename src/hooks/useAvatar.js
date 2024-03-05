
const useAvatar = (user) => {

    let userAvatar;

    if (user?.avatar) {
        userAvatar = `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${user.avatar}`;
        return userAvatar;
    }

    userAvatar = user?.firstName?.charAt(0);
    return userAvatar;

}


export default useAvatar;