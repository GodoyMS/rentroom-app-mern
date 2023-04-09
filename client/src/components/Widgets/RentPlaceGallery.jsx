import {useState} from "react";
import {  ImageList,Button } from "@mui/material";
import SinglePhotoRentPlaceGallery from "./SinglePhotoRentPlaceGallery";
import GalleryModal from "./GalleryModal";
import CollectionsIcon from '@mui/icons-material/Collections';


export default function RentPlaceGallery({place}) {

  const [showAllPhotos,setShowAllPhotos] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);



  return (
    <>
            <ImageList   sx={{position:"relative"}} cols={4} gap={10} rowHeight={'auto'} variant="standard">
                    {place.photos?.[0]&&(<SinglePhotoRentPlaceGallery place={place} rowColumn={2} index={0}/> )}
                    {place.photos?.[1]&&(<SinglePhotoRentPlaceGallery place={place} rowColumn={1} index={1}/> )}
                    {place.photos?.[2]&&(<SinglePhotoRentPlaceGallery place={place} rowColumn={1} index={2}/> )}
                    {place.photos?.[3]&&(<SinglePhotoRentPlaceGallery place={place} rowColumn={1} index={3}/> )}
                    {place.photos?.[4]&&(<SinglePhotoRentPlaceGallery place={place} rowColumn={1} index={4}/> )}
                    {place.photos?.[4] && (<Button onClick={handleOpen} variant="contained" sx={{position:"absolute", bottom:1,right:0}}><CollectionsIcon sx={{mr:1}}/>See all photos</Button> )}


                  
             </ImageList>

             <GalleryModal open={open} setOpen={setOpen} place={place}/>
          


    </>
    
  
  );
}