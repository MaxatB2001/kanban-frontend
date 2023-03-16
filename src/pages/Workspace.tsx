import { useState } from "react";
import { useParams } from "react-router-dom";
import CreateProjectModal from "../features/project/components/modals/CreateProjectModal";
import ProjectListItem from "../features/project/components/ProjectListItem";
import { useGetWorkspaceQuery } from "../features/workspace";
import MainLayout from "../layouts/MainLayout";

const Workspace = () => {
  const { id } = useParams();
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const {data: workspace, isLoading, error} = useGetWorkspaceQuery(id as string)
  return (
    <MainLayout>
      <CreateProjectModal showModal={showCreateProjectModal} setShowModal={setShowCreateProjectModal}/>
      <div className="w-full max-w-[1200px] flex flex-wrap mx-auto my-0 content-start">
        <div onClick={() => setShowCreateProjectModal(true)} className="p-1 w-3/12 cursor-pointer">
          <div className="rounded-sm bg-slate-100 hover:brightness-95 h-[80px] p-2 flex items-center justify-center text-sm text-sky-900">Создать проект</div>
        </div>
        {
          workspace && workspace.projects.map(p => 
            <ProjectListItem key={p.id} project={p}/>  
          )
        }
      </div>
    </MainLayout>
  );
};

export default Workspace;
