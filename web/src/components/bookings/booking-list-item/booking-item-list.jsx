import dayjs from "dayjs";
import { useState } from "react";
import * as AirCastleApi from "../../../services/aircastle-service"

function BookingListItem({ booking }) {
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [reviewText, setReviewText] = useState(""); 
    const hasPassedCheckOut = dayjs().isAfter(dayjs(booking.checkOut));

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setReviewText(""); 
    };

    const handleSubmitReview = async () => {
        try {
            AirCastleApi.createReview()
            alert("¡Reseña enviada con éxito!");
            handleCloseModal(); 
        } catch (error) {
            console.error("Error al enviar la reseña", error);
            alert("Hubo un error al enviar la reseña");
        }
    };

    return (
        <div className="w-full flex flex-col m-4">
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <p className="text-sm text-gray-600 flex items-center">
                        {booking.checIn} - {booking.checkOut}
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2">{booking?.castle.title}</div>
                    <p className="text-gray-700 text-base">{booking?.totalPrice}</p>
                </div>
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4" src={booking?.castle.user.avatar} alt={booking.castle.user?.name || "User Avatar"} />
                    <div className="text-sm">
                        <p className="text-gray-900 leading-none">{booking?.castle.user.name}</p>
                        <p className="text-gray-600">{booking?.castle.user.phone}</p>
                    </div>
                </div>

                {/* Botón para dejar reseña */}
                {hasPassedCheckOut && !booking.review && (
                    <button onClick={handleOpenModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                        Dejar Reseña
                    </button>
                )}

                {/* Modal para la reseña */}
                {isModalOpen && (
                    <div className="bg-gray-500/70 fixed inset-0 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg max-w-md w-full">
                            <h2 className="text-2xl mb-4">Deja tu Reseña</h2>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded"
                                rows="4"
                                placeholder="Escribe tu reseña..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="bg-gray-500 text-white py-2 px-4 rounded"
                                    onClick={handleCloseModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                    onClick={handleSubmitReview}
                                >
                                    Enviar Reseña
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookingListItem;
