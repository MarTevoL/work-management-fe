import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../project/projectSlice";
import { Box, Link, Card, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function HomeProjectBox() {
  const { totalProjects } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects({ page: 1 }));
  }, [dispatch]);
  return (
    <Box>
      <Link underline="none" component={RouterLink} to={`/project`}>
        <Card>
          <CardContent>
            {totalProjects ? (
              <Typography>{`You have ${totalProjects} projects`}</Typography>
            ) : (
              <Typography>{`You don't have any project`}</Typography>
            )}
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}

export default HomeProjectBox;
