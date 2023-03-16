import { FC } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ITask } from "../models/ITask";

type UserTasksListItemProps = {
  task: ITask;
};

const UserTasksListItem: FC<UserTasksListItemProps> = ({ task }) => {
  return (
    <div className="h-[32px] relative after:content-[''] after:border-b after:border-gray-200 after:absolute after:left-6 after:right-6 after:-bottom-[1px] px-6 hover:bg-gray-100 hover:border-y hover:border-gray-200">
      <div className="h-full w-full flex justify-start items-center cursor-pointer">
        <AiOutlineCheckCircle className="transition-colors ease-in-out delay-100 text-xl text-gray-400 mr-1 hover:text-green-400" />
        <div>{task.name}</div>
      </div>
    </div>
  );
};

export default UserTasksListItem;
