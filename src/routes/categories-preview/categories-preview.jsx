import { Fragment } from 'react';
// import { CategoriesContext } from '../../contexts/categories.context.jsx';
import CategoryPreview from '../../components/category-preview/category-preview.jsx';

import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector.js';

import Spinner from '../../components/spinner/spinner.component.jsx';

const CategoriesPreview = () => {

    // const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>

            {   isLoading ? ( <Spinner /> ) :
                (Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                }))
            }

        </Fragment>
    );
}

export default CategoriesPreview;