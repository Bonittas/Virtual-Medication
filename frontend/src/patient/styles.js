import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export const container = {
  mt: "12vh",
  ml: "5vw",
  border: "none", // Remove border
  boxShadow: "none", // Remove shadow
  minHeight: "100vh",
  background: "linear-gradient(135deg, #dff6fe 30%, #0095de 90%)",
  backgroundImage: `url('../images/doc3.jpg')`,
  backgroundPosition: "center",
  backgroundRepeat: "repeat-x",
  backgroundSize: "cover",
  [theme.breakpoints.down("md")]: {
    mt: "10vh",
    ml: "10vw",
    maxWidth: "95vw",
  },
  [theme.breakpoints.down("sm")]: {
    ml: "12vw",
    maxWidth: "85vw",
  },
};

export const paper = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  border: "none", // Remove border
  boxShadow: "none", // Remove shadow
};

export const transparentPaper = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  background: "transparent",
  border: "none", // Remove border
  boxShadow: "none", // Remove shadow
};
export const upload = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const avatar = {
  width: 200,
  height: 200,
};

export const listItem = {
  margin: "2px",
  backgroundColor: "#e6f7fd",
  "&:hover": {
    backgroundColor: "#d0f0fb",
    border: "3px solid #0d7da5",
  },
};

export const typography = { fontWeight: "bold", color: "#063547" };

export const signinGrid = {
  backgroundImage: `url('images/pat.jpg')`,
  border: "none", // Remove border
  boxShadow: "none", // Remove shadow
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) =>
    t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const signupGrid = {
  backgroundImage: `url('images/doc3.jpg')`,
  backgroundRepeat: "no-repeat",
  backgroundColor: (t) =>
    t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const box = {
  my: 8,
  mx: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const controls = {
  top: "auto",
  bottom: 0,
  backgroundColor: "#021117",
  alignItems: "center",
};

export const controlsToolbar = {
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "0",
    marginLeft: "0",
  },
};
