import React from "react";
import { useParams } from "react-router-dom";
import ProjectView from "../features/project/ProjectView";

function ProjectDetailPage() {
  const { projectId } = useParams();
  return <ProjectView projectId={projectId} />;
}

export default ProjectDetailPage;
