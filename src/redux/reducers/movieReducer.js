import { ActionTypes } from "../actionTypes";

// filmlerle alakalı ne tutacağız?
// popüler filmlerin verisini, yüklenme durumunu tutabiliriz yükleniyor gösteririz, hata durumunu tutabiliriz hatayı gösteririz
const initialState = {
  popularMovies: [],
  isLoading: false,
  isError: false,
};

// aksiyonları çağırıp yukarıdaki stateleri güncelleyeceğiz
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MOVIES_LOADING:
      return { ...state, isLoading: true };

    case ActionTypes.MOVIES_ERROR:
      return { ...state, isLoading: false, isError: action.payload };

    case ActionTypes.MOVIES_SUCCESS:
      // burada ...state yazmamıza gerek yoktu çünkü state'in tüm değerlerini yazdık zaten. olur da mesela 2 ay sonra yeni değerler eklenirse state'e kalsın istedik
      return {
        ...state,
        isLoading: false,
        isError: false,
        popularMovies: action.payload,
      };

    default:
      return state;
  }
};

export default movieReducer;
