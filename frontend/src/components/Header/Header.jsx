import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <NavLink to=''>Shop</NavLink>
            <NavLink to='cart'>Shoping Cart</NavLink>
            <NavLink to='history'>History</NavLink>
        </header>
    );
}
 
export default Header;