import { Fragment, useState } from "react";
import {
  Tooltip,
  IconButton,
  Box,
  Menu,
  ListItemText,
  MenuList,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { FaShare } from "react-icons/fa";
import { IosShare } from "@mui/icons-material";

const menuStyle = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
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

const PostShare = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Paylaş">
          <IconButton onClick={handleClick} size="small">
            <FaShare size={21} />
            <span className="text-base mx-1">619k</span>
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
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <IosShare />
            </ListItemIcon>
            <ListItemText>Profilinde Paylaş</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );
};

export default PostShare;
