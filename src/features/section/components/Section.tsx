import { FC, useCallback, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import BoardTaskItem from "../../task/components/BoardTaskItem";
import { ISection } from "../models/ISection";
import { isEmpty } from "lodash";
import { AiOutlinePlus } from "react-icons/ai";
import {BsThreeDots} from "react-icons/bs"
import CreateTask from "../../task/components/CreateTask";

type SectionProps = {
  section: ISection;
  placeholderProps: any;
};

const Section: FC<SectionProps> = ({ section, placeholderProps }) => {
  const [showTaskCreator, setShowTaskCreator] = useState(false)
  
  return (
    <Droppable droppableId={section.id}>
      {(droppableProvider, doppableSnapshot) => (
        <div className="overflow-y-auto px-3 py-2 basis-80 shrink-0 grow-0 h-full cursor-pointer hover:border-gray-200 border-transparent border text-text-dark">
          <div className="flex items-center justify-between">
            <div className="font-medium">
              {section.name}
            </div>
            <div className="space-x-2">
              <button onClick={() => {
                setShowTaskCreator(true)
              }} className="p-1 hover:bg-neutral-200 rounded-sm"><AiOutlinePlus/></button>
              <button className="p-1 hover:bg-neutral-200 rounded-sm"><BsThreeDots/></button>
            </div>
          </div>
          <div className="w-full relative h-full">
            <div
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
              className="pt-1 rounded-md flex flex-col items-center h-full"
            >
              <CreateTask sectionId={section.id} show={showTaskCreator} setShow={setShowTaskCreator}/>
              {section.tasks.map((i, index) => (
                <BoardTaskItem key={i.id} task={i} index={index} />
              ))}
              {droppableProvider.placeholder}
              {!isEmpty(placeholderProps) &&
                doppableSnapshot.isDraggingOver && (
                  <div
                    className="rounded-md bg-stone-200"
                    style={{
                      position: "absolute",
                      top: placeholderProps.clientY,
                      height: placeholderProps.clientHeight,
                      width: placeholderProps.clientWidth,
                    }}
                  ></div>
                )}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Section;
