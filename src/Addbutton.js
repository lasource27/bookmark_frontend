import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Addbutton = ({dropdown_list, add_task, addbutton_submit, showDropdown, handle_hidedropdown, toggle_showdropdown}) => {
   
    
    const [page_url, setPage_url] = useState("")
    
    let menuRef = useRef()

    const refListener = (event) => {
        console.log(showDropdown,"event handler called")
        if (showDropdown && !menuRef.current.contains(event.target)) {
            handle_hidedropdown()
        }
    }

    useEffect(() => {
            document.addEventListener("mousedown", refListener);

            return () => {
            document.removeEventListener("mousedown", refListener);
        } 

    }, [showDropdown])
  
    const onSubmit = async (e) => {
        e.preventDefault()
        await add_task(page_url)
        // wait until the task has been added to clear the "page_url"
        setPage_url("")
    }

    
    return (

        <div ref={menuRef} className="addbutton" >
            <div className="star_button" onClick={() => toggle_showdropdown()}>
                <FontAwesomeIcon icon="star" className="link_icons" />
            </div>
            {showDropdown &&
                <form  className="dropdown_menu" onSubmit={onSubmit}>
                    <div className="form_control">
                        <label>URL</label>
                        <input type="text" value={page_url} onChange={(e) => {setPage_url(e.target.value)}} placeholder="enter page url" className={addbutton_submit ? "inactive_input" : ""}/>
                    </div>
                    {/* <div className="form_control">
                        <label>Title</label>
                        <input type="text" placeholder="leave blank for default title"/>
                    </div> */}
                    {/* <div className="form_control">
                        <label>Folder</label>
                        <input list="folders" name="folders" />
                    </div> */}
                    
                    <input type="submit" value="Save Bookmark" className={`button_control ${addbutton_submit && 'inactive_button'}`}/>
                
                </form>}
            
            
            
        </div>
    )
}

export default Addbutton
