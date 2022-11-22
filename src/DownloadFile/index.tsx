import { dividerClasses } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const DownloadFileComponent = () => {
  const [value, setValue] = useState('')
  const [extension, setExtension] = useState('')
  const rexIllicitFile = /\.(js|php|html|htmlx|css|)$/gm;
  const rexFirstLvl = /^(http|https)\:\/\/[^\/]+/gm


  useEffect(() => {
    console.log(!rexIllicitFile.test(value))
    if(!rexIllicitFile.test(value)) {
      console.log(!rexFirstLvl.test(value))
    }
  }, [value])

  const onDownloadFile = () => {


//     fetch( value, { 
//       method: 'get', 
//       mode: 'no-cors', 
//       referrerPolicy: 'no-referrer',

//     },
//     )
//     .then(response => {
//       console.log(response)
//       return response.blob()
//     })
//     .then(res => {
//       const link = document.createElement("a");
//             link.download = 'filename';

//       link.href = URL.createObjectURL(res);
// console.log(link)
//       // document.body.appendChild(link);
//       // link.download = 'filename';
//       link.click();

//       // URL.revokeObjectURL(link.href);
//       // document.body.removeChild(link);
//   })
//   .catch(console.error);
//   console.log('файл не найден')
  }

  const onChangeValue = (val: string) => {
    setValue(val)
  }

  return (
    <div>
      <TextField id="standard-basic"
        defaultValue={value}
        label="Standard"
        variant="standard"
        onChange={(e) => {onChangeValue(e.target.value)}}/>

      <Button
        variant="contained"
        onClick={onDownloadFile}>Download File</Button>
    </div>
  )
}

export default DownloadFileComponent;