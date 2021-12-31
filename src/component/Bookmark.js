import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react/cjs/react.development'




const Bookmark = ({bookmarks, loader, onDelete, folders, tags, folder_bookmark}) => {
    const reversed_bookmarks = [...bookmarks].reverse()
    
    const rFolders = Object.assign({}, ...(folders.map(item => ({ [item.id]: item.name }) )))
    const rTags = Object.assign({}, ...(tags.map(item => ({ [item.id]: item.name }) )))

    // const fetchBookmark = async(each) => {
    //     console.log("clicked")
    //     await folder_bookmark(each)
    // }

    return (
        <>
            {loader ? 
            <div className="card">
                <div className="normal_card">
                    <div className="preview_image skeleton"></div>
                    <div className="preview_text">
                        <div className="bookmark_title">
                            <div className="skeleton skeleton_text"></div>
                            <div className="skeleton skeleton_text"></div>
                        </div>
                        <div className="preview_description_wrap">
                            <div className="preview_description">
                                <div className="skeleton skeleton_text"></div>
                                <div className="skeleton skeleton_text"></div>
                                <div className="skeleton skeleton_text"></div>
                            </div>
                        </div>
                        <div className="text_footnote">
                            <div className="skeleton skeleton_footnote"></div>
                            <div className="skeleton skeleton_footnote"></div>
                        </div>
                    </div>
                </div>
            </div>
            :
            ""}

            {reversed_bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="card">
                    <div className="hover_card">
                        <div className="hover_content">
                            <a className="hover_icons" href={bookmark.page_url} target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon="book-reader"/>
                            </a>
                            <div className="hover_icons">
                                <FontAwesomeIcon icon="pencil-alt" />
                            </div>
                            <div className="hover_icons" onClick={() => onDelete(bookmark.id)}>
                                <FontAwesomeIcon icon="trash-alt" />
                            </div>
                            <a onClick={()=>console.log("a")}>a</a>
                        </div>
                    </div>
                    <div className="normal_card">
                        <div className="preview_image">
                            <img src={bookmark.preview_image} alt=""></img>
                        </div>

                        <div className="preview_text">
                            <div className="bookmark_title">
                                <h5>{bookmark.title}</h5>
                            </div>
                            <div className="preview_description_wrap">
                                <div className="preview_description">
                                    <p>{bookmark.description}</p>
                                </div>
                            </div>
                        
                            <div className="text_footnote">
                                <div className="bookmark_domain">
                                    <FontAwesomeIcon icon="thumbtack" className="icon_footnote"/>
                                    <p>{bookmark.domain}</p>
                                </div>
                                <div className="date_created">
                                    <FontAwesomeIcon icon="calendar-day" className="icon_footnote"/>
                                    <p>{bookmark.date_created}</p>
                                </div>
                            </div>
                            
                            <div className="folder_and_tag">
                                <div className="folder_name">
                                    {bookmark.folder.map(each => <a className="folder_footnote" onClick={() => console.log("clicked")}>#{rFolders[each]}</a>)}                            
                                </div>
                                <div className="tag_name">
                                    {bookmark.tag.map(each => <span>#{rTags[each]}  </span>)}                        
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            ))}
        </>
    )
}

export default Bookmark
