import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Menu from "./Menu";
import Footer from "./Footer";
import { useState } from "react";

type Props = {
  children: JSX.Element;
};

function Layout(props: Props) {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <Navbar show={menu} showMenu={setMenu} />
      {menu ? <Sidebar show={menu} showSidebar={setMenu} /> : null}
      <Menu  show={menu} showMenu={setMenu} />
      <Main>{props.children}</Main>
      <Footer />
    </>
  );
}

export default Layout;
