import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonIcon from "@mui/icons-material/Person";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function TaskAssigneeCard({ name, email, role }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PersonIcon sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EmailRoundedIcon
            sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {role}
        </Typography>
      </CardContent>
    </Card>
  );
}
