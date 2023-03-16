import { Draggable } from "react-beautiful-dnd";
import { Link, useParams } from "react-router-dom";
import { PROJECT_ROUTE } from "../../../data/constants";
import { ITask } from "../models/ITask";

type BoardTaskItemProps = {
  task: ITask;
  index: number;
};

const BoardTaskItem: React.FC<BoardTaskItemProps> = ({ task, index }) => {
  
  const {id} = useParams()
  return (
    <Draggable draggableId={task.id} index={index}>
      {(draggableProvider, draggableSnapshot) => (
        <Link
        to={{
          pathname: `${PROJECT_ROUTE}/${id}/board/${task.id}`,
        }}
        ref={draggableProvider.innerRef}
        {...draggableProvider.draggableProps}
        {...draggableProvider.dragHandleProps}
        style={draggableProvider.draggableProps.style}
          className={`p-2 cursor-pointer mb-2 last:mb-0 min-h-[90px] bg-white rounded-md border transition-colors ease-in-out border-gray-200 shadow-sm hover:border-gray-400 w-full ${draggableSnapshot.isDragging ? "border-blue-400" : ""}`}
          onClick={() => console.log("some4")}
        >
          {task.name}
        </Link>
      )}
    </Draggable>
  );
};

export default BoardTaskItem;
