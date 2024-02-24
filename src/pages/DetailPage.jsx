import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImgUrl, options } from "../constants";
import Loader from "../components/Loader";
import DetailDisplay from "../components/DetailDisplay";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import PlayerCard from "../components/PlayerCard";
import Videos from "../components/Videos";

const DetailPage = () => {
  // filmin detay bilgilerini başka componentta tutmayacağız. ondan dolayı useState
  const [movie, setMovie] = useState(null);

  // url'den filmin id'sini al, useParams kullanılıyor !!!
  const { id } = useParams();

  // api'den filmin bilgilerini al
  // ek olarak fragmanlar ve filmin diğer bilgileri için de append_to_response=videos,credits parametresini ekledik
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits`,
        options
      )
      .then((res) => setMovie(res.data));
  }, []);


  return (
    <div>
      {!movie && <Loader />}

      {movie && (
        <div>
          <div className="relative h-[70vh] w-auto">
            <img
              className="h-full w-full object-cover"
              src={baseImgUrl + movie.backdrop_path}
            />
            {/* inset-0 : top-0 left right bottom-0 yazmak yerine kullanılır */}
            <div className="absolute bg-black inset-0 bg-opacity-50 grid place-items-center">
              <span className="text-3xl md:text-4xl font-bold">
                {movie.title}
              </span>
            </div>
          </div>

          {/* küçük ekranlarda tek, büyük ekranlarda 2 sütun olsun */}
          <div className="grid grid-cols-1 md:grid-cols-2 my-8">
            {/* sol taraf */}
            <div>
              <DetailDisplay title="Kategoriler" data={movie.genres} />
              <DetailDisplay
                title="Konuşulan Diller"
                data={movie.spoken_languages}
              />
              <DetailDisplay
                title="Yapımcı Şirketler"
                data={movie.production_companies}
              />
              <DetailDisplay
                title="Yapımcı Ülkeler"
                data={movie.production_countries}
              />
            </div>

            {/* sağ taraf */}
            <div>
              <p className="text-lg">{movie.overview}</p>

              <p className="font-semibold my-4">
                <span>Bütçe: </span>
                <span className="text-green-500">
                  {movie.budget === 0
                    ? "Bilinmiyor"
                    : millify(movie.budget) + " $"}
                </span>
              </p>

              <p className="font-semibold my-4">
                <span>Gelir: </span>
                <span className="text-green-500">
                  {movie.revenue === 0
                    ? "Bilinmiyor"
                    : millify(movie.revenue) + " $"}
                </span>
              </p>
            </div>
          </div>

          {/* oyuncular */}
          <div>
            <h2 className="text-xl font-bold mb-2">Oyuncular</h2>
            <Splide
              options={{
                autoWidth: true,
                gap: "10px",
                rewind: true,
                lazyLoad: true,
              }}
            >
              {movie.credits.cast.map((player) => (
                <SplideSlide>
                  <PlayerCard key={player.credit_id} player={player} />
                </SplideSlide>
              ))}
            </Splide>
          </div>

          {/* videolar */}
          <div>
            <h2 className="text-xl font-bold mt-6 mb-2">Fragmanlar</h2>
            <Splide
              options={{
                autoWidth: true,
                gap: "10px",
                rewind: true,
                lazyLoad: true,
                width: "100%",
              }}
            >
              {movie.videos.results.map((video)=> (
                <SplideSlide>
                  <Videos key={video.id} video={video} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
