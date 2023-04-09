import axios from "axios";
import {useState} from "react";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import {FormLabel, Grid, Icon, Tooltip } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSnapshot } from "valtio";
import state from "../../store";

export default function PhotosUploader({addedPhotos,onChange}) {
  const [photoLink,setPhotoLink] = useState('');
  const snap=useSnapshot(state)
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
    onChange(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: {'Content-type':'multipart/form-data'}
    }).then(response => {
      const {data:filenames} = response;
      onChange(prev => {
        return [...prev, ...filenames];
      });
    })
  }
  function removePhoto(ev,filename) {
    ev.preventDefault();
    onChange([...addedPhotos.filter(photo => photo !== filename)]);
  }
  function selectAsMainPhoto(ev,filename) {
    ev.preventDefault();
    onChange([filename,...addedPhotos.filter(photo => photo !== filename)]);
  }

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  return (
    <>
     


      <Stack direction="column" alignItems="start" sx={{marginTop:'10px'}} spacing={2}>
        <FormLabel id="uploadPhotos"> Upload your photos</FormLabel>
      <Button
       aria-labelledby='uploadPhotos'

      variant="outlined" component="label"  >
        Upload
        <input hidden accept="image/*" multiple type="file" onChange={uploadPhoto}  />
        <FileUploadIcon/>
      </Button>


    </Stack>

    <ImageList sx={{  maxHeight: 500,minWidth:200,}} cols={3} rowHeight={'auto'} variant="quilted">
      {addedPhotos.length>0 && addedPhotos.map((link) => (
        
        <ImageListItem key={link} cols={link===addedPhotos[0] ? 2:1} rows={link===addedPhotos[0] ? 2:1}>
          <img
            {...srcset(link.img, 121, link.rows, link.cols)}

            src={snap.backendurl+link}
            alt={''}
            loading="lazy"
          />
          
          <Tooltip title="Delete ">
            <button  onClick={ev => removePhoto(ev,link)} style={{padding:'2px',position:'absolute',top:'5px',right:'5px',bgcolor:'rgba(255,255,255)',color:'tomato',borderRadius:'100%',cursor:'pointer',border:'none'}}>
              <DeleteIcon fontSize="medium" sx={{}} /> 

            </button>
          </Tooltip>

          { link === addedPhotos[0] && (
          <Tooltip title="Main ">
              <CheckCircleIcon fontSize="medium" sx={{position:'absolute',top:'5px',left:'5px',bgcolor:'rgba(255,255,255)',color:'#42a5f5',borderRadius:'100%'}} /> 
          </Tooltip>    )
          }
           { link !== addedPhotos[0] && (
          <Tooltip title="Select as main ">
            <button   onClick={ev => selectAsMainPhoto(ev,link)} style={{padding:'2px',position:'absolute',top:'5px',left:'5px',bgcolor:'rgba(255,255,255)',color:'#42a5f5',borderRadius:'100%',cursor:'pointer',border:'none'}}>
            <CheckCircleOutlineIcon fontSize="medium" sx={{}} /> 


            </button>
          </Tooltip>    )
          }

          
          
          
        </ImageListItem>
      ))}
    </ImageList>
    </>
  );
}