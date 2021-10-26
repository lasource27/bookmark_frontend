import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Tag = ({tags, tag_bookmark}) => {
    return (
        <div>
            <ul>
                {tags.map((tag) => (
                    <div className="row-wrap" onClick={() => tag_bookmark(tag.id)}> 
                        <div key={tag.id} className="row-control">
                            <div className="row-name-sub">
                                <FontAwesomeIcon icon={["fas", "hashtag"]} className="decor-icons"/>
                                <div className="tag_name">{tag.name}</div>
                            </div>
                            <div className="icon-right">
                                <div className="link-control-sub">
                                    <FontAwesomeIcon icon={["fas", "ellipsis-h"]} className="link-icons"/>
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