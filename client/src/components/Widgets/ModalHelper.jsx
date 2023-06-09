import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:{xs:300,xl:500},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalHelper({ismodalOpen,handleOpen,handleClose}) {


  return (
    <div>
      <Modal
        open={ismodalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ops!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            To save items, you first need to login to your account
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}