import { useSelector } from "react-redux";
import { baseImgUrl } from "../constants";
import Loader from "./Loader";

const Hero = () => {
  // store'da tutulan popüler filmler verilerine eriş. onları burada kullanacağız
  const store = useSelector((store) => store.movieReducer);

  // 0-19 arası rastgele sayı üret --> floor yerine neden round kullanmadık? çünkü round yapınca 20.eleman da geliyor. dizide 19'a kadar gidiyoruz. o yüzden floor
  const i = Math.floor(Math.random() * 20);

  // film dizisinden rastgele üretilen sıradaki filme eriş
  const randomMovie = store.popularMovies[i];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* bir süre undefined geliyor. eğer randomMovie yoksa.. */}
      {!randomMovie ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col gap-6 items-center justify-center">
            <h1 className="text-3xl font-bold">{randomMovie.title}</h1>
            <p>{randomMovie.overview}</p>
            <p>
              <span>IMDB: </span>
              <span className="text-yellow-400">{randomMovie.vote_average.toFixed(1)}</span>
            </p>
            <div className="flex gap-5">
              <button className="p-2 bg-red-800 rounded hover:bg-red-900">Filmi İzle</button>
              <button className="p-2 bg-blue-800 rounded hover:bg-blue-900">Listeye Ekle</button>
            </div>
          </div>

          <div>
            <img className="my-4 rounded shadow hero-img"
              src={baseImgUrl.concat(randomMovie.backdrop_path)}
              alt={randomMovie.title}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
