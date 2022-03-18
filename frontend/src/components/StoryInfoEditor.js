import React, { useState } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import './Navbar.css'
import { Form } from 'antd';
import "antd/dist/antd.css";
import "../App.css"

const { TextArea } = Input;

const StoryInfoEditor = ({story}) => {
    
    
    const saved = JSON.parse(localStorage.getItem("story_data"));
    

    const [name, setName] = useState(saved ? saved.name : story.name);
    const [author, setAuthor] = useState(saved ? saved.author : story.author);
    const [description, setDescription] = useState(saved ? saved.description : story.description);


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
        //console.log('Received values of form:', values);
        localStorage.setItem("story_data", JSON.stringify({
          name: name,
          author: author,
          description: description
        }
        ));
        localStorage.setItem("story_name", JSON.stringify(name));

      };

      const onChangeName = (e) => {
        //console.log('Change:', e.target.value);
        setName(e.target.value);
      };
      const onChangeAuthor = (e) => {
        //console.log('Change:', e.target.value);
        setAuthor(e.target.value);
      };
      const onChangeDescription = (e) => {
        //console.log('Change:', e.target.value);
        setDescription(e.target.value);
      };

  return (
            <>    
                
                        
                <Form name="dynamic_form_item"  {...formItemLayout} onFinish={vals => onFinish(vals)} style={{ margin: 20 }}>

                  <Form.Item>
                    {"Name"} 
                    <Input value={name} onChange={e => onChangeName(e)} />
                  </Form.Item>
                  <Form.Item>
                    {"Author"} 
                    <Input value={author}   onChange={e => onChangeAuthor(e)} />
                  </Form.Item>
                  <Form.Item>
                    {"Description"} 
                    <TextArea showCount maxLength={100} style={{ height: 120 }} 
                    value={description} onChange={e => onChangeDescription(e)}/>
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


