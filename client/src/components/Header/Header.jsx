import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {

  return (
    <Box mb="30px">
      <Typography
      className="text-slate-600"
        variant="h2"
        
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" className="text-blue-600">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;