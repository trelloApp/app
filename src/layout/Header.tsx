import { Button, Drawer, Menu } from "antd";
import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import "./menu.css";
import { MenuOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <nav className="menuBar">
        <div className="logo">
          <a href="www.marca.com">logo</a>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>

          <Button
            className="barsMenu"
            type="primary"
            onClick={() => setMenu(true)}
          >
            <MenuOutlined className="menu_icon" />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="left"
            closable={false}
            onClose={() => setMenu(false)}
            visible={menu}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </div>
      </nav>
    </>
  );
};

export default Header;
