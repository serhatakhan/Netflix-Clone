import axios from "axios";
import { useEffect, useState } from "react";
import { baseImgUrl, options } from "../constants";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const MovieList = ({ genre }) => {
  //listelenen filmler için state tuttuk. başka bir yerde lazım olsaydı store'da tutacaktık
  const [movies, setMovies] = useState(null);

  // eimizde kategorilerin id'leri ve isimleri var.
  // belli bir kategoriye ait olan filmleri almak istiyoruz.
  useEffect(() => {
    // api'deki with_genres parametresine kategorinin(genre) id'sini verdiğimizde ilgili kategoriye ait filmleri alıyoruz. ekrandaki her kategori için ayrı istek atılmış oluyor.
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}`,
        options
      )
      .then((res) => setMovies(res.data.results));
  }, []);

  console.log(movies);

  return (
    <div className="my-8">
      {/* kategori isimleri */}
      <h1 className="text-3xl font-semibold mb-3">{genre.name}</h1>

      {/* elimizdeki film kadar ekrana <SplideSlide/> bileşeni bas */}
      <Splide
        aria-label="Movies"
        options={{
          autoWidth: true,
          rewind: true,
          gap: "10px",
          lazyLoad: true,
        }}
      >
        {!movies && (
          <div className="h-[300px] flex items-center">
            <Loader />
          </div>
        )}

        {/* Her bir filmi <Link> ile sarmaladık. Bu Linke tıklanıldığı zaman, tılanan filmin detay sayfasına yönlendirilecek kullanıcı. */}
        {/* Sonrasında detay sayfasına gidip url'den parametreyi alıp ürünün bilgilerini alacağız */}
        {/* <Link> yerine navigate de kullanılabilirdi. resime onClick ekleyip kullanabilirdik. Aynı işlev. navigate bir component değil bir fonksiyondur. o yüzden onClick ile kullanabiliriz. */}
        {movies?.map((movie) => (
          <SplideSlide>
            <Link to={`/detay/${movie.id}`}>
              <img
                height={300}
                className="max-w-[300px] h-full cursor-pointer rounded"
                src={baseImgUrl + movie.poster_path}
                alt={movie.title}
              />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
// splide'da autoWidth:true, özelliğini kullanarak ekrana ne kadar sığıyorsa
// o kadar eleman atmasını sağladık !! ve img'leri boyutlarını da kendimiz max-w-[300px] h-full şeklinde ayarladık ki biraz küçülsün

export default MovieList;
