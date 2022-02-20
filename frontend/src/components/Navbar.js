import React, { useState } from 'react';
import { Button, Menu, Layout, Breadcrumb } from 'antd';
import Editor from './Editor';
import './Navbar.css'
import "antd/dist/antd.css";
import "../App.css"
import { PlusCircleOutlined, FileTextOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;

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
        },
        {
            name: "Page 3",
            story: {
                text: "Sample text 3",
                choices: []
            }
        },
        {
            name: "Page 4",
            story: {
                text: "Sample text 4",
                choices: []
            }
        }
    ]);
    const [count, setCount] = useState(5);
    
    const addNewPage = () => {
        const newList = pages.concat({name: "Page " + count});
        setCount(count+1);
        setPages(newList);
    }

    const showEditor = (e) => {
        //e.key()
        console.log(e);
    }
    
    let editor = (
        <div>
            <h1>PAGE NAME</h1>
            <h1>PAGE NAME</h1>
        </div>
    )
  return (
      
          <Layout>

            <Header className="header">
                <div className="logo" />
                <h1 style={{color: "white", textAlign:"center"}}>WEB EDITOR INTERFACE</h1>
            </Header>

            <Layout>

                <Sider width={256} style={{padding: 10}} className="site-layout-background">
                    <Button type="primary" onClick={addNewPage} >
                        <PlusCircleOutlined /> Add new page
                    </Button>

                    <Menu
                        theme={'light'}
                        //onClick={handleClick}
                        style={{ padding: 10 }}
                        defaultOpenKeys={['1']}
                        defaultSelectedKeys={['1']}
                        mode="inline"
                    >
                        {
                            pages.map((page) => (
                                <Menu.Item key={page.name} onClick={() => showEditor(page)}>
                                    <FileTextOutlined/> {page.name} 
                                </Menu.Item>
                            ))
                        }
                    </Menu> 
                </Sider>

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Page name</Breadcrumb.Item>
                    </Breadcrumb>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: '81vh',
                        }}
                    >
                         <Editor />
        
                    </Content>

                </Layout>

            </Layout>
        </Layout>
  );
};

export default Navbar;


