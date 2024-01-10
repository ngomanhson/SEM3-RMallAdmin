import Footer from "./footer";
import Animation from "./animation";
import NavHeader from "./nav-header";
import ChatBox from "./chatbox";
import Header from "./header";
import Sidebar from "./sidebar";

function Layout({ children }) {
    return (
        <div id="main-wrapper">
            <Animation />
            <NavHeader />
            <ChatBox />
            <Header />
            <Sidebar />
            <div className="content-body">
                <div className="container-fluid">
                    <div>{children}</div>
                    {/* <Footer /> */}
                </div>
            </div>
        </div>
    );
}

export default Layout;
