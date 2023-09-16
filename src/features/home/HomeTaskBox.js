import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { getTasks, getUserTasks } from "../task/taskSlice";

function HomeTaskBox() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const { totalTasks } = useSelector((state) => state.task);

  useEffect(() => {
    if (user.role === "Manager") {
      dispatch(getTasks({ page: 1 }));
    } else {
      dispatch(getUserTasks({ userId: user._id, page: 1 }));
    }
  }, [dispatch, user]);

  return (
    <Box>
      <Card>
        <CardContent>
          {totalTasks ? (
            <Typography>{`You have ${totalTasks} tasks`}</Typography>
          ) : (
            <Typography>{`You don't have any task`}</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default HomeTaskBox;
