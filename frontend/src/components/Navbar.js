import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import "antd/dist/antd.css";

const { SubMenu } = Menu;

const Navbar = () => {
    const [pages, setPages] = useState([
        {
            name: "Page 1",
            story: {
                text: "Sample text",
                choices: ["apple", "orange"]
            }
        },
        {
            name: "Page 2",
            story: {
                text: "Sample text 2",
                choices: ["iphone", "samsung"]
            }
        }
    ]);
    const [count, setCount] = useState(3);

    const addNewPage = (e) => {
        const newList = pages.concat({name: "Page " + count});
        setCount(count+1);
        setPages(newList);
    }
  return (
    <div style={{padding: 20}}>
        <Button type="primary" onClick={addNewPage} >Add new page</Button>
        <Menu
          theme={'light'}
          //onClick={handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={['1']}
          defaultSelectedKeys={['1']}
          mode="inline"
        >
            {
                pages.map((page) => (
                    <Menu.Item key={page.name}>
                         {page.name} 
                    </Menu.Item>
                ))
            }
        </Menu>   
    </div>
  );
};

export default Navbar;