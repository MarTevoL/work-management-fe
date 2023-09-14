import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonIcon from "@mui/icons-material/Person";
import { Stack } from "@mui/material";

export default function TaskAssigneeCard({ name, email, role }) {
  return (
    <Stack>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1">Assignee</Typography>
      </Box>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon
              sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
            />
            <Typography variant="h6">{name}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmailRoundedIcon
              sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ color: "text.main" }} noWrap>
              Role:
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {role}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
