
import { IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

function LeftCornerGitHub() {
  return (
    <>
    <div className="triangle">
    
    </div>
        <IconButton href="https://github.com/GodoyMS/rentroom-app-mern" target="_blank" sx={{position:'absolute',left:0,top:0}}>
         <GitHubIcon fontSize="large" />
        </IconButton>
    </>
  );
}

export default LeftCornerGitHub;