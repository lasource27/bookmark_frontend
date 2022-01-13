import { useState, useEffect } from 'react/cjs/react.development'

const Editbookmark = ({edit_id, bookmark_concerned, update_bookmark, tags, folders}) => {

    const [bookmark_title, setBookmark_title] = useState("")
    const [bookmark_description, setBookmark_description] = useState("")
    const [bookmark_folder, setBookmark_folder] = useState("")
    const [bookmark_tag, setBookmark_tag] = useState("")
    const [tag, setTag] = useState("[]")
    const [folder, setFolder] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        update_bookmark(bookmark_title,bookmark_description,bookmark_folder,bookmark_tag)
        
    }
   
    return (
        <div className="edit_form">
            <p>- Edit Bookmark -</p>
            <form className="row_name_sub" onSubmit={onSubmit}>
                <div className="form_control">
                     <label>Folder</label>
                    <select onChange={(e) => {setFolder(e.target.value)}}>
                        <option value="0" disabled selected hidden>Please select folder</option>
                        {folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                    </select>
                </div>
                <div className="form_control">
                    <label>Tag</label>
                    <select onChange={(e) =>  {setTag(Array.from(e.target.selectedOptions, option => option.value))}} multiple>
                        {tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                    </select>
                </div>
                <div className="form_control">
                    <label>Bookmark Title</label>
                    <input type="text" onChange={(e) => {setBookmark_title(e.target.value)}} className="new_input"/>
                </div>
                <div className="form_control">
                    <label>Bookmark Description</label>
                    <input type="text" value={bookmark_concerned.description} onChange={(e) => {setBookmark_description(e.target.value)}} className="new_input"/>
                </div>
                
                <input type="submit" value="Update Bookmark" className="button_control"/>

                
            </form>
        </div>
    )
}

export default Editbookmark
