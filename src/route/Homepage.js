import React from 'react'
import { useState, useEffect, useContext } from "react"
import { Link } from 'react-router-dom'
import Folder from '../component/Folder'
import Tag from '../component/Tag'
import Bookmark from '../component/Bookmark'
import Searchbar from "../component/Searchbar"
import Addbutton from "../component/Addbutton"
import Sortbutton from "../component/Sortbutton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisH, faBookmark, faFolder, faTags, faUser, faFolderOpen, faAngleDoubleDown, faAngleDoubleUp, faHashtag, faUserTag, faThumbtack, faCalendarDay, faPencilAlt, faBookReader, faTrashAlt, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { faFolder as faFolderRegular} from '@fortawesome/free-regular-svg-icons'
// import { useContext } from 'react/cjs/react.development'
import AuthContext from '../context/AuthContext'




library.add(faEllipsisH, faBookmark, faFolder, faTags, faUser, faFolderOpen, faAngleDoubleDown, faAngleDoubleUp, faFolderRegular, faHashtag, faUserTag, faThumbtack, faCalendarDay, faPencilAlt, faBookReader, faTrashAlt, faSearch, faStar)


const Homepage = () => {
    const [folders, setFolders] = useState([])
    const [tags, setTags] = useState([])
    const [bookmarks, setBookmarks] = useState([])
    const [showFolders, setShowFolders] = useState(false)
    const [showTags, setShowTags] = useState(false)
    const [titleBar, setTitleBar] = useState('All Bookmarks')
    const [folderIcon, setFolderIcon] = useState(false)
    const [tagIcon, setTagIcon] = useState(false)
    const [allbookmarkIcon, setAllbookmarkIcon] = useState(true)
    const [loader, setLoader] = useState(false)
    const [addbutton_submit, setAddbutton_submit] = useState(false)
  
    const [showDropdown, setShowDropdown] = useState(false)
    
    const {user} = useContext(AuthContext)
    const {authTokens, logoutUser} = useContext(AuthContext)
    
    // false not 'false'
    
  
    useEffect(() => {
      const foldersFromServer = async () => {
        const folders = await fetchFolders()
        setFolders(folders)
      };
      foldersFromServer();
  
  
      const tagsFromServer = async () => {
        const tags = await fetchTags()
        setTags(tags)
      };
      tagsFromServer();
  
      const bookmarksFromServer = async () => {
        const bookmarks = await fetchBookmarks()
        setBookmarks(bookmarks)
      };
      bookmarksFromServer();
      
    }, [])
  
    const fetchFolders = async () => {
      const res = await fetch('http://127.0.0.1:8000/backend/folder-list',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      const data = await res.json()
      if (res.status === 200){
        return data
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }

    }
  
    const fetchTags = async () => {
      const res = await fetch('http://127.0.0.1:8000/backend/tag-list',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      const data = await res.json()
      if (res.status === 200){
        return data
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }
    }
  
    const fetchBookmarks = async () => {
      const res = await fetch('http://127.0.0.1:8000/backend/bookmark-list',{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      const data = await res.json()
      if (res.status === 200){
        return data
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }
     
      
      
    }
  
    const folderToggle = () => {
      setShowFolders(!showFolders)
    }
  
    const tagToggle = () => {
      setShowTags(!showTags)
    }
  
    const folder_bookmark = async (id) => {
      const res = await fetch(`http://127.0.0.1:8000/backend/folder-detail/${id}`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      const data = await res.json()
      if (res.status === 200){
        const all_bookmarks = await fetchBookmarks()
        console.log("all_bookmarks:", all_bookmarks, "data:", data["bookmarks"])
        setBookmarks(all_bookmarks.filter(bookmark => data["bookmarks"].includes(bookmark.id)))
        
        setTitleBar(data["folder_name"])
        setFolderIcon(true)
        setTagIcon(false)
        setAllbookmarkIcon(false)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }     
    }
  
    const tag_bookmark = async (id) => {
      const res = await fetch(`http://127.0.0.1:8000/backend/tag-detail/${id}`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        }
      })
      
      const data = await res.json()
      if (res.status === 200){
        const all_bookmarks = await fetchBookmarks()
        setBookmarks(all_bookmarks.filter(bookmark => data["bookmarks"].includes(bookmark.id)))
        setTitleBar(data["tag_name"])
        setFolderIcon(false)
        setTagIcon(true)
        setAllbookmarkIcon(false)
      }else if(res.statusText === 'Unauthorized'){
        logoutUser()
      }
        
  
    }
  
    const show_all_bookmarks = async () => {
      const bookmarks = await fetchBookmarks()
      setBookmarks(bookmarks)
      setTitleBar('All Bookmarks')
      setFolderIcon(false)
      setTagIcon(false)
      setAllbookmarkIcon(true)
    }
  
    const onDelete = async (id) => {
      await fetch(`http://127.0.0.1:8000/backend/bookmark-delete/${id}`, {
        method: 'DELETE',
       })
      
      const bookmarksFromServer = async () => {
        const bookmarks = await fetchBookmarks()
        setBookmarks(bookmarks)
      };
      bookmarksFromServer();
    }
  
    const search_bookmark = async (search_input) => {
      const all_bookmarks = await fetchBookmarks()
      setBookmarks(all_bookmarks.filter((bookmark) => bookmark.title.toLowerCase().includes(search_input.toLowerCase())))
      
    }
  
    const add_task = async (page_url,folder,tag) => {
        // fetch(`http://127.0.0.1:8000/backend/bookmark-create/?page_url=${page_url}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
        // }).then(x => x.json()).then(json => {
        //     console.log(json);
        // })
        setAddbutton_submit(true)
        setLoader(true)

        const res = await fetch('http://127.0.0.1:8000/backend/bookmark-create/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({'page_url':page_url,'folder':folder,'tag':tag})
        })
       
  
        const data = await res.json()
        
        console.log(data,res.status)

        if (res.status === 200){
          const bookmarks = await fetchBookmarks()
          setBookmarks(bookmarks)
          setAddbutton_submit(false)
          setLoader(false)
          setShowDropdown(false)
        }else if(res.statusText === 'Unauthorized'){
          logoutUser()
        }
  
        
        
        
    }
  
      const handle_hidedropdown = () => {
        setShowDropdown(false)
      }
      
  
      const  toggle_showdropdown = () => {
        
        setShowDropdown(!showDropdown)
        // toggle action is passed up from addbutton component to APP component, and showDropdown state is passed down from APP to addbutton
      }
       
      
  
    return (
        <div className="container">
            {/* ---NAVIGATION--- */}
            <section className="navigation">
                {/* userheader */}
                <div className="userHeader">
                    <div className="userName">
                        <div className="link_control">              
                            <FontAwesomeIcon icon={["fas", "user"]} className="decor_icons"/>
                            <Link to="/login" style={{ textDecoration: 'none', color: "rgb(54, 53, 53)"}}>Hi, {user.username}</Link>
                                        
                        </div>
                    </div>
                    <div className="headerEllipsis">
                        <div className="link_control">
                        <FontAwesomeIcon icon={["fas", "ellipsis-h"]} className="link_icons"/>
                        </div>
                    </div>
                </div>
                {/* all_bookmarks */}
                <div className="all_bookmarks" >
                    <div className="row_control" onClick={show_all_bookmarks}>
                        <div className="row_name">
                            <FontAwesomeIcon icon="bookmark" className="decor_icons"/>
                            <h5>All bookmarks</h5>
                        </div> 
                    </div>        
                </div>
                {/* folders */}
                <div className="folders">
                    <div className="row_wrap" onClick={folderToggle}>
                        <div className="row_control">
                            <div className="row_name">
                                {showFolders ? <FontAwesomeIcon icon={["fas", "folder-open"]} className="decor_icons"/> : <FontAwesomeIcon icon={["fas", "folder"]} className="decor_icons"/>}
                                <h5>Folders</h5>
                            </div>
                            <div className="icon_right">
                                <div className="link_control">
                                    {showFolders ? <FontAwesomeIcon icon={["fas", "angle-double-up"]} className="link_icons"/> : <FontAwesomeIcon icon={["fas", "angle-double-down"]} className="link_icons"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {showFolders ? <Folder folders={folders} folder_bookmark={folder_bookmark}/> : ""}
                </div>
                {/* tags */}
                <div className="tags">
                    <div className="row_wrap" onClick={tagToggle}>
                        <div className="row_control">
                            <div className="row_name">
                                {showTags ? <FontAwesomeIcon icon={["fas", "user-tag"]} className="decor_icons"/> : <FontAwesomeIcon icon={["fas", "tags"]} className="decor_icons"/>}
                                <h5>Tags</h5>
                            </div>
                            <div className="icon_right">
                                <div className="link_control">
                                    {showTags ? <FontAwesomeIcon icon={["fas", "angle-double-up"]} className="link_icons"/> : <FontAwesomeIcon icon={["fas", "angle-double-down"]} className="link_icons"/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {showTags ? <Tag tags={tags} tag_bookmark={tag_bookmark}/> : ""}
                </div>        
            </section>

            {/* ---SHOWCASE--- */}
            <section className="showcase">
                {/* functionbar */}
                <div className="function_bar">
                    <Searchbar search_bookmark={search_bookmark} />
                    <div className="function_button">
                        <Addbutton folders={folders} tags={tags} add_task={add_task} addbutton_submit={addbutton_submit} showDropdown={showDropdown} toggle_showdropdown={toggle_showdropdown} handle_hidedropdown={handle_hidedropdown}/>
                        <Sortbutton />
                    </div>
                </div>
                {/* main */}
                <div className="main">
                    <div className="title_bar">
                        {allbookmarkIcon ? <FontAwesomeIcon icon="bookmark" className="decor_icons"/> : folderIcon ? <FontAwesomeIcon icon={["far", "folder"]} className="decor_icons"/> : <FontAwesomeIcon icon={["fas", "hashtag"]} className="decor_icons"/>}<h2>{titleBar}</h2>
                    </div>
                    <div className="bookmark_area">
                        <Bookmark bookmarks={bookmarks} loader={loader} onDelete={onDelete}/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Homepage
