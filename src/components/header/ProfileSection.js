import { useState, Fragment, useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { Logout, Settings, Key, AddBox, Apps } from "@mui/icons-material";
import {
  Tooltip,
  IconButton,
  Divider,
  ListItemIcon,
  MenuItem,
  Menu,
  Avatar,
  Box,
} from "@mui/material";
import { stringAvatar } from "../../helper/UserHelper";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../../store/actions/userAction";
import { userMemo } from "../../store/selector";
import getSlug from "speakingurl";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfileSection = () => {
  const [clubData, setClub] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userMemo);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    dispatch(logoutInitiate());
  };

  const windowWidth = useWindowWidth();

  const getData = async () => {
    if (typeof user.currentUser.club !== "undefined") {
      const docRef = doc(db, "clubs", user.currentUser.club);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setClub({ recordID: docSnap.id, data: docSnap.data() });
      } else {
        setClub(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [windowWidth]);

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title={`${user.currentUser.displayName} | Hesabım`}>
          <IconButton onClick={handleClick} size="small">
            {user.currentUser.providerData[0]?.photoURL === null && (
              <Avatar
                {...stringAvatar(`${user.currentUser.displayName}`, 32, 32)}
              />
            )}
            {user.currentUser.providerData[0]?.photoURL !== null && (
              <Avatar src={`${user.currentUser.providerData[0]?.photoURL}`} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
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
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <a
            href={`/p/${getSlug(user.currentUser.username, {
              lang: "tr",
              symbols: false,
            })}`}
            className="w-full flex flex-wrap items-center"
          >
            {user.currentUser.providerData[0]?.photoURL === null && <Avatar />}
            {user.currentUser.providerData[0]?.photoURL !== null && (
              <Avatar src={`${user.currentUser.providerData[0]?.photoURL}`} />
            )}
            {user.currentUser.displayName}
          </a>
        </MenuItem>
        <Divider />
        {windowWidth < 767 && (
          <div>
            {typeof user.currentUser.club !== "undefined" && (
              <Fragment>
                <MenuItem>
                  <a
                    href={`/${clubData.data?.clubURL}`}
                    className="w-full flex flex-wrap items-center"
                  >
                    {typeof clubData.data?.photoURL !== "undefined" &&
                      clubData.data?.photoURL !== "" && (
                        <Avatar src={clubData.data?.photoURL} />
                      )}
                    {typeof clubData.data?.photoURL !== "undefined" &&
                      clubData.data?.photoURL === "" && (
                        <Avatar
                          {...stringAvatar(`${clubData.data?.name}`, 32, 32)}
                        />
                      )}
                    {typeof clubData.data?.photoURL == "undefined" && (
                      <Avatar
                        {...stringAvatar(`${clubData.data?.name}`, 32, 32)}
                      />
                    )}
                    {clubData.data?.name}
                  </a>
                </MenuItem>
                <Divider />
              </Fragment>
            )}
            {typeof user.currentUser.club !== "undefined" && (
              <MenuItem>
                <a
                  href={`/manage-club`}
                  className="w-full flex flex-wrap items-center"
                >
                  <ListItemIcon>
                    <Apps fontSize="small" />
                  </ListItemIcon>
                  Kulüp Ayarları
                </a>
              </MenuItem>
            )}
            {typeof user.currentUser.club === "undefined" && (
              <MenuItem>
                <a
                  href={`/create-club`}
                  className="w-full flex flex-wrap items-center"
                >
                  <ListItemIcon>
                    <AddBox fontSize="small" />
                  </ListItemIcon>
                  Kulüp Oluştur
                </a>
              </MenuItem>
            )}
          </div>
        )}
        <MenuItem>
          <a href={`/settings`} className="w-full flex flex-wrap items-center">
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Hesap Ayarları
          </a>
        </MenuItem>
        <MenuItem>
          <a href={`/password`} className="w-full flex flex-wrap items-center">
            <ListItemIcon>
              <Key fontSize="small" />
            </ListItemIcon>
            Şifre İşlemleri
          </a>
        </MenuItem>
        <MenuItem onClick={() => logOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Çıkış Yap
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default ProfileSection;
