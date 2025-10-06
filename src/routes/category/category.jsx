import './category.scss';

import { useState, useEffect, Fragment } from 'react';
// import { CategoriesContext } from '../../contexts/categories.context.jsx';
import ProductCard from '../../components/product-card/product-card.jsx';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector.js';

import Spinner from '../../components/spinner/spinner.component.jsx';

const Category = () => {
    const { category } = useParams();
    // const { categoriesMap } = useContext(CategoriesContext);
    // console.log('render/re-rendering category component');
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        // console.log('effect fired calling setProducts');
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>

            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading ? ( <Spinner /> ) : (<div className='category-container'>

                {
                    products && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div> )
            }

        </Fragment>

    );
}

export default Category;