import { NavLink } from "react-router-dom";
import './Header.scss'

const Header = () => {
    return (
        <header>
            <NavLink to=''>Shop</NavLink>
            <NavLink to='cart'>Shoping Cart</NavLink>
            <NavLink to='history'>History</NavLink>
            <NavLink to='coupon'>Coupons</NavLink>
        </header>
    );
}
 
export default Header;