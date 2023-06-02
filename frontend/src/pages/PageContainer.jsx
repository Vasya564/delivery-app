import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import './PageContainer.scss'

const PageContainer = () => {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    );
}
 
export default PageContainer;