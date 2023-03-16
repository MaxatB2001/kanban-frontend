import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { ProjectSlice, useGetProjectQuery } from "../features/project";
import ProjectNavigation from "../features/project/layouts/ProjectNavigation";
import Section from "../features/section/components/Section";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import MainLayout from "../layouts/MainLayout";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { ISection } from "../features/section/models/ISection";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import { ITask } from "../features/task/models/ITask";
import CreateSection from "../features/section/components/CreateSection";
import TaskPage from "./TaskPage";

const Board = () => {
  const queryAttr = "data-rbd-drag-handle-draggable-id";
  const que = "data-rbd-droppable-id";
  const { id, taskId } = useParams();
  const { data, isError, isLoading } = useGetProjectQuery(id as string);
  const { currentProject } = useAppSelector((state) => state.projectReducer);
  const { updateProjectSections, addTask, addSection } = ProjectSlice.actions;
  const dispatch = useAppDispatch();
  const [placeholderProps, setPlaceholderProps] = useState({});
  const socket = useSocket() 
  console.log(taskId);
  
  
  useEffect(() => {
    socket.emit("join", {projectId: id}, (response: any) => {
      console.log(response);
    })
    socket.on("sectionUpdate", ({sections}) => { 
      dispatch(
        updateProjectSections(sections)
      );
    })
    socket.on("createdTask", (task: ITask) => {
      dispatch(addTask(task))
    })
    socket.on("sectionCreated", (section: ISection) => {
      dispatch(addSection(section))
    })
    return () => console.log("end");
  }, []) 

  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    return document.querySelector(domQuery);
  };

  const reorderSection = (
    sourseSection: ISection,
    startIndex: number,
    endIndex: number
  ): ISection => {
    const newTasks = Array.from(sourseSection.tasks);
    const [removed] = newTasks.splice(startIndex, 1);
    newTasks.splice(endIndex, 0, removed);
    return {
      ...sourseSection,
      tasks: newTasks,
    };
  };

  const onDragStart = (start: DragStart, provided: ResponderProvided) => {
    const { source, draggableId } = start;
    const draggedDOM = getDraggedDom(draggableId);

    if (!draggedDOM) {
      return;
    }

    if (draggedDOM.parentNode) {
      const { clientHeight, clientWidth } = draggedDOM;
      const sourceIndex = source.index;
      const clientY =
        parseFloat(
          window.getComputedStyle(draggedDOM.parentNode as Element).paddingTop
        ) +
        [...draggedDOM.parentNode.children]
          .slice(0, sourceIndex)
          .reduce((total, curr) => {
            const style = window.getComputedStyle(curr);
            const marginBottom = parseFloat(style.marginBottom);
            return total + curr.clientHeight + marginBottom;
          }, 0);

      setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
      });
    }
  };

  const onDragUpdate = (update: DragUpdate, provided: ResponderProvided) => {
    const { source, destination, draggableId } = update;
    const domQuery = `[${que}='${destination?.droppableId}']`;
    const col = document.querySelector(domQuery);

    if (!destination) {
      return;
    }

    const draggedDOM = getDraggedDom(draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = destination.index;
    const childrenArray = col ? [].slice.call(col.children) : [];

    const movedItem = childrenArray[destinationIndex - 1];

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    const clientY =
      parseFloat(window.getComputedStyle(col as Element).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        const borderWidth = parseFloat(style.borderWidth);
        return (
          total +
          (curr as Element).clientHeight +
          marginBottom +
          borderWidth * 2
        );
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourseCol = currentProject?.sections.find(
      (section) => section.id === source.droppableId
    );
    const destinationCol = currentProject?.sections.find(
      (section) => section.id === destination.droppableId
    );
    if (sourseCol && destinationCol) {
      if (sourseCol.id === destinationCol.id) {
        const reorderedSection = reorderSection(
          sourseCol,
          source.index,
          destination.index
        );
        socket.emit("update", {sections: [reorderedSection], projectId: id}, () => {
        })
        return;
      }
      const startTasks = Array.from(sourseCol.tasks);
      const [removedFromStart] = startTasks.splice(source.index, 1);
      const updatedStartCols = {
        ...sourseCol,
        tasks: startTasks,
      };
      const destinationTasks = Array.from(destinationCol.tasks);
      destinationTasks.splice(destination.index, 0, removedFromStart);
      const updatedDestinationCol = {
        ...destinationCol,
        tasks: destinationTasks,
      };
      socket.emit("update", {sections: [updatedStartCols, updatedDestinationCol], projectId: id}, () => {
      })
    }
  };

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  if (isError) return null;
  return (
    <MainLayout>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      
      >
        <div className="flex flex-col w-full relative">
          {data && <ProjectNavigation project={data} />}
          <div className="p-3 flex-1 w-full bg-my-gray">
          <div className="flex h-full overflow-x-auto">  
            {currentProject?.sections.map((s) => (
              <Section
                key={s.id}
                section={s}
                placeholderProps={placeholderProps}
              />
            ))}
            <CreateSection/>
          </div>
          </div>
          {/* <TaskPage taskId={taskId}/> */}
        </div>
      </DragDropContext>
    </MainLayout>
  );
};

export default Board;
