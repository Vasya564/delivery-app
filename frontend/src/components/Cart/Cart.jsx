import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    getCartItemsFromStorage, 
    updateCartItemsInStorage, 
    deleteCartItemsFromStorage } from "../../hooks/useCartStorage";
import useFetch from "../../hooks/useFetch";
import MapContainer from "../MapContainer/MapContainer";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";

const Cart = () => {
    const navigate = useNavigate();
    const createOrderUrl = import.meta.env.VITE_API_URL + 'orders/create';
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
        <section>
            <MapContainer 
                selectedAddress={selectedAddress} 
                setIsMapLoaded={setIsMapLoaded}
                shopCoords={shopCoords}
                shopName={shopName}/>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <label>Address:</label>
                    {/* <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /> */}
                    {isMapLoaded && <PlacesAutocomplete
                        value={address}
                        onSelect={handleAddressSelect}
                        onChange={(value) => setAddress(value)}
                    />}
                </div>
                {cartItems.map((item) => (
                    <div key={item._id}>
                        <p>{item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                        />
                        <p>Price: {item.quantity * item.price}</p>
                        <button onClick={() => handleRemoveCartItem(item._id)}>Remove</button>
                    </div>
                ))}
                <button>Submit</button>
            </form>
            
            <p>Total Price: {totalPrice}</p>
        </section>
    );
}
 
export default Cart;