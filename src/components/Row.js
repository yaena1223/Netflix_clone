import axios from "../api/axios";
import { useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { useRef } from "react";
function Row({ title, id, fetchUrl, isLargeRow }) {
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});
    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    };

    useEffect(() => {
        fetchMovieData();
    }, [fetchUrl]);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovies(request.data.results);
    };
    SwiperCore.use([Navigation, Pagination, Autoplay]);

    //모달창 밖에 클릭하면꺼지도록

    return (
        <section className="row">
            <h2>{title}</h2>
            {/* 슬라이더 */}
            <div className="slider">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={8}
                    slidesPerGroup={8}
                    onSlideChange={() => console.log("slide change")}
                    navigation={{
                        nextEl: ".slider__arrow-right",
                        prevEl: ".slider__arrow-left",
                    }}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    loop={true}
                    // autoplay={true}
                    keyboard={{ enabled: true }}
                >
                    <div className="slider__arrow-left">
                        <span className="arrow">{"<"}</span>
                    </div>
                    {/* 영화 여러 개를 key 값을 이용해 반복문 돌리기 */}

                    <div id={id} className="row__posters">
                        {movies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <img
                                    key={movie.id}
                                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                    src={`${BASE_URL}${
                                        isLargeRow ? movie.poster_path : movie.backdrop_path
                                    }`}
                                    loading="lazy"
                                    alt={movie.name}
                                    onClick={() => handleClick(movie)}
                                />
                            </SwiperSlide>
                        ))}
                    </div>
                    <div className="slider__arrow-right">
                        <span className="arrow">{">"}</span>
                    </div>
                </Swiper>
            </div>

            {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
        </section>
    );
}

export default Row;
