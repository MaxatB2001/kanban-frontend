import { FC, PropsWithChildren } from "react";
import { IProject } from "../models/IProject";

type ProjectNavigationProps = {
  project: IProject;
};

const ProjectNavigation: FC<ProjectNavigationProps> = ({ project }) => {
  const routes = [
    {
      id: 1,
      name: "Cписок",
    },
    {
      id: 2,
      name: "Доска",
    },
    {
      id: 3,
      name: "Аналитика",
    },
  ];
  return (
    <div className="px-6 border-b border-gray-200 flex min-h-[70px]">
      <div className="w-12 h-12 self-center mr-4">
        <img
          className="rounded-md w-full h-full object-cover"
          src="https://picsum.photos/id/237/300/200"
        />
      </div>
      <div className="flex flex-col justify-end">
        <h1 className="text-xl font-semibold">{project.name}</h1>
        <nav>
          <ul className="flex space-x-4">
            {routes.map((r) => (
              <li key={r.id} className="pb-2 text-base font-medium border-b-2 border-transparent hover:border-b-2 hover:border-gray-800 cursor-pointer">
                {r.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProjectNavigation;
