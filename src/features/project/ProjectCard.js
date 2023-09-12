import React from "react";
import { Box, Card, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function ProjectCard({ project }) {
  const { _id, title, description } = project;
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Link
          variant="subtitle2"
          sx={{ fontWeight: 600 }}
          component={RouterLink}
          to={`/project/${_id}`}
        >
          {title}
        </Link>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default ProjectCard;
