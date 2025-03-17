import axios from "axios";
import dayjs from "../lib/dayjs";


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


const listCastles = (params) => http.get("/castles", { params });

const getCastle = (id, checkIn, checkOut) => {
    // Si checkIn es null, asignar el día de hoy
    if (!checkIn) {
      checkIn = dayjs().add(1, 'day').format('YYYY-MM-DD'); // Asignamos la fecha de hoy
    }
  
    // Si checkOut es null, asignar el día de mañana
    if (!checkOut) {
      checkOut = dayjs().add(2, 'day').format('YYYY-MM-DD'); // Asignamos la fecha de mañana
    }
  
    // Realizamos la llamada HTTP con las fechas actualizadas
    return http.get(`/castles/${id}?checkIn=${checkIn}&checkOut=${checkOut}`);
  };
const createCastle = (castle) => http.post("/castles", castle);
const updateCastle = (id, castle) => http.patch(`/castles/${id}`, castle);
const deleteCastle = (id) => http.delete(`/castles/${id}`)

const searchCastle = (params) => http.get("/search", { params })

const listBookings = () => http.get("/bookings");
const getBooking = (id) => http.get(`/bookings/${id}`)
const createBooking = (booking) =>http.post("/bookings", booking);
const deleteBooking = (id) => http.delete(`/bookings/${id}`)

const createReview = (id, { title, rating, text }) => http.post(`/bookings/${id}/reviews`, { title, rating, text });

export {
    profile,
    register,
    updateProfile,
    myProfile,
    login,
    logout,
    listCastles,
    getCastle,
    createCastle,
    updateCastle,
    deleteCastle,
    searchCastle,
    listBookings,
    getBooking,
    deleteBooking,
    createBooking,
    createReview
}