import { useCallback, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import useSocket from "../../../hooks/useSocket";

const CreateSection = () => {
  const socket = useSocket();
  const [nameWritable, setNameWritable] = useState(false);
  const { id: projectId } = useParams();
  const [name, setName] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    socket.emit('createSection', {name, projectId})
    setName("")
  };
  const handle = useCallback(() => {
    setNameWritable(false);
  }, []);
  useEffect(() => {
    if (nameWritable) {
      setTimeout(() => window.addEventListener("click", handle), 0);
    } else {
      window.removeEventListener("click", handle);
    }
  }, [nameWritable]);
  return (
    <div className="px-3 max-w-xs w-full text-text-dark min-w-[300px]">
      {!nameWritable ? (
        <button
          onClick={() => setNameWritable(true)}
          className="flex items-center font-medium space-x-2 text-gray-500 rounded-md hover:text-text-dark hover:bg-neutral-100 p-2"
        >
          <AiOutlinePlus />
          <h3>Добавить раздел</h3>
        </button>
      ) : (
        <form onSubmit={submit} className="p-2">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            type="text"
            className="outline-blue-400 p-1 rounded-md"
          />
        </form>
      )}
    </div>
  );
};

export default CreateSection;
