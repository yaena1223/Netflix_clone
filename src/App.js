import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";
import requests from "./api/requests";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
const Layout = () => {
    return (
        <div>
            <Nav />
            <Outlet />

            <Footer />
        </div>
    );
};
function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path=":movieId" element={<DetailPage />} />
                    <Route path="search" element={<SearchPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
