import React from "react";
import { Box, Card, Link, Tooltip, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function TaskCard({ task }) {
  const { _id, title, description } = task;
  return (
    <Tooltip title="click to view task detail" placement="top">
      <Link
        variant="subtitle2"
        underline="none"
        sx={{ fontWeight: 600 }}
        component={RouterLink}
        to={`/task/${_id}`}
        noWrap
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            p: 2,
            ":hover": {
              boxShadow: 5,
            },
          }}
        >
          <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
            <Box sx={{ display: "flex", alignItems: "last baseline" }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                mr={1}
              >
                {"Title:"}
              </Typography>

              <Typography variant="h6" sx={{ color: "primary.darker" }} mr={1}>
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
        </Card>
      </Link>
    </Tooltip>
  );
}

export default TaskCard;
