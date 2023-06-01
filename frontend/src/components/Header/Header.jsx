import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <NavLink to=''>Shop</NavLink>
            <NavLink to='cart'>Shoping Cart</NavLink>
        </header>
    );
}
 
export default Header;