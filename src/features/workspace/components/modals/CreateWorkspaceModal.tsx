import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import FormInput from "../../../../components/ui/FormInput";
import Modal from "../../../../components/ui/Modal"
import Spinner from "../../../../components/ui/Spinner";
import { WORKSPACE_ROUTE } from "../../../../data/constants";
import useInput from "../../../../hooks/useInput";
import { useCreateWorkspaceMutation } from "../../services/workspaceService";

type CreateWorkspaceModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateWorkspaceModal:React.FC<CreateWorkspaceModalProps> = ({showModal, setShowModal}) => {
  const navigate = useNavigate()
  const name = useInput("")
  const [createWorkspace, {error, data, isError, isLoading}] = useCreateWorkspaceMutation()
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await createWorkspace({name: name.value})
    if ("data" in res) {
      navigate(`${WORKSPACE_ROUTE}/${res.data.id}`)
    }
  }
  
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <form onSubmit={submit} className="w-full space-y-4" >
        <FormInput name="name" type="text" {...name} placeholder="название"/>
        <Button>{isLoading ? <Spinner /> : "Создать"}</Button>
      </form>
    </Modal>
  )
}

export default CreateWorkspaceModal