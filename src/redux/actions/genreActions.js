import axios from 'axios';
import { ActionTypes } from './../actionTypes';
import { options } from './../../constants/index';

// kategeori verilerini al ve reducer'a haber ver
export const getGenres = () => (dispatch)=>{
    // api isteğinin atıldığını store'a haber ver.
    dispatch({ type: ActionTypes.GENRES_LOADING})

    // api isteği at
    axios.get("https://api.themoviedb.org/3/genre/movie/list", options)
    // veri gelirse reducer'a haber ver, konsolda görebilmek için önce mainPage de çalıştırıp verdiği sonuçları kontol etmek lazım
    .then((res)=> dispatch({
        type: ActionTypes.GENRES_SUCCESS,
        payload: res.data.genres
    }))
    // hata olursa reducer'a haber ver
    .catch((err)=> dispatch({
        type: ActionTypes.GENRES_ERROR,
        payload: err.message
    }))
}