import React, { useState, useEffect } from 'react';
import { Button, Menu, Layout, Breadcrumb } from 'antd';
import Editor from './Editor';
import StoryInfoEditor from './StoryInfoEditor';
import './Navbar.css'
import "antd/dist/antd.css";
import "../App.css"
import { PlusCircleOutlined, FileTextOutlined, FileOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content, Sider } = Layout;


const Navbar = () => {

    const [storyData, setStoryData] = useState(JSON.parse(localStorage.getItem("story_data")));
    const [storyFull, setStoryFull] = useState();
    const [storyName, setStoryName] = useState(JSON.parse(localStorage.getItem("story_name")));
    const [editedPages, setEditedPages] = useState([]);

    const [pages, setPages] = useState([
          {
            name: "Page 1",
            text: "First page text",
            choices: [
              {
                text: "Choice me",
                actions: [ 
                  {
                    type: "incrementVariable",
                    variable: "clickCounter"
                  },
                  {
                    type: "goToPage",
                    variable: "First page"
                  }
                  
                ]
              },
              {
                text: "Choice me too",
                actions: [

                ]
              },
              {
                text: "and me too",
                actions: [

                ]
              }
              
            ]      
          },
          {
            name: "Page 2",
            text: "Second page text",
            choices: [
              {
                text: "Choice me",
                actions: [ 
                  {
                    type: "incrementVariable",
                    variable: "clickCounter"
                  },
                  {
                    type: "goToPage",
                    variable: "First page"
                  }
                  
                ]
              }  
            ]      
        }
    ]);
    const [story, setStory] = useState(
      {
        name: "Demo story",
        author: "Demo author",
        description: "Demo description",
        pages: pages
      }
    )
    const [count, setCount] = useState(3);
    const [editor, setEditor] = useState(
      <StoryInfoEditor 
        story={story}
      />
    );
    
    const addNewPage = () => {
        const newList = pages.concat({name: "Page " + count, story: {text:"", choices:[]}});
        setCount(count+1);
        setPages(newList);
        setStory({
          name: "Demo story",
          author: "Demo author",
          description: "Demo description",
          pages: pages
        });
    }
    //console.log(story)

    const createPagesArray = () => {
      let newEditedPages = [];
      for (let i = 0; i != pages.length; i++) {
        let page_data = JSON.parse(localStorage.getItem(pages[i].name));
  
        if (page_data) {
          newEditedPages.push({ text: pages[i].text, choices: page_data });
        } else {
          newEditedPages.push({ text: pages[i].text, choices: pages[i].choices });
        }
      }
      setEditedPages(newEditedPages);
    };

    useEffect(() => console.log("edited pages", editedPages), [editedPages])


    const showEditor = (page) => {

      setEditor(
        <Editor 
          page = {page}
          pages= {pages}
        />
      );

    }
    const showStoryEditor = () => {

      setEditor(
        <StoryInfoEditor 
          story={story}
        />
      );

    }
    useEffect(() => {console.log("full", storyFull); 
      //setStoryData(JSON.parse(localStorage.getItem("story_data")))
      //setStoryFull(storyFull);
      // setStoryFull({
      //   name: storyName,
      //   story: storyData
      // })
      
    }, [storyFull])
    const saveStory = (val) => {
      createPagesArray();

      const storyName = JSON.parse(localStorage.getItem("story_name"))
      const storyData2 = JSON.parse(localStorage.getItem("story_data"))
      setStoryData(storyData2)
      setStoryData(storyData => ({...storyData, pages: editedPages}));
      //localStorage.setItem("story_data", JSON.stringify(storyData));

      setStoryName(storyName)
      
      setStoryFull({
        name: storyName,
        story: storyData
      })

      
      
      //const storyName = JSON.parse(localStorage.getItem("story_name"));
      // setStoryName(JSON.parse(localStorage.getItem("story_name")))
      // setStoryData(JSON.parse(localStorage.getItem("story_data")));
      // //console.log(storyData)
      // setStoryData(storyData => ({ ...storyData, pages: pages }))
      //console.log(storyData)
      // console.log("name", storyName)
      // console.log("data", storyData)
      // setStoryFull({
      //   name: storyName,
      //   story: storyData
      // })

      // console.log("name", storyName)
      // console.log("data", storyData)
      // // console.log(storyName)
      // console.log("full", storyFull);
      
      // axios.post(`https://storys.digital-tm.kz/story/save`, storyFull )
      //   .then(res => {
      //     console.log(res);
      //     console.log(res.data);
      //   })

      
    }

    const getStory = () => {
      // axios.get(`https://storys.digital-tm.kz/story/get?id=1`)
      //   .then(res => {
      //     const persons = res.data;
      //     console.log(persons);
      //   })

      axios.get(`https://storys.digital-tm.kz/story/get?id=1`)
      .then(res => {
        const persons = res.data;
        console.log(persons);
        set
      })
    }
    getStory()

  return (
      
          <Layout>

            <Header className="header">
                <div className="logo" />
                <h1 style={{color: "white", textAlign:"center"}}>WEB EDITOR INTERFACE</h1>
                
            </Header>

            <Layout>
              

                <Sider width={256} style={{padding: 10}} className="site-layout-background">
                    <Menu
                        theme={'light'}
                        //onClick={handleClick}
                        style={{ padding: 10 }}
                        defaultOpenKeys={['1']}
                        defaultSelectedKeys={['1']}
                        mode="inline"
                    >
                    <Menu.Item key={"storyinfo"} onClick={() => showStoryEditor()}>
                        <FileOutlined/> {"EDIT STORY INFO"}
                    </Menu.Item>


                    <Button type="primary" onClick={addNewPage} >
                        <PlusCircleOutlined /> Add new page
                    </Button>

                    
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
                <Button 
                type="primary" 
                style={{position: 'absolute', right: '150px', top: '20px', width: '100px'}}
                onClick={val => saveStory(val)}
                >
                  Save
                </Button>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>EDITOR</Breadcrumb.Item>

                    </Breadcrumb>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: '81vh',
                        }}
                    >
                      {editor}
                         
        
                    </Content>

                </Layout>

            </Layout>
        </Layout>
  );
};

export default Navbar;


