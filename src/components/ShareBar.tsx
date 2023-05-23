import { Button } from '@mui/material'
import React from 'react'

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
interface Props {
    url: string,
    setId: string
}
export const ShareBar: React.FC<Props> = ({url, setId}) => {
  const onClickHandler = async() => {
    
    await navigator.clipboard.writeText(url+setId)
  }
  return (
    <div className="flex flex-row m-auto">
            <Button onClick={void onClickHandler()}className="ml-[38em] mt-10" variant="outlined" endIcon={<ContentCopyIcon/>}>
  Copy Link
</Button>
    </div>
  )
}
