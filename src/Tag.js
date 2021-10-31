import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Tag = ({tags, tag_bookmark}) => {
    return (
        <div>
            <ul>
                {tags.map((tag) => (
                    <div className="row-wrap" onClick={() => tag_bookmark(tag.id)}> 
                        <div key={tag.id} className="row_control">
                            <div className="row_name_sub">
                                <FontAwesomeIcon icon={["fas", "hashtag"]} className="decor_icons"/>
                                <div className="tag_name">{tag.name}</div>
                            </div>
                            <div className="icon_right">
                                <div className="link_control_sub">
                                    <FontAwesomeIcon icon={["fas", "ellipsis-h"]} className="link_icons"/>
                                </div>
                            </div>       
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Tag