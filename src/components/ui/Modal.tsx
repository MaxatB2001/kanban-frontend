import { FC, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: FC<ModalProps> = ({ children, showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div onClick={() => setShowModal(false)} className="z-40 fixed inset-0 bg-zinc-900 bg-opacity-25 flex items-center justify-center">
      <div onClick={e => e.stopPropagation()} className="p-5 rounded-md flex items-center justify-center bg-white min-w-10 w-full h-full max-w-[600px] max-h-[300px]">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
