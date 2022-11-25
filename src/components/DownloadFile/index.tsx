import { dividerClasses } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './index.module.scss'
import JsFileDownloader from 'js-file-downloader';
import AlertDialog from '../DialogAlert/index'

const DownloadFileComponent = () => {
  const [value, setValue] = useState('')
  const [extension, setExtension] = useState('')
  const [IsErrorMessage, setIsErrorMessage] = useState(false);
  const [open, setOpen] = useState(false);

  const rexIllicitFile = /\/([a-zA-Z]+)$/gm;


  //  a library with a ready-made solution is connected to check the work of downloading a file from a URL
  const downloadFile = () => {
    new JsFileDownloader({ 
      url: value,
    }).then(function () {
      // Called when download ended
    })
    .catch(function (error) {
      // Called when an error occurred
    });
  
  }
  // this is my solution
  const onDownloadFile = () => {
    const myHeaders = new Headers();
    myHeaders.append("content-type",  'application/x-www-form-urlencoded');
    const myRequest = new Request(value, {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    });

    fetch(myRequest)
    .then((res) => {
      let fileExtension = res.headers.get('content-type')?.toString()
      console.log()
      if(!!fileExtension) {
        let getExtension = rexIllicitFile.exec(fileExtension)
        setExtension(getExtension ? getExtension[1] : '');
      }
      return res.blob()
    })
    .then((blob) => {
      const link = document.createElement("a");
      link.download = `filename.${extension}`;

      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    })
    .catch(console.error);
  }

  const onChangeValue = (val: string) => {
    setValue(val)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className={styles.txtFieldWrap}>
      <TextField id="standard-basic"
        defaultValue={value}
        label="URL file"
        variant="standard"
        onChange={(e) => {onChangeValue(e.target.value)}}/>

      <Button
        variant="contained"
        onClick={() => handleClickOpen()}>Download File</Button>
        {/* <AlertDialog isOpen={open}/> */}
        {
          open ? <AlertDialog /> : ''
        }
    </div>
  )
}

export default DownloadFileComponent;