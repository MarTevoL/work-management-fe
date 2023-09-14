import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { getProjectMember } from "./projectMemberSlice";
import { getAllUsers } from "../user/userSlice";
function ProjectMemberList({ projectId }) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { currentPageMember, memberById, totalMembers, totalPages, isLoading } =
    useSelector((state) => state.projectMember);

  const { userById } = useSelector((state) => state.user);

  console.log("current", currentPageMember);
  const members = currentPageMember.map((id) => memberById[id]);

  console.log("member", members);
  useEffect(() => {
    dispatch(getProjectMember({ page, projectId }));
  }, [dispatch, page, projectId]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Container>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
              <Typography variant="h8" sx={{ flexGrow: 1 }}>
                Assignee List
              </Typography>
              <Typography
                variant="subtitle"
                sx={{ color: "text.secondary", ml: 1 }}
              >
                {totalMembers > 1
                  ? `${totalMembers} assignees found`
                  : totalMembers === 1
                  ? `${totalMembers} assignee found`
                  : "No assignee found"}
              </Typography>

              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, page) => setPage(page)}
              />
            </Stack>
          </Stack>

          <Grid container spacing={3} my={1}>
            {members.map((member) => (
              <Grid key={member._id} item xs={12} md={4}>
                <Typography>{userById[member.userId].name}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default ProjectMemberList;
