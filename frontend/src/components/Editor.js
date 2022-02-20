import React from 'react';
import { Button, Menu, Layout} from 'antd';
import { Input } from 'antd';
import './Navbar.css'
import { Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "../App.css"

const { TextArea } = Input;

const Editor = () => {
    
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
      const onChange = e => {
        console.log('Change:', e.target.value);
    };
      

  return (
            <>    
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

        </>
  );
};

export default Editor;


