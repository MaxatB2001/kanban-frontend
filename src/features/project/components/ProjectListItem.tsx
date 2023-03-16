import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { PROJECT_ROUTE } from "../../../data/constants"
import { IProject } from "../models/IProject"

type ProjectListItemProps = {
  project: IProject
}

const ProjectListItem:FC<ProjectListItemProps> = ({project}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`${PROJECT_ROUTE}/${project.id}`)} className="p-1 w-3/12 cursor-pointer">
      <div className="rounded-sm bg-gray-400 h-[80px] p-2 hover:brightness-95">{project.name}</div>
    </div>
  )
}

export default ProjectListItem