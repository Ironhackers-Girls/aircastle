import { useEffect, useRef, useState } from "react";
import * as AirCastleApi from "../../../services/aircastle-service";
import CastleItem from "../castle-item/castle-item";
import { IconTent, IconBike, IconFish, IconPool, IconCooker, IconCamera, IconYoga, IconBrush, IconStars, IconChevronLeft, IconChevronRight, IconTower, IconBuildingCottage, IconDeviceGamepad2, IconHorse, IconMusic, IconFeather, IconGlassFullFilled, IconSun, IconMountain, IconPuzzle, IconLockSquareRounded, IconSword, IconTargetArrow } from '@tabler/icons-react';

function CastleList() {
    const [castles, setCastles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState("All");
    const scrollContainerRef = useRef(null);
    const [showScrollButtonLeft, setShowScrollButtonLeft] = useState(false);
    const [showScrollButtonRight, setShowScrollButtonRight] = useState(true);

    const filterServices = [
        { name: "All", icon: <IconTower size={24} /> },
        { name: "Treasure Hunts", icon: <IconPuzzle size={24} /> },
        { name: "Small Farm", icon: <IconBuildingCottage size={24} /> },
        { name: "Horseback", icon: <IconHorse size={24} /> },
        { name: "Falconry shows", icon: <IconFeather size={24} /> },
        { name: "Live music", icon: <IconMusic size={24} /> },
        { name: "Vineyard", icon: <IconGlassFullFilled size={24} /> },
        { name: "Hot springs", icon: <IconSun size={24} /> },
        { name: "Hiking", icon: <IconMountain size={24} /> },
        { name: "Role-playing", icon: <IconDeviceGamepad2 size={24} /> },
        { name: "Escape Room", icon: <IconLockSquareRounded size={24} /> },
        { name: "Sword Fighting Workshop", icon: <IconSword size={24} /> },
        { name: "Archery", icon: <IconTargetArrow size={24} /> },
        { name: "Camping", icon: <IconTent size={24} /> },
        { name: "Fishing", icon: <IconFish size={24} /> },
        { name: "Cycling", icon: <IconBike size={24} /> },
        { name: "Swimming", icon: <IconPool size={24} /> },
        { name: "Cooking", icon: <IconCooker size={24} /> },
        { name: "Photography", icon: <IconCamera size={24} /> },
        { name: "Yoga", icon: <IconYoga size={24} /> },
        { name: "Art Workshop", icon: <IconBrush size={24} /> },
        { name: "Stargazing", icon: <IconStars size={24} /> }
    ];

    useEffect(() => {
        setLoading(true);
        AirCastleApi.listCastles({
            services: selectedService === "All" ? "" : selectedService
        })
            .then((castles) => {
                setCastles(castles);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [selectedService]);

    const handleServiceChange = (service) => {
        setSelectedService(service);
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;

            // Mostrar u ocultar el botón de desplazamiento a la izquierda
            setShowScrollButtonLeft(scrollLeft > 0);

            // Mostrar u ocultar el botón de desplazamiento a la derecha
            setShowScrollButtonRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollRight = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({
                left: 600, 
                behavior: "smooth"
            });
        }
    };

    const scrollLeft = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({
                left: -600, 
                behavior: "smooth"
            });
        }
    };
    

    useEffect(() => {
        // Agregar el listener para el scroll
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        // Limpiar el listener al desmontar el componente
        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <div>
            {/* Filtros */}
            <div className="relative mb-6">
                <div className="flex items-center gap-4 overflow-x-auto space-x-4 scroll-container" ref={scrollContainerRef}>
                    {filterServices.map((service) => (
                        <button
                            key={service.name}
                            onClick={() => handleServiceChange(service.name)}
                            className={`flex flex-col min-w-max h-[75px] gap-2 items-center p-3 font-semibold ${selectedService === service.name
                                ? "border-b-2 border-black text-black "
                                : "text-gray-600 "
                                } hover:border-b-2 hover:border-gray-200 hover:text-black cursor-pointer`}
                        >
                            {service.icon}
                            <span className="text-xs font-montserrat">{service.name}</span>
                        </button>
                    ))}
                </div>
                {/* Flecha de desplazamiento a la izquierda */}
                {showScrollButtonLeft && (
                    <div
                        onClick={scrollLeft}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gradient-to-r from-white/100 to-white/20 h-full w-[60px] flex justify-center items-center "
                    >
                        <div className="bg-white border-1 border-gray-400 p-1 rounded-full cursor-pointer">
                            <IconChevronLeft size={20} color="black" />
                        </div>
                    </div>
                )}
                {/* Flecha de desplazamiento a la derecha */}
                {showScrollButtonRight && (
                    <div
                        onClick={scrollRight}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-r from-white/20 to-white/100 h-full w-[60px] flex justify-center items-center"
                    >
                        <div className="bg-white border-1 border-gray-400 p-1 rounded-full cursor-pointer">
                            <IconChevronRight size={20} color="black" />
                        </div>
                    </div>
                )}
            </div>

            {/* Mostrar castillos */}
            <div className="flex flex-wrap justify-between sm:gap-8 lg:gap-5">
                {loading
                    ? 
                    Array(18)
                        .fill()
                        .map((_, index) => (
                            <div
                                key={index}
                                className="w-[270px] h-[300px] bg-gray-300 p-4 rounded-lg animate-pulse"
                            >
                            </div>
                        ))
                    : castles.length === 0
                        ? (
                            <div className="text-center text-gray-500 w-full">
                                No castles found for the selected service.
                            </div>
                        )
                        : castles.map((castle) => (
                            <CastleItem key={castle.id} castle={castle} />
                        ))}
            </div>
        </div>
    );
}

export default CastleList;
