import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axiosInstance from "./axiosInstance";

const useAxios = () => {
    const { auth, setAccessToken } = useAuth();

    useEffect(() => {
        //add a request interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use(
            config => {
                const accessToken = auth?.accessToken;
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },

            error => {
                return Promise.reject(error);
            }
        )

        //add a response interceptor

        const responseInterceptor = axiosInstance.interceptors.response.use(
            response => {
                return response;
            },
            //handle the response error

            async (err) => {
                const originalRequest = err.config;
                if (err.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = auth?.refreshToken;
                        const res = await axiosInstance.post('/auth/refresh-token', {
                            refreshToken,
                        });

                        if (res.status === 200) {
                            const newToken = res.data.accessToken;
                            setAccessToken(newToken);
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            return axiosInstance(originalRequest);
                        }

                    } catch (err) {

                        return Promise.reject(err);
                    }
                }

            }
        )


        //cleanup
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }

    }, [auth, setAccessToken])

    return { axiosInstance }

}


export default useAxios;