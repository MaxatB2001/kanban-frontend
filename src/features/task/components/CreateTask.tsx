import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../../../hooks/useSocket";

type CreateTaskProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  sectionId: string;
};

const CreateTask: React.FC<CreateTaskProps> = ({
  show,
  setShow,
  sectionId,
}) => {
  const socket = useSocket();
  const [taskName, setTaskName] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const submit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if (taskName === "") {
      } else {
        socket.emit("createTask", { projectId: id, sectionId, taskName });
        e.currentTarget.textContent = ""
        e.currentTarget.focus()
      }
    }
  };

  const handle = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      setTimeout(() => window.addEventListener("click", handle), 0);
    } else {
      window.removeEventListener("click", handle);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`z-40 p-2 cursor-pointer mb-2 bg-white rounded-md transition-all delay-75 ease-out border shadow-sm border-gray-400 w-full min-h-[90px]`}
    >
      <div
        ref={inputRef}
        onKeyDown={(e) => submit(e)}
        onInput={(e) => setTaskName(e.currentTarget.textContent as string)}
        defaultValue={taskName}
        className="outline-none hover:cursor-text"
        contentEditable
      ></div>
    </div>
  );
};

export default CreateTask;
