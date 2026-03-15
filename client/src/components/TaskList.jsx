import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTask, deleteTask, editTask, setTasks }) => {

  const handleDragEnd = (result) => {

    if (!result.destination) return;

    const items = Array.from(tasks);

    const [reordered] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reordered);

    setTasks(items);

  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        🎉 No tasks yet <br />
        Start planning your studies!
      </div>
    );
  }

  return (

    <DragDropContext onDragEnd={handleDragEnd}>

      <Droppable droppableId="tasks">

        {(provided) => (

          <ul
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >

            {tasks.map((task, index) => (

              <Draggable
                key={task._id}
                draggableId={(task._id || index).toString()}
                index={index}
              >

                {(provided) => (

                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >

                    <TaskItem
                      task={task}
                      toggleTask={toggleTask}
                      deleteTask={deleteTask}
                      editTask={editTask}
                    />

                  </li>

                )}

              </Draggable>

            ))}

            {provided.placeholder}

          </ul>

        )}

      </Droppable>

    </DragDropContext>

  );

};

export default TaskList;