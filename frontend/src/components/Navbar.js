import React, { useState } from 'react';
import { Button, Menu, Layout, Breadcrumb } from 'antd';
import { Input } from 'antd';
import './Navbar.css'
import { Form} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "../App.css"
import { PlusCircleOutlined, FileTextOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { TextArea } = Input;
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
    const onChange = e => {
        console.log('Change:', e.target.value);
      };
    const addNewPage = () => {
        const newList = pages.concat({name: "Page " + count});
        setCount(count+1);
        setPages(newList);
    }
    const showEditor = (e) => {
        //e.key()
        console.log(e);
    }
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const onFinish = values => {
        console.log('Received values of form:', values);
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };
      
    
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
                         
                         <TextArea showCount maxLength={100} style={{ height: 120 }} onChange={onChange} />
                        



                         <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish} style={{ margin: 20 }}>
                    <Form.List
                       name="names"
                        rules={[
                           {
                            validator: async (_, names) => {
                            if (!names || names.length < 2) {
                            return Promise.reject(new Error('At least 2 passengers'));
                           }
                         },
                         },
                       ]}
                    >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Choices' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input Choice or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="" style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Add Choice
              </Button>
              
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

                    </Content>

                </Layout>

            </Layout>
        </Layout>
  );
};

export default Navbar;


