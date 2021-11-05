import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Addbutton = ({dropdown_list}) => {
   
    const [showDropdown, setShowDropdown] = useState(false)
    const [page_url, setPage_url] = useState("")
  
    const add_task = async (e) => {
        e.preventDefault()

        // fetch(`http://127.0.0.1:8000/backend/bookmark-create/?page_url=${page_url}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
        // }).then(x => x.json()).then(json => {
        //     console.log(json);
        // })

        const res = await fetch('http://127.0.0.1:8000/backend/bookmark-create/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(page_url)
        })
        
        const data = await res.json()

        console.log(data)
    }
    

    return (

        <div className="addbutton" >
            <div className="star_button" onClick={() => setShowDropdown(!showDropdown)}>
                <FontAwesomeIcon icon="star" className="link_icons" />
            </div>
            {showDropdown && 
            <form className="dropdown_menu" onSubmit={add_task}>
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
