import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import './History.scss'

const History = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    const getOrdersUrl = import.meta.env.VITE_API_URL + 'orders'
    const { data: orders, fetchData } = useFetch()
    useEffect(() => {
        fetchData(getOrdersUrl)
    }, []);

    const filterOrders = () => {
        if (!orders) {
            return;
        }
        const filtered = orders.filter(order => {
            console.log(email)
            if (order.email === email || order.phone === phone) {
                return order;
            }
            else{
                return
            }
        });
        if(email || phone){
            setFilteredOrders(filtered);
        }
        else{
            setFilteredOrders([]);
        }
    };

    return (
        <section>
        <section className='history-request'>
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <p>OR</p>
            <label htmlFor="phone">Phone:</label>
            <input
                type="text"
                id="phone"
                placeholder="Enter phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />
            <button onClick={filterOrders}>Search</button>
        </section>
        <section className='history-result'>
            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                <div className='history-order' key={order._id}>
                    <div className='history-products'>
                    {order.products.map((product) => (
                        <div className='history-product' key={product._id}>
                            <img src={product.photo}/>
                            <div>
                                <p>Product: {product.name}</p>
                                <p>Price: {product.price}</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <p className='history-products--total'>Total price: {order.totalPrice}</p>
                    </div>
                </div>
                ))
            ) : (
                <li>No orders found.</li>
            )}
        </section>
        </section>
  );
};

export default History;