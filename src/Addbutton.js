import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Addbutton = ({dropdown_list}) => {
    console.log('hello');
    const [showDropdown, setShowDropdown] = useState(false)
    return (

        <div className="addbutton" >
            <div className="star_button" onClick={() => setShowDropdown(!showDropdown)}>
                <FontAwesomeIcon icon="star" className="link_icons" />
            </div>
            {showDropdown && 
            <form className="dropdown_menu">
                <div className="form_control">
                    <label>URL</label>
                    <input type="text" placeholder="enter page url"/>
                </div>
                <div className="form_control">
                    <label>Title</label>
                    <input type="text" />
                </div>
                <div className="form_control">
                    <label>Folder</label>
                    <input list="folders" name="folders" />
                </div>
                
                <input type="submit" value="Save Bookmark" className="button_control"/>
               
            </form>}
            
            
        </div>
    )
}

export default Addbutton
