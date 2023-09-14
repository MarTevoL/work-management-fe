import React from "react";
import { useParams } from "react-router-dom";
import TaskView from "../features/task/TaskView";

function TaskDetailPage() {
  const { taskId } = useParams();
  return <TaskView taskId={taskId} />;
}

export default TaskDetailPage;
