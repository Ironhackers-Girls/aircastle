import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
});

http.interceptors.response.use(
    (response) => response.data,
    (error) => {
        return Promise.reject(error)
    }
);

const myProfile = (user) => http.get("/users/myprofile", user)
const profile = (username) => http.get(`/users/${username}`);
const register = (user) => http.post("/users", user);
const updateProfile = (user) => http.patch("/users/myprofile", user);


const login = (user) => http.post("/sessions", user);
const logout = () => http.delete("/sessions");

export {
    profile,
    register,
    updateProfile,
    myProfile,
    login,
    logout,
}