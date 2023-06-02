import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getCartItemsFromStorage, setCartItemsToStorage } from "../../hooks/useCartStorage";
import './Shop.scss'

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
        <section className="menu">
            <div className="menu__shops">
                <h3 className="menu__title">Shops:</h3>
                <ul className="menu__shops-list">
                    {shops && shops.map(shop => (
                    <li
                        key={shop._id}
                        onClick={() => handleShopClick(shop._id, shop.name, shop.coords)}
                        className={`menu__shop ${selectedShop === shop._id ? 'active' : ''}`}
                    >
                        {shop.name}
                    </li>
                    ))}
                </ul>
            </div>
            {selectedShop && (
                <div className="menu__shop-products">
                    {shops && shops.find(shop => shop._id === selectedShop).products.map((product, index) =>(
                        <div className="menu__shop-product" key={index}>
                            <img src={product.photo}/>
                            <div className="menu__shop-product-info">
                                <p className="menu__shop-product-name">{product.name} - ${product.price}</p>
                                <button
                                    className="menu__shop-product-button"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={cartItems.some((item) => item._id === product._id)}
                                >
                                    {cartItems.some((item) => item._id === product._id) ? 'In cart' : 'Add to cart'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
 
export default Shop;