import { useParams } from "react-router-dom";


type TaskPageProps = {
  taskId: string | undefined
}

const TaskPage:React.FC<TaskPageProps> = ({taskId}) => {
  if (!taskId) {
    return (
      <div ></div>
    )
  }
  return (
    <div
      className={`absolute inset-y-0 right-0 max-w-2xl w-full transition-all ease-in-out bg-white ${
        !taskId ? "translate-x-full" : "translate-x-0"
      }`}
    >
      {taskId}
    </div>
  );
};

export default TaskPage;
