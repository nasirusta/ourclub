import { useState } from "react";
import { Notifications } from "@mui/icons-material";
import {
  Tooltip,
  IconButton,
  Box,
  Badge,
  Menu,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { stringAvatar } from "../../helper/UserHelper";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const boxStyle = {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  marginTop: 1,
};

const menuStyle = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 42,
      height: 42,
      ml: -0.5,
      mr: 0,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const UserNotifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="mr-8">
      <Box sx={boxStyle}>
        <Tooltip title="Bildirimler">
          <IconButton onClick={handleClick} size="small">
            <Badge badgeContent={17} color="error">
              <Notifications sx={{ fontSize: 24 }} />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={menuStyle}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock={true}
      >
        <List sx={style}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar {...stringAvatar("Felsefe Kulübü", 22, 22)} />
            </ListItemAvatar>
            <ListItemText
              primary="Felsefe Kulübü"
              secondary={
                <Typography component="span" variant="body2">
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Aristo mantığı
                  </Typography>
                  {" başlığında bir içerik paylaştı"}
                  <Typography
                    sx={{ display: "inline-block" }}
                    component="div"
                    variant="caption"
                    color="text.primary"
                  >
                    22 Ekim 2021 - 06:15
                  </Typography>
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Menu>
    </div>
  );
};

export default UserNotifications;
