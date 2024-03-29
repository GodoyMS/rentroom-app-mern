import { Container, CssBaseline } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";
function Footer() {
  return (
    <footer className="footer">
      <Container sx={{ position: "relative" }} maxWidth="lg">
        <CssBaseline />
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Button
          href="https://portafolio-godoyliam.vercel.app"
          target="_blank"
            variant="outlined"
            sx={{ fontSize: { xs: 10, md: 15 } }}
            endIcon={<LaunchIcon />}
          >
            Developed by Godoy Muñoz
          </Button>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
