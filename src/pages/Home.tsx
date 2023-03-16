import { useState } from "react";
import UserTasksList from "../features/task/components/UserTasksList";
import CreateWorkspaceModal from "../features/workspace/components/modals/CreateWorkspaceModal";
import UserWorkspaceList from "../features/workspace/components/UserWorkspaceList";
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div className="px-8 flex flex-col items-center w-full h-full">
        <div className="max-w-[1200px] w-full h-full">
          <div className="flex flex-wrap w-full h-full content-start">
            <UserTasksList />
            <UserWorkspaceList/>
            {/* <UserWorkspaceList/>
            <UserWorkspaceList/> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
