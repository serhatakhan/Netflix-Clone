import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopular } from "../redux/actions/movieActions";
import Hero from "../components/Hero";
import { getGenres } from "../redux/actions/genreActions";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

const MainPage = () => {
  //bu sayfada kategorilere ihtiyaç olduğu için ona abone olduk. popüler filmlere <Hero/> bileşeninde abone olduk çünkü orada ihtiyaç vardı
  const genreState = useSelector((store) => store.genreReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    // api'den popüler filmleri al ve store'a aktar
    dispatch(getPopular());

    // bunu buraya koyarak artık sayfayı yenilediğimizde useEffect devreye girecek ve
    // getGenres() aksiyonunu dispatch edecek yani çalıştıracak.
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Hero />

      {/* her api isteğinin sonucunda kullanıcıyı aşamalar hk. bilgilendir */}
      {/* en son da her bir kategori için <MovieList/> bileşeni bastık */}
      {genreState.isLoading ? (
        <Loader />
      ) : genreState.isError ? (
        <p>{genreState.isError}</p>
      ) : (
        genreState.genres.map((genre) => (
          <MovieList key={genre.id} genre={genre} />
        ))
      )}
    </div>
  );
};

export default MainPage;
