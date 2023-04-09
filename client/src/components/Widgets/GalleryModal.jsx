import React from 'react'
import { Dialog, DialogTitle,ImageList,ImageListItem } from '@mui/material';
import { useSnapshot } from 'valtio';
import state from '../../store';
const GalleryModal = ({open,setOpen,place}) => {
    const snap=useSnapshot(state)
    function srcset(image, size, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
      }
    

  
    return (
      <Dialog  maxWidth={"md"} onClose={()=>setOpen(false)} open={open}>
        <DialogTitle>All photos</DialogTitle>
        <ImageList   sx={{position:"relative",m:2}} cols={2} gap={10} rowHeight={'auto'} variant="standard">
        {place?.photos?.length > 0 && place.photos.map((photo) =>(
                <ImageListItem  key={photo} cols={1} rows={1}>
                    <img 
                     alt={photo.title}
                     {...srcset(photo.img, 121, photo.rows, photo.cols)}

                     src={snap.backendurl+photo}
                     
                     loading="lazy"
                    
                    />
                </ImageListItem>
                
            ))}
        </ImageList>
           
      
      </Dialog>
    );
}

export default GalleryModal