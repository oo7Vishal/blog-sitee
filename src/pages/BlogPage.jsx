import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';

const BlogPage = () => {
    const [blog, setBlog] = useState(null);
    const [relatedBlogs , setRelatedBlogs] = useState([]);

    const location = useLocation();
    const navigation =  useNavigation();
    const {loading , setLoading} = useContext(AppContext);

    const blogId = location.pathname.split('/').at(-1);

    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${baseUrl}?blogId=${blogId}`;
        try {
            const res = await fetch(url);
            const data = await res.json();

            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);

        }catch(error) {
            console.log("Error in making the blog id call");
            setBlog(null);
            setRelatedBlogs([]);

        }
        setLoading(false);
    }

    useEffect(() => {
        if(blogId) {
            fetchRelatedBlogs();
        }

    },[location.pathname])



  return (
    <div>
            <Header />

            <div>
                <button onClick={() =>navigation(-1)} > Back</button>

                  </div>
                  {
                    loading ?<div>  <p>Loading...</p> </div> :
                    blog ?
                     (
                        <div> 
                            <BlogDetails post={blog} />
                            <h2>Related Blogs</h2>
                            {
                                relatedBlogs.map((post ,id) => (
                                    <div key={post.id} >
                                        <BlogDetails post={post} />
                                         </div>
                                ))
                            }
                        </div>
                     ) :
                     ( <p>No Blog Found </p> )
                }
    </div>
  )
}

export default BlogPage