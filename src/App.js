import { useState, useEffect } from "react"
import Folder from './Folder'
import Tag from './Tag'
import Bookmark from './Bookmark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisH, faBookmark, faFolder, faTags, faUser, faFolderOpen, faAngleDoubleDown, faAngleDoubleUp, faHashtag, faUserTag, faThumbtack, faCalendarDay, faPencilAlt, faBookReader, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faFolder as faFolderRegular} from '@fortawesome/free-regular-svg-icons'

library.add(faEllipsisH, faBookmark, faFolder, faTags, faUser, faFolderOpen, faAngleDoubleDown, faAngleDoubleUp, faFolderRegular, faHashtag, faUserTag, faThumbtack, faCalendarDay, faPencilAlt, faBookReader, faTrashAlt)


const App = () => {

  const [folders, setFolders] = useState([])
  const [tags, setTags] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [showFolders, setShowFolders] = useState(false)
  const [showTags, setShowTags] = useState(false)
  const [titleBar, setTitleBar] = useState('All Bookmarks')
  const [folderIcon, setFolderIcon] = useState(false)
  const [tagIcon, setTagIcon] = useState(false)
  const [allbookmarkIcon, setAllbookmarkIcon] = useState(true)
  // false not 'false'???

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
    const res = await fetch('http://127.0.0.1:8000/backend/folder-list')
    console.log(res)
    const data = await res.json()
    return data
  }

  const fetchTags = async () => {
    const res = await fetch('http://127.0.0.1:8000/backend/tag-list')
    console.log(res)
    const data = await res.json()
    return data
  }

  const fetchBookmarks = async () => {
    const res = await fetch('http://127.0.0.1:8000/backend/bookmark-list')
    const data = await res.json()
    
    return data
  }

  const folderToggle = () => {
    setShowFolders(!showFolders)
  }

  const tagToggle = () => {
    setShowTags(!showTags)
  }

  const folder_bookmark = async (id) => {
    
    const res = await fetch(`http://127.0.0.1:8000/backend/folder-detail/${id}`)
    const data = await res.json()
    const all_bookmarks = await fetchBookmarks()
    setBookmarks(all_bookmarks.filter(bookmark => data.bookmark.includes(bookmark.id)))
    setTitleBar(data.name)
    setFolderIcon(true)
    setTagIcon(false)
    setAllbookmarkIcon(false)
    
    
  }

  const tag_bookmark = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/backend/tag-detail/${id}`)
    const data = await res.json()
    const all_bookmarks = await fetchBookmarks()
    setBookmarks(all_bookmarks.filter(bookmark => data.bookmark.includes(bookmark.id)))
    setTitleBar(data.name)
    setFolderIcon(false)
    setTagIcon(true)
    setAllbookmarkIcon(false)
    

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
    const res = await fetch(`http://127.0.0.1:8000/backend/bookmark-delete/${id}`, {
      method: 'DELETE',
     })
    
    const bookmarksFromServer = async () => {
      const bookmarks = await fetchBookmarks()
      setBookmarks(bookmarks)
    };
    bookmarksFromServer();

    
  }

    console.log(folderIcon,tagIcon,allbookmarkIcon)
    return (
    <div className="container">
      <div className="navigation">
        <div className="userHeader">
          <div className="userName">
              <div className="link-control">              
                <FontAwesomeIcon icon={["fas", "user"]} className="decor-icons"/>
                <h5>freesia</h5>               
              </div>
          </div>

          <div className="headerEllipsis">
            <div className="link-control">
              <FontAwesomeIcon icon={["fas", "ellipsis-h"]} className="link-icons"/>
            </div>
          </div>
        </div>
        
        <div className="all_bookmarks" >
          <div className="row-control" onClick={show_all_bookmarks}>
            <div className="row-name">
              <FontAwesomeIcon icon="bookmark" className="decor-icons"/>
              <h5>All bookmarks</h5>
            </div>
            
          </div>
          
        </div>
        <div className="folders">
          <div className="row-wrap" onClick={folderToggle}>
            <div className="row-control">
              <div className="row-name">
                {showFolders ? <FontAwesomeIcon icon={["fas", "folder-open"]} className="decor-icons"/> : <FontAwesomeIcon icon={["fas", "folder"]} className="decor-icons"/>}
                <h5>Folders</h5>
              </div>
              <div className="icon-right">
                <div className="link-control">
                  {showFolders ? <FontAwesomeIcon icon={["fas", "angle-double-up"]} className="link-icons"/> : <FontAwesomeIcon icon={["fas", "angle-double-down"]} className="link-icons"/>}
                </div>
              </div>
            </div>
          </div>
          {showFolders ? <Folder folders={folders} folder_bookmark={folder_bookmark}/> : ""}
        </div>
        
        <div className="tags">
          <div className="row-wrap" onClick={tagToggle}>
            <div className="row-control">
              <div className="row-name">
                {showTags ? <FontAwesomeIcon icon={["fas", "user-tag"]} className="decor-icons"/> : <FontAwesomeIcon icon={["fas", "tags"]} className="decor-icons"/>}
                <h5>Tags</h5>
              </div>
              <div className="icon-right">
                <div className="link-control">
                  {showTags ? <FontAwesomeIcon icon={["fas", "angle-double-up"]} className="link-icons"/> : <FontAwesomeIcon icon={["fas", "angle-double-down"]} className="link-icons"/>}
                </div>
              </div>
            </div>
          </div>
          {showTags ? <Tag tags={tags} tag_bookmark={tag_bookmark}/> : ""}
        </div>        
      </div>

      <div className="showcase">
        <div className="searchBar">
        </div>
        <div className="main">
          <div className="titleBar">
            {allbookmarkIcon ? <FontAwesomeIcon icon="bookmark" className="decor-icons"/> : folderIcon ? <FontAwesomeIcon icon={["far", "folder"]} className="decor-icons"/> : <FontAwesomeIcon icon={["fas", "hashtag"]} className="decor-icons"/>}<h2>{titleBar}</h2>
          </div>
          <div className="bookmarkArea">
            <Bookmark bookmarks={bookmarks} onDelete={onDelete}/>
          </div>
        </div>
      </div>
    </div>
  )
}



export default App

