import React from 'react';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination';

const CategoryPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.pathname.split('/').at(-1);

    return (
        <div>
            <Header />

            <div>
                <button onClick={() => navigate(-1)}>
                    Back
                </button>
                <h2>
                    Blogs On <span>{category}</span>
                </h2>
                <Blogs />
                <Pagination />
            </div>
        </div>
    );
};

export default CategoryPage;