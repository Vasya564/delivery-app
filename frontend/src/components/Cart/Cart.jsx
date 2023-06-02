import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    getCartItemsFromStorage, 
    updateCartItemsInStorage, 
    deleteCartItemsFromStorage } from "../../hooks/useCartStorage";
import useFetch from "../../hooks/useFetch";
import MapContainer from "../MapContainer/MapContainer";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import './Cart.scss'

const Cart = () => {
    const navigate = useNavigate();
    const createOrderUrl = import.meta.env.VITE_API_URL + 'orders/create';
    const getCouponsUrl = import.meta.env.VITE_API_URL + 'coupons'
    const { data, fetchData } = useFetch();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [shopCoords, setShopCoords] = useState(null);
    const [shopName, setShopName] = useState(null);
    const [couponCode, setCouponCode] = useState('');

    const getCoupons = () => {
        const { data, fetchData } = useFetch();
      
        useEffect(() => {
          fetchData(getCouponsUrl);
        }, []);
      
        return data;
    };

    const coupons = getCoupons();

    useEffect(() => {
        const storedCartItems = getCartItemsFromStorage();
        setCartItems(storedCartItems);
        
        if(getCartItemsFromStorage().length > 0){
            const shop = JSON.parse(localStorage.getItem('selectedShop'))
            const storedName = shop.name
            const storedCoords = shop.coords
            const lat = parseFloat(storedCoords.lat);
            const lng = parseFloat(storedCoords.lng);
            setShopCoords({ lat, lng });
            setShopName(storedName)
        }
    }, []);

    useEffect(() => {
        calculateTotalPrice()
    }, [cartItems]);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        
        for (const item of cartItems) {
            totalPrice += item.quantity * item.price;
        }
        
        setTotalPrice(totalPrice);
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedCartItems = cartItems.map((item) => {
          if (item._id === itemId) {
            item.quantity = newQuantity;
          }
          return item;
        });
    
        setCartItems(updatedCartItems);
        updateCartItemsInStorage(updatedCartItems);
    };

    const handleRemoveCartItem = (itemId) => {
        const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
        setCartItems(updatedCartItems);
        updateCartItemsInStorage(updatedCartItems);

        if (getCartItemsFromStorage().length === 0) {
            deleteCartItemsFromStorage();
            localStorage.removeItem('selectedShop')
            setShopName(null)
            setShopCoords(null)
        }
    };

    const handleAddressSelect = (selectedAddress) => {
        setAddress(selectedAddress);
        setSelectedAddress(selectedAddress);
    };

    const applyCoupon = () => {
        const coupon = coupons.find(coupon => coupon.code === couponCode);
    
        if (coupon) {
            const discountPercentage = coupon.percentage;
            const discountAmount = (totalPrice * discountPercentage) / 100;
            const newTotal = totalPrice - discountAmount;
            setTotalPrice(newTotal);
        } else {
            setTotalPrice(totalPrice);
            alert('Invalid coupon code');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const order = {name, address, phone, email, products: cartItems, totalPrice}

        try {
            const { response, data } = await fetchData(createOrderUrl, 'POST', order);
        
            if (response.ok) {
                setName('');
                setAddress('');
                setPhone('');
                setEmail('');
                setCartItems([]);
                setTotalPrice(0);
                deleteCartItemsFromStorage()
                navigate('/')
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    return (
        <section className="cart">
            <div className="cart__user-info">
                <MapContainer 
                    selectedAddress={selectedAddress} 
                    setIsMapLoaded={setIsMapLoaded}
                    shopCoords={shopCoords}
                    shopName={shopName}/>
                <form id="cart__user-info-form" className="cart__user-info-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Address:</label>
                        {isMapLoaded && <PlacesAutocomplete
                            value={address}
                            onSelect={handleAddressSelect}
                            onChange={(value) => setAddress(value)}
                        />}
                    </div>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </form>
            </div>
            <div className="cart__order">
                <div className="cart__order-items">
                {cartItems.map((item) => (
                    <div className="cart__order-item" key={item._id}>
                        <img src={item.photo}/>
                        <div className="cart__order-item-info">
                        <p>{item.name}</p>
                        <p>Price: ${item.quantity * item.price}</p>
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                        />
                        <button onClick={() => handleRemoveCartItem(item._id)}>Remove</button>
                        </div>
                    </div>
                ))}
                </div>
                <div className="cart__order-checkout">
                    <div>
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                    />
                    <button onClick={applyCoupon}>Apply Coupon</button>
                    </div>
                    <div>
                    <p>Total Price: ${totalPrice}</p>
                    <button className="cart__order-submit" form="cart__user-info-form">Submit</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Cart;