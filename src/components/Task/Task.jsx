import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FaCheck, FaTrash, FaPlus } from "react-icons/fa";
import { StateContext } from "../../context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";

const Task = () => {
  const { tasks, setTasks, newTask, setNewTask, inputError, setInputError } =
    useContext(StateContext);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    let errorTimeout;
    if (inputError) {
      errorTimeout = setTimeout(() => {
        setInputError("");
      }, 3000);
    }

    return () => {
      if (errorTimeout) clearTimeout(errorTimeout);
    };
  }, [inputError, setInputError]);

  const handleAddTask = (e) => {
    e?.preventDefault(); // Handle form submission

    if (newTask.trim() === "") {
      setInputError(
        "Task description is required. Please provide details before adding."
      );
    } else {
      setTasks([...tasks, { text: newTask, done: false, id: Date.now() }]);
      setNewTask("");
      setInputError("");
    }
  };

  const handleToggleDone = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <TaskContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <TaskHeader>Tasks</TaskHeader>
      <AddTaskForm onSubmit={handleAddTask}>
        <InputWrapper $isFocused={isFocused}>
          <TaskInput
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="What are you working on?"
            aria-label="Enter a new task"
          />
          <AddButton
            type="submit"
            as={motion.button}
            whileHover={{ scale: 1.05, backgroundColor: "#ff6b6b" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add task"
          >
            <FaPlus /> Add Task
          </AddButton>
        </InputWrapper>
        <AnimatePresence>
          {inputError && (
            <ErrorMessage
              as={motion.div}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {inputError}
            </ErrorMessage>
          )}
        </AnimatePresence>
      </AddTaskForm>

      <TaskListContainer>
        {tasks.length === 0 ? (
          <EmptyState>
            <EmptyText>No tasks yet. Add one to get started!</EmptyText>
          </EmptyState>
        ) : (
          <TaskList>
            <AnimatePresence mode="popLayout">
              {tasks.map((task, index) => (
                <TaskItemWrapper
                  key={task.id || index}
                  as={motion.li}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1,
                  }}
                  layout
                >
                  <TaskItem $done={task.done}>
                    <TaskContent>
                      <CheckCircle
                        $done={task.done}
                        onClick={() => handleToggleDone(index)}
                        as={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {task.done && <FaCheck />}
                      </CheckCircle>
                      <TaskText $done={task.done}>{task.text}</TaskText>
                    </TaskContent>
                    <DeleteButton
                      onClick={() => handleDeleteTask(index)}
                      as={motion.button}
                      whileHover={{ scale: 1.1, backgroundColor: "#ff4136" }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Delete task"
                    >
                      <FaTrash />
                    </DeleteButton>
                  </TaskItem>
                </TaskItemWrapper>
              ))}
            </AnimatePresence>
          </TaskList>
        )}
      </TaskListContainer>

      {tasks.length > 0 && (
        <TaskStats>
          <TaskCount>
            {tasks.filter((task) => task.done).length}/{tasks.length} completed
          </TaskCount>
        </TaskStats>
      )}
    </TaskContainer>
  );
};

export default Task;

const TaskContainer = styled.div`
  width: 100%;
  max-width: 55rem;
  margin: 0 auto;
  padding: 2.5rem;
  background: rgba(40, 40, 40, 0.7);
  border-radius: 1.2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 1.5rem;
  }
`;

const TaskHeader = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const AddTaskForm = styled.form`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  border-radius: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.$isFocused
      ? "0 0 0 2px rgba(231, 76, 60, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2)"
      : "0 4px 12px rgba(0, 0, 0, 0.1)"};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 1.2rem;
  font-size: 1.6rem;
  font-weight: 500;
  border: none;
  border-top-left-radius: 0.6rem;
  border-bottom-left-radius: 0.6rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background: rgba(50, 50, 50, 0.8);
  color: #fff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 1rem;
    border-radius: 0.6rem 0.6rem 0 0;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  min-width: 10rem;
  font-size: 1.5rem;
  font-weight: 600;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-top-right-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  svg {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    height: 4rem;
    border-radius: 0 0 0.6rem 0.6rem;
    font-size: 1.4rem;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 1.4rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 107, 107, 0.1);
  border-radius: 0.6rem;
  overflow: hidden;
`;

const TaskListContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0.8rem;
  border: 1px dashed rgba(255, 255, 255, 0.2);
`;

const EmptyText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.6rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItemWrapper = styled.li`
  margin-bottom: 1rem;
  overflow: hidden;
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.5rem;
  background: ${(props) =>
    props.$done ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 0.8rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TaskContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex: 1;
`;

const CheckCircle = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  min-width: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: transparent;
  border: 2px solid
    ${(props) => (props.$done ? "#4caf50" : "rgba(255, 255, 255, 0.5)")};
  color: #fff;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  ${(props) =>
    props.$done &&
    `
    background-color: #4caf50;
  `}

  &:hover {
    border-color: ${(props) => (props.$done ? "#4caf50" : "#e74c3c")};
  }

  svg {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    width: 2.2rem;
    height: 2.2rem;
    min-width: 2.2rem;

    svg {
      font-size: 1rem;
    }
  }
`;

const TaskText = styled.span`
  font-size: 1.6rem;
  line-height: 1.4;
  font-weight: 500;
  text-decoration: ${(props) => (props.$done ? "line-through" : "none")};
  color: ${(props) => (props.$done ? "rgba(255, 255, 255, 0.5)" : "#fff")};
  word-break: break-word;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: none;
  border-radius: 0.6rem;
  width: 3.6rem;
  height: 3.6rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  svg {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    width: 3.2rem;
    height: 3.2rem;

    svg {
      font-size: 1.2rem;
    }
  }
`;

const TaskStats = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const TaskCount = styled.div`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
