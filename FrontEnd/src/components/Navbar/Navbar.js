import HomePage from "../../pages/HomePage";
import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";

function Navbar() {
    return (<>
        <Header></Header>
        <SideBar></SideBar>
        <HomePage></HomePage>
        <Footer></Footer>
    </>
    )
}

export default Navbar;