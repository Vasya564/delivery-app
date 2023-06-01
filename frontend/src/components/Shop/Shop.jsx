import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const Shop = () => {
    const getShopsUrl = import.meta.env.VITE_API_URL + 'shops'
    const { data: shops, isLoading, error } = useFetch(getShopsUrl)
    const [selectedShop, setSelectedShop] = useState(null);

    useEffect(() => {
        if (shops) {
          setSelectedShop(shops[0]._id);
        }
      }, [shops]);

    const handleShopClick = (shopId) => {
        setSelectedShop(shopId);
    };

    return (
        <div className="sidebar-menu">
            <h2>Shops</h2>
            <ul>
                {shops && shops.map(shop => (
                <li
                    key={shop._id}
                    onClick={() => handleShopClick(shop._id)}
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
                        <li key={index}>{product.name} - ${product.price}</li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    );
}
 
export default Shop;