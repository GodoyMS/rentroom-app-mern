import * as React from 'react';
import Alert from '@mui/material/Alert';
const ToastAlert = ({text,severity,color}) => {
  return (
    <Alert severity={severity} color={color} sx={{position:'relative',display:'inline-flex'}}>
      {text}
      
    </Alert>
  )
}

export default ToastAlert