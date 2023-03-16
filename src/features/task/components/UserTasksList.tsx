import UserTasksListItem from "./UserTasksListItem";

const UserTasksList = () => {
  const mockTasks = [
    {
      id: "1",
      name: "First"
    },
    {
      id: "2",
      name: "F2rst"
    },
    {
      id: "3",
      name: "First3"
    },
  ]
  return (
    <div className="p-2 w-6/12 max-h-[400px] h-full">
      <div className="rounded-md border border-gray-200 shadow-sm hover:border-gray-400 h-full w-full">
        <div className="border-b border-gray-200 flex px-5">
          <div className="w-12 h-12 pt-4">
            <img
              className="cursor-pointer rounded-full"
              src="https://picsum.photos/id/237/200/200"
            />
          </div>
          <div className="pl-4 pt-6">
            <span className="font-semibold text-xl">Мои задачи</span>
            <nav>
              <ul className="flex">
                <li>
                  <span className="text-base cursor-pointer font-medium hover:border-b-2 border-gray-500">
                    Предстоит
                  </span>
                </li>
                <li className="ml-2">
                  <span className="text-base cursor-pointer font-medium hover:border-b-2 border-gray-500">
                    Просрочено
                  </span>
                </li>
                <li className="ml-2">
                  <span className="text-base cursor-pointer font-medium hover:border-b-2 border-gray-500">
                    Выполнено
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="pb-5">
          {mockTasks.map(task => 
            <UserTasksListItem key={task.id} task={task}/>  
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTasksList;
