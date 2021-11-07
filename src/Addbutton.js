import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Addbutton = ({dropdown_list, add_task}) => {
   
    const [showDropdown, setShowDropdown] = useState(false)
    const [page_url, setPage_url] = useState("")
  
    const onSubmit = (e) => {
        e.preventDefault()
        add_task(page_url)
    }
    
    return (

        <div className="addbutton" >
            <div className="star_button" onClick={() => setShowDropdown(!showDropdown)}>
                <FontAwesomeIcon icon="star" className="link_icons" />
            </div>
            {showDropdown && 
            <form className="dropdown_menu" onSubmit={onSubmit}>
                <div className="form_control">
                    <label>URL</label>
                    <input type="text" value={page_url} onChange={(e) => {setPage_url(e.target.value)}} placeholder="enter page url"/>
                </div>
                {/* <div className="form_control">
                    <label>Title</label>
                    <input type="text" placeholder="leave blank for default title"/>
                </div> */}
                {/* <div className="form_control">
                    <label>Folder</label>
                    <input list="folders" name="folders" />
                </div> */}
                
                <input type="submit" value="Save Bookmark" className="button_control"/>
               
            </form>}
            
            
        </div>
    )
}

export default Addbutton
