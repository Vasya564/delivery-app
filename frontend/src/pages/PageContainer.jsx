import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const PageContainer = () => {
    return (
        <main>
            <Header />
            <Outlet />
        </main>
    );
}
 
export default PageContainer;