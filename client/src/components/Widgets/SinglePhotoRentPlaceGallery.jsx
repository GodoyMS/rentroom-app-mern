import React from 'react';
import { ImageListItem } from '@mui/material';
import { useSnapshot } from 'valtio';
import state from '../../store';
import { backendURL } from '../../config/config';



function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const SinglePhotoRentPlaceGallery = ({place,rowColumn,index}) => {
  const snap=useSnapshot(state)
  return (
    <ImageListItem  key={place.photos[index]} cols={rowColumn} rows={rowColumn}>
    <img 
     alt={place.photos[index]}
     {...srcset(place.photos[index].img, 121, place.photos[index].rows, place.photos[index].cols)}

     src={backendURL+place.photos[index]}
     
     loading="lazy"
    
    />
</ImageListItem>
  )
}

export default SinglePhotoRentPlaceGallery