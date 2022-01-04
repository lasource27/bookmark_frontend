import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react/cjs/react.development'

const Tag = ({tag, tag_bookmark}) => {

    const [tagdropdown, setTagdropdown] = useState(false)

    const toggle_tagdropdown = () => {
        
        setTagdropdown(!tagdropdown)
        console.log(tagdropdown)
    }
    return (
        <div className="row-wrap" > 
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
                {tagdropdown ? 
                <div className="tagDropdown">
                    <ul>
                        <li>Edit</li>
                        <li>Delete</li>
                    </ul>
                </div> :
                ""}      
            </div>
        </div>
    )
}

export default Tag
