import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react/cjs/react.development'

const Tag = ({tags, tag_bookmark, create_tag, show_new_tag}) => {

    const [new_tag, setNew_tag] = useState("")
    const [tagdropdown, setTagdropdown] = useState(false)

    const toggle_tagdropdown = () => {
        
        setTagdropdown(!tagdropdown)
        console.log(tagdropdown)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        create_tag(new_tag)
        setNew_tag("")
    }
    return (
        <div className="tags">
            <ul>
                {tags.map((tag) => (
                    <div key={tag.id} className="row-wrap" > 
                        <div className="row_control">
                            <div className="row_name_sub" onClick={() => tag_bookmark(tag.id)}>
                                <FontAwesomeIcon icon={["fas", "hashtag"]} className="decor_icons"/>
                                <div className="tag_name">{tag.name}</div>
                            </div>
                            <div className="icon_right" onClick={toggle_tagdropdown}>
                                <div className="link_control_sub">
                                    <FontAwesomeIcon icon={["fas", "ellipsis-h"]} className="link_icons"/>
                                </div>
                            </div>       
                        </div>
                    </div>
                ))}
                
                {show_new_tag ? 
                <form onSubmit={onSubmit}>
                    <input type="text" value={new_tag} onChange={(e) => {setNew_tag(e.target.value)}} placeholder="enter tag name" className="new_input"/>
                </form>
                 : ""}
            </ul>
        </div>
    )
}

export default Tag