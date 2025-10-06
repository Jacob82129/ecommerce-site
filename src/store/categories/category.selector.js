import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

// memoization is handled by reselect
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        console.log('select fired');
        return categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})}
);

// )(state) => {
//     console.log('select fired');
//     return state.categories.categories
//         .reduce((acc, category) => {
//             const { title, items } = category;
//             acc[title.toLowerCase()] = items;
//             return acc;
//         }, {});
// }

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);
