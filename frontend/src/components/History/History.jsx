import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const History = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    const getOrdersUrl = import.meta.env.VITE_API_URL + 'orders'
    const { data: orders, fetchData } = useFetch()
    useEffect(() => {
        fetchData(getOrdersUrl)
        setFilteredOrders(fetchData(getOrdersUrl))
    }, []);

    const filterOrders = () => {
        if (!orders) {
            return;
        }
        const filtered = orders.filter(order => {
        return (
            order.email.toLowerCase().includes(email.toLowerCase()) ||
            order.phone.includes(phone)
        );
        });
        if(email || phone){
        setFilteredOrders(filtered);
        }
        else{
            setFilteredOrders([]);
        }
    };

    return (
        <div>
        <h1>Order History</h1>

        <div>
            <label htmlFor="email">Email:</label>
            <input
            type="text"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="phone">Phone:</label>
            <input
            type="text"
            id="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            />
            <button onClick={filterOrders}>Filter</button>
        </div>

        <ul>
            {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
                <li key={order._id}>
                <p>Email: {order.email}</p>
                <p>Total price: {order.totalPrice}</p>
                </li>
            ))
            ) : (
            <li>No orders found.</li>
            )}
        </ul>
        </div>
  );
};

export default History;