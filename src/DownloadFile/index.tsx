import { dividerClasses } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './index.module.scss'

const DownloadFileComponent = () => {
  const [value, setValue] = useState('')
  const [extension, setExtension] = useState('')
  const rexIllicitFile = /\.(js|php|html|htmlx|css)$/gm;
  const rexFirstLvl = /^(http|https)\:\/\/[^\/]+/gm


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
      console.log(res.headers.get('content-type'))
      return res.blob()
    })
    .then((blob) => {
       const link = document.createElement("a");
                link.download = 'filename';

          link.href = URL.createObjectURL(blob);
    console.log(link)
          document.body.appendChild(link);
          // link.download = 'filename';
          link.click();

      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    })
    .catch(console.error);
  }

  const onChangeValue = (val: string) => {
    setValue(val)
  }

  return (
    <div className={styles.txtFieldWrap}>
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