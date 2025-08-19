import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { StateContext } from "./GlobalContext";

const StateProvider = ({ children }) => {
  const [focusTime, setFocusTime] = useState(() => {
    const savedFocusTime = localStorage.getItem("focusTime");
    return savedFocusTime ? parseInt(savedFocusTime) : 25 * 60;
  });
  const [shortBreakTime, setShortBreakTime] = useState(() => {
    const savedShortBreakTime = localStorage.getItem("shortBreakTime");
    return savedShortBreakTime ? parseInt(savedShortBreakTime) : 5 * 60;
  });
  const [longBreakTime, setLongBreakTime] = useState(() => {
    const savedLongBreakTime = localStorage.getItem("longBreakTime");
    return savedLongBreakTime ? parseInt(savedLongBreakTime) : 10 * 60;
  });
  const [initTime, setInitTime] = useState(0);
  const [activeTag, setActiveTag] = useState(() => {
    const savedActiveTag = localStorage.getItem("activeTag");
    return savedActiveTag ? parseInt(savedActiveTag) : 0;
  });
  const [progress, setProgress] = useState(20);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [audio, setAudio] = useState(null);
  const [showSnooze, setShowSnooze] = useState(true);
  const [showReset, setShowReset] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [focusSessionActive, setFocusSessionActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(() => {
    const saved = localStorage.getItem("completedSessions");
    return saved ? parseInt(saved) : 0;
  });
  const [shouldAutoSwitchMode, setShouldAutoSwitchMode] = useState(true);

  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [inputError, setInputError] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save completed sessions to localStorage
  useEffect(() => {
    localStorage.setItem("completedSessions", completedSessions.toString());
  }, [completedSessions]);

  // Save timer settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("focusTime", focusTime.toString());
  }, [focusTime]);

  useEffect(() => {
    localStorage.setItem("shortBreakTime", shortBreakTime.toString());
  }, [shortBreakTime]);

  useEffect(() => {
    localStorage.setItem("longBreakTime", longBreakTime.toString());
  }, [longBreakTime]);

  useEffect(() => {
    localStorage.setItem("activeTag", activeTag.toString());
  }, [activeTag]);

  useEffect(() => {
    switch (activeTag) {
      case 0:
        setTime(focusTime);
        setInitTime(focusTime);
        break;
      case 1:
        setTime(shortBreakTime);
        setInitTime(shortBreakTime);
        break;
      case 2:
        setTime(longBreakTime);
        setInitTime(longBreakTime);
        break;
      default:
        break;
    }
  }, [activeTag, focusTime, shortBreakTime, longBreakTime]);

  useEffect(() => {
    // Track focus session state based on timer activity and mode
    if (activeTag === 0) {
      if (isActive) {
        setFocusSessionActive(true);
      }
    } else if (!isActive) {
      // Reset focus session active state only if timer is not active and not in focus mode
      setFocusSessionActive(false);
    }
  }, [isActive, activeTag]);

  return (
    <StateContext.Provider
      value={{
        activeTag,
        setActiveTag,
        progress,
        setProgress,
        time,
        setTime,
        isActive,
        setIsActive,
        initTime,
        setInitTime,
        focusTime,
        setFocusTime,
        shortBreakTime,
        setShortBreakTime,
        longBreakTime,
        setLongBreakTime,
        showAlarm,
        setShowAlarm,
        audio,
        setAudio,
        showSnooze,
        setShowSnooze,
        showReset,
        setShowReset,
        isOpen,
        setIsOpen,
        isLoading,
        setIsLoading,
        tasks,
        setTasks,
        newTask,
        setNewTask,
        inputError,
        setInputError,
        focusSessionActive,
        setFocusSessionActive,
        completedSessions,
        setCompletedSessions,
        shouldAutoSwitchMode,
        setShouldAutoSwitchMode,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
