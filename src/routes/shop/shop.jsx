import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview';

import Category from '../category/category';
// import { CategoriesProvider } from '../../contexts/categories.context';
import './shop.scss';

import { useEffect } from 'react';
// import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
// import { setCategories } from '../../store/categories/category.action';
// import { fetchCategoriesAsync } from '../../store/categories/category.action';
import { fetchCategoriesStart } from '../../store/categories/category.action.js';
import { useDispatch } from 'react-redux';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // const getCategoriesMap = async () => {
            // const categoriesArray = await getCategoriesAndDocuments('categories');
            // console.log(categoriesArray);
            // console.log(categoryMap);
            dispatch(fetchCategoriesStart());
        // };
        // getCategoriesMap();
    }, []);


    return (
        // <CategoriesProvider>
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
        // </CategoriesProvider>
    );
}

export default Shop;