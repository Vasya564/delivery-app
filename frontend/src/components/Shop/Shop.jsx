import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getCartItemsFromStorage, setCartItemsToStorage } from "../../hooks/useCartStorage";

const Shop = () => {
    const getShopsUrl = import.meta.env.VITE_API_URL + 'shops'
    const { data: shops, fetchData } = useFetch()
    const [selectedShop, setSelectedShop] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchData(getShopsUrl)
    }, []);

    useEffect(() => {
        if (shops) {
            const selectedShopId = JSON.parse(localStorage.getItem("selectedShop"));
            const selectedShopExists = shops.some(shop => shop._id === selectedShopId?.id);

            if (selectedShopExists) {
                setSelectedShop(selectedShopId?.id);
            } else {
                const defaultShop = shops[0];
                setSelectedShop(defaultShop._id);
                localStorage.setItem("selectedShop", JSON.stringify({ id: defaultShop._id, name: defaultShop.name, coords: defaultShop.coords }));
            }
            setCartItems(getCartItemsFromStorage());
        }
    }, [shops]);

    const handleShopClick = (shopId, shopName, shopCoords) => {
        if(!cartItems.length){
            setSelectedShop(shopId);
            localStorage.setItem("selectedShop", JSON.stringify({ id: shopId, name: shopName, coords: shopCoords }));
        }
    };

    const handleAddToCart = (product) => {
        setCartItemsToStorage(product);
        setCartItems([...cartItems, product]);
    };

    return (
        <div className="sidebar-menu">
            <h2>Shops</h2>
            <ul>
                {shops && shops.map(shop => (
                <li
                    key={shop._id}
                    onClick={() => handleShopClick(shop._id, shop.name, shop.coords)}
                    className={selectedShop === shop._id ? 'active' : ''}
                >
                    {shop.name}
                </li>
                ))}
            </ul>
            {selectedShop && (
                <div className="selected-shop-products">
                <h3>Products</h3>
                <ul>
                    {shops && shops.find(shop => shop._id === selectedShop).products.map((product, index) =>(
                        <div key={index}>
                            <li>{product.name} - ${product.price}</li>
                            <button
                                onClick={() => handleAddToCart(product)}
                                disabled={cartItems.some((item) => item._id === product._id)}
                            >
                                {cartItems.some((item) => item._id === product._id) ? 'In cart' : 'Add to cart'}
                            </button>
                        </div>
                    ))}
                </ul>
                </div>
            )}
        </div>
    );
}
 
export default Shop;