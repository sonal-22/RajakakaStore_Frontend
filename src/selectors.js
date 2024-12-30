import { createSelector } from 'reselect';

// Selector to get the product state
const selectProductState = (state) => state.productReducer; // Adjust based on your actual state structure

// Memoized selector for loading, products, and error
export const selectProducts = createSelector(
    [selectProductState],
    (productState) => {
        if (!productState) {
            return { loading: false, products: [], error: '' }; // Return a default value if productState is undefined
        }
        return {
            loading: productState.loading,
            products: productState.products,
            error: productState.error,
        };
    }
);
