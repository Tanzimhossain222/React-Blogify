import { useContext } from "react";
import { DisplayBlogContext } from "../context";

const useDisplayBlogs = () => {
    const context = useContext(DisplayBlogContext);
    if (context === undefined) {
        throw new Error("useDisplayBlogs must be used within a DisplayBlogProvider");
    }
    return context;
}

export default useDisplayBlogs;