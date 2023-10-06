import React from "react";
import { Box, Card, Link, Tooltip, Typography, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  marginBottom: 8,
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

function ProjectCard({ project }) {
  const { _id, title, description } = project;
  return (
    <Tooltip title="click to view project info" placement="top">
      <Link underline="none" component={RouterLink} to={`/project/${_id}`}>
        <StyledCard elevation={5}>
          <ContentBox>
            <Box ml="12px">
              <Box sx={{ display: "flex", alignItems: "last baseline" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  noWrap
                  mr={1}
                >
                  {"Title:"}
                </Typography>
                <Typography variant="h6" sx={{ color: "primary.darker" }}>
                  {title}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  mr={1}
                >
                  {"Description:"}
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{ color: "primary.dark" }}
                  noWrap
                >
                  {description}
                </Typography>
              </Box>
            </Box>
          </ContentBox>
        </StyledCard>
      </Link>
    </Tooltip>
  );
}

export default ProjectCard;
