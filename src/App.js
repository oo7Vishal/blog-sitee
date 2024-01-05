import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { Routes, useLocation, useSearchParams } from "react-router-dom";
export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const[searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {

    const page = searchParams.get('page') ?? 1;

    if(location.pathname.includes('tags')) {
      const tag = location.pathname.split('/').replaceAll("-", " ");
      fetchBlogPosts(Number(page),tag);
    }
    
  }, []);

  return (
    <>
    <Routes>
      {/* <Route path ='/' element={<Home />} />
      <Route path ='/blog/:blogId' element={<Blogs />} />
      <Route path ='/' element={<Home />} />
      <Route path ='/' element={<Home />} /> */}
    </Routes>
    </>
  );
}
