import { FC, useEffect, useState } from "react";
import { useGetWorkspacesQuery } from "..";
import Button from "../../../components/ui/Button";
import Spinner from "../../../components/ui/Spinner";
import CreateUserWorkspaceListItem from "./CreateUserWorkspaceListItem";
import CreateWorkspaceModal from "./modals/CreateWorkspaceModal";
import UserWorkspaceListItem from "./UserWorkspaceListItem";

type UserWorkspaceListProps = {};

const UserWorkspaceList: FC<UserWorkspaceListProps> = () => {
  const [showCreateWorkspaceModal, setCreateWorkspaceModal] = useState(false);
  const { data, isLoading, error, refetch } = useGetWorkspacesQuery();
  const [showAllButtonVisible, setShowAllButtonVisible] = useState(false);
  return (
    <div className="p-2 w-6/12 max-h-[400px] h-full">
      <CreateWorkspaceModal
        showModal={showCreateWorkspaceModal}
        setShowModal={setCreateWorkspaceModal}
      />
      <div
        className={`rounded-md border border-gray-200 shadow-sm hover:border-gray-400 w-full h-full p-6 ${
          showAllButtonVisible ? "overflow-auto" : "overflow-hidden"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold mb-1">Рабочие пространства</div>
          {data && data.length > 9 ? (
            <Button
              onClick={() => setShowAllButtonVisible((prev) => !prev)}
              className="max-w-[150px]"
            >
              show all
            </Button>
          ) : null}
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner/>
          </div>
        ) : (
          <div className="flex flex-wrap">
            <CreateUserWorkspaceListItem
              onClick={() => setCreateWorkspaceModal(true)}
            />
            {data &&
              data.map((w) => (
                <UserWorkspaceListItem key={w.id} workspace={w} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWorkspaceList;
