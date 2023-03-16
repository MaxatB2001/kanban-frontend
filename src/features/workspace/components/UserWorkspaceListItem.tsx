import { FC } from "react"
import { useNavigate, useNavigation } from "react-router-dom"
import { WORKSPACE_ROUTE } from "../../../data/constants"
import { IWorkspace } from "../models/IWorkspace"

type UserWorkspaceListItemProps = {
  workspace: IWorkspace
}

const UserWorkspaceListItem:FC<UserWorkspaceListItemProps> = ({workspace}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`${WORKSPACE_ROUTE}/${workspace.id}`)} className="flex items-center p-2 w-6/12 rounded-lg hover:bg-gray-100 cursor-pointer">
      <div className="w-12 h-12">
        <img className="w-full h-full rounded-lg" src="https://picsum.photos/id/237/200/200"/>
      </div>
      <div className="ml-2 text-md font-medium">{workspace.name}</div>
    </div>
  )
}

export default UserWorkspaceListItem