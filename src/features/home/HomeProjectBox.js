import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../project/projectSlice";
import { Box, Card, CardContent, Typography } from "@mui/material";

function HomeProjectBox() {
  const { totalProjects } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects({ page: 1 }));
  }, [dispatch]);
  return (
    <Box>
      <Card>
        <CardContent>
          {totalProjects ? (
            <Typography>{`You have ${totalProjects} projects`}</Typography>
          ) : (
            <Typography>{`You don't have any project`}</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default HomeProjectBox;
