import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Folder = ({folders, folder_bookmark}) => {
    return (
        <div>
            <ul>
                {folders.map((folder) => (
                    <div key={folder.id} className="row-wrap" onClick={() => folder_bookmark(folder.id)}> 
                        <div className="row-control">
                            <div className="row-name-sub">
                                <FontAwesomeIcon icon={["far", "folder"]} className="decor-icons"/>
                                <div className="folder_name" >{folder.name}</div>
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

export default Folder

// row-wrap的目的是选中这一行，添加hover效果
// row-control目的是display flex和space-between，把左边和右边的icon分开
// row-name目的是把左图标和名字放同一行，且调整位置（margin、padding）

// icon-right目的是选择右边,添加hover效果
// link-control-sub目的是调整位置（右边icon)

