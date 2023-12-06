import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import MovieOrderPage from "./Pages/MovieOrderPage/MovieOrderPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import MoviesManagement from "./Pages/AdminPage/MoviesManagement/MoviesManagement";
import AddMoviePage from "./Pages/AdminPage/MoviesManagement/AddMoviePage/AddMoviePage";
import EditMoviePage from "./Pages/AdminPage/MoviesManagement/EditMoviePage/EditMoviePage";
import SchedulePage from "./Pages/AdminPage/SchedulePage/SchedulePage";
import AddSchedulePage from "./Pages/AdminPage/SchedulePage/AddSchedulePage/AddSchedulePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie_order/:id" element={<MovieOrderPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<AdminPage />}>
          <Route path="movies" element={<MoviesManagement />} />
          <Route path="movies/add" element={<AddMoviePage />} />
          <Route path="movies/edit/:id" element={<EditMoviePage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="schedule/add" element={<AddSchedulePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
