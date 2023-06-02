import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import './Coupon.scss'

const Coupon = () => {
    const [copy, setCopy] = useState('');
    const getCouponsUrl = import.meta.env.VITE_API_URL + 'coupons'
    const { data: coupons, fetchData } = useFetch()
    useEffect(() => {
        fetchData(getCouponsUrl)
    }, []);

    const copyCouponCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopy(code)
    };

    return (
        <section className='coupons'>
        {coupons && coupons.map((coupon, index) => (
            <div key={index} className="coupon-card">
                <h2>{coupon.name} - {coupon.percentage}%</h2>
                <p>Coupon Code: {coupon.code}</p>
                <button disabled={copy === coupon.code} onClick={() => copyCouponCode(coupon.code)}>{copy === coupon.code ? "Copied" : "Copy Code"}</button>
            </div>
        ))}
        </section>
    );
};

export default Coupon;