import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="p-6 md:px-10">
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detay/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
