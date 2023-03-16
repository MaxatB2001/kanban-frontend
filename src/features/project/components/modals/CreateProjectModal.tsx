import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import FormInput from "../../../../components/ui/FormInput";
import Modal from "../../../../components/ui/Modal";
import Spinner from "../../../../components/ui/Spinner";
import { PROJECT_ROUTE } from "../../../../data/constants";
import useInput from "../../../../hooks/useInput";
import { useCreateProjectMutation } from "../../services/projectService";

type CreateProjectModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const navigate = useNavigate();
  const name = useInput("");
  const { id: workspaceId } = useParams();
  const [createProject, { data, isLoading, error, isSuccess }] =
    useCreateProjectMutation();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (workspaceId) {
      createProject({ name: name.value, workspaceId });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`${PROJECT_ROUTE}/${data?.id}`);
    }
  }, [isSuccess])

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <form onSubmit={submit} className="w-full space-y-4">
        <FormInput name="name" type="text" {...name} placeholder="название" />
        <Button>{isLoading ? <Spinner /> : "Создать"}</Button>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
