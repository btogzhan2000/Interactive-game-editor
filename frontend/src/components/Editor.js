import React, {useState, useEffect} from 'react';
import { Button, Menu, Layout} from 'antd';
import { Input, Select } from 'antd';
import './Navbar.css'
import { Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import "../App.css"

const { TextArea } = Input;
const { Option } = Select;

const Editor = ({page, pages}) => {
    const saved = JSON.parse(localStorage.getItem(page.name));
    const [choices, setChoices] = useState(saved? saved:page.choices);

    const [action, setAction] = useState();

    const [form] = Form.useForm();
    form.setFieldsValue(
      {choices: choices}
    );

    const actionList = [
      {
        type: "goToPage",
        variable: ""
      }, 
      {
        type: "incrementVariable",
        variable: ""
      }, 
    ];

    useEffect(() => {
      const saved2 = JSON.parse(localStorage.getItem(page.name));
      setChoices(saved2? saved2:page.choices);
      // form.setFieldsValue(
      //   choices
      // );
      // console.log("field val", form.getFieldsValue(choices))
    }, [page]);

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
        setChoices(values.choices);
        localStorage.setItem(page.name, JSON.stringify(values.choices));
        //localStorage.setItem(page.name, JSON.stringify(choices));
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

    const handleChangeAction = (value) => {
      setAction(value);
      console.log(value);
    }
    console.log("choices", choices)
    console.log("page choices",page.choices)


  return (
            <>    
            
                <TextArea showCount maxLength={100} style={{ height: 120 }} onChange={onChange} 
                placeholder={page.text}/>
                        
                    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} form={form} onFinish={onFinish} style={{ margin: 20 }}>
                      <Form.List
                          name="choices"
                              rules={[
                              {
                                  validator: async (_, choices) => {
                                  if (!choices || choices.length < 2) {
                                  return Promise.reject(new Error('At least 2 choices'));
                              }
                              },
                              },
                          ]}
                          initialValue={choices}
                        >

                        
                        {(fields, { add, remove }, { errors }) => (
                        <>

                            {
                              fields.map((field, index) => (
                                
                              <>
                              {/* {setActions(choices[index].actions)} */}
                              <Form.Item
                                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                  label={index === 0 ? 'Choices' : ''}
                                  required={false}
                                  key={field.name}
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
                                    name={[field.name, "text"]}
                                    key={index}
                                  >
                                    <Input placeholder="" style={{ width: '60%' }} />
                                  </Form.Item>



                                  {
                                    fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                    ) : null
                                  }




                              </Form.Item>

                              <Form.Item>
                              <Form.List
                                name={[field.name, "actions"]}

                                //initialValue={actions}
                              >
                                


                                {(fields2, { add, remove }, { errors }) => (
                                <>
                                    {
                                      fields2.map((field, index) => (
                                      <>
                                      <Form.Item
                                          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                          label={index === 0 ? 'Actions' : ''}
                                          required={false}
                                          key={field.name}
                                      > 
                                        
                                          <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            // rules={[
                                            //     {
                                            //     required: true,
                                            //     whitespace: true,
                                            //     message: "Please input action or delete this field.",
                                            //     },
                                            // ]}
                                            noStyle
                                            //name={[field.name, "action"]}
                                          >
                                        <Form.Item name={[field.name, "type"]}>
                                          <Select style={{ width: '30%' }} onChange={handleChangeAction}>
                                            {
                                              actionList.map((action, index) => (                                
                                                  <Option key={index} value={action.type}>
                                                    {action.type}
                                                  </Option>
                                              ))
                                            }
                                          </Select>
                                          </Form.Item>
                                          <Form.Item name={[field.name, "variable"]}>
                                          <Input placeholder="" style={{ width: '30%' }}></Input>
                                          </Form.Item>
                                      
                                          </Form.Item>

                                          {
                                            fields2.length >= 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                            ) : null
                                          }

                                      </Form.Item>
                                      
                                <br></br>
                                      </>
                                      
                                    ))}
                                    <Form.Item>
                                      <Button
                                          type="dashed"
                                          onClick={() => add()}
                                          style={{ width: '60%' }}
                                          icon={<PlusOutlined />}
                                      >
                                          Add Action
                                      </Button>
                                      
                                      <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                                )}


                              </Form.List>
                              </Form.Item>
                                                        
                              <br></br>
                              </>
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


