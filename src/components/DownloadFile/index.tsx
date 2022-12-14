import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './index.module.scss';
import JsFileDownloader from 'js-file-downloader';
import AlertDialog from '../DialogAlert/index'

const DownloadFileComponent = () => {
  const [value, setValue] = useState('')
  const [extension, setExtension] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const rexFirstLvl = /^(http|https)\:\/\/[^\/]+/gm
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
    .catch(handlerError);
  }

  const handlerError = () => {
    setShowErrorMessage('An error has occurred. Please enter another url')
  }
  const onChangeValue = (val: string) => {
    if(!!showErrorMessage){
      setShowErrorMessage('')
    }
    setValue(val)
  }

  const handleClickOpen = () => {
    if(!!value) {
      setOpen(true);
    } else{
      setShowErrorMessage('please enter url')
    }
  };

  const handleAgree = () => {
    setOpen(false)
    onDownloadFile()
  }

  return (
    <div className={styles.flexCol}>
    <div className={styles.txtFieldWrap}>

      <TextField id="standard-basic"
        defaultValue={value}
        label="URL file"
        variant="standard"
        onChange={(e) => {onChangeValue(e.target.value)}}/>

      <Button
        variant="contained"
        onClick={handleClickOpen}>Download File</Button>
        <AlertDialog 
        isOpen={open}
        setOpen={setOpen}
        handleAgree={handleAgree}
        />
        
    </div>

    { showErrorMessage ? 
          <p className={styles.errorMessge}>{showErrorMessage}</p>
          : <></>
        }
    </div>
  )
}

export default DownloadFileComponent;