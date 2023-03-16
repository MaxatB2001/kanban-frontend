import { VscAdd } from "react-icons/vsc"

type CreateUserWorkspaceListItemProps = {
  onClick: () => void
}

const CreateUserWorkspaceListItem:React.FC<CreateUserWorkspaceListItemProps> = ({onClick}) => {
  return (
    <div onClick={onClick} className="flex items-center p-2 w-6/12 rounded-lg hover:bg-gray-100 cursor-pointer">
      <div className="w-10 h-10">
        <VscAdd className="w-full h-full rounded-lg text-gray-500"/>
      </div>
      <div className="ml-2 text-md font-medium">Создать</div>
    </div>
  )
}

export default CreateUserWorkspaceListItem