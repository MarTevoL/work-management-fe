import React from "react";
import {
  Box,
  Card,
  Icon,
  IconButton,
  Link,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { Navigate, Link as RouterLink } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": {
    opacity: 0.6,
    fontSize: "44px",
    color: theme.palette.primary.main,
  },
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
}));

function ProjectCard({ project }) {
  const { _id, title, description } = project;
  return (
    <StyledCard elevation={5}>
      <ContentBox>
        <Box ml="12px">
          <Link
            variant="h6"
            sx={{ fontWeight: 600 }}
            component={RouterLink}
            to={`/project/${_id}`}
          >
            <Typography>{title}</Typography>
          </Link>
          <Heading>{description}</Heading>
        </Box>
      </ContentBox>
    </StyledCard>
  );
}

export default ProjectCard;
