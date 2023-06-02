const CART_STORAGE_KEY = 'shoppingCart';

export const getCartItemsFromStorage = () => {
    const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
};

export const setCartItemsToStorage = (cartItems) => {
    const previousCartItems = getCartItemsFromStorage() || [];
    const updatedCartItems = [...previousCartItems, cartItems];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCartItems));
};

export const updateCartItemsInStorage = (cartItems) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

export const deleteCartItemsFromStorage = () => {
    localStorage.removeItem(CART_STORAGE_KEY)
}