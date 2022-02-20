import React from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import './Navbar.css'
import { Form } from 'antd';
import "antd/dist/antd.css";
import "../App.css"

const { TextArea } = Input;

const StoryInfoEditor = ({story}) => {
    
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

      const onChange = e => {
        console.log('Change:', e.target.value);
        
    };

  return (
            <>    
                
                        
                <Form name="dynamic_form_item" {...formItemLayout} onFinish={onFinish} style={{ margin: 20 }}>

                  <Form.Item>
                    {"Name"} 
                    <Input placeholder={story.name}  />
                  </Form.Item>
                  <Form.Item>
                    {"Author"} 
                    <Input placeholder={story.author}   />
                  </Form.Item>
                  <Form.Item>
                    {"Description"} 
                    <TextArea showCount maxLength={100} style={{ height: 120 }} onChange={onChange} 
                    value={story.description}/>
                  </Form.Item>

                  <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                  </Form.Item>

                </Form>

        </>
  );
};

export default StoryInfoEditor;


