import { TextField } from '@mui/material'
import React, {SetStateAction, useState} from 'react'
interface ICard {
    term: string,
    definition: string,

}

interface Props {
    term: string, 
    definition: string, 
    flashcards:Array<ICard>, 
    setFlashcards: React.Dispatch<SetStateAction<ICard[]>>,
    idx: number,
}
export const EditableFlashcard: React.FC<Props> = ( {term, definition, flashcards, setFlashcards, idx} ) => {

  const [tterm, setTerm] = useState(term)
  const [ddefinition, setDefinition] = useState(definition)

  const findAndUpdateCard = (idx: number) => {
    flashcards[idx] = {term: tterm, definition: ddefinition}
    setFlashcards([...flashcards])
  }


  React.useEffect(() => {
    findAndUpdateCard(idx)
  }, [tterm, ddefinition])
  return (
    <div className='w-full flex flex-row'>
        <TextField className="w-1/2 h-50 mr-10" inputProps={{style: {fontSize: 20}}} placeholder="Term" value={term} onChange={(e) => {
            setTerm(e.target.value)



            }} id="outlined-basic" label="Term" variant="outlined" 
            multiline
            rows={6}
           
            />
       
        <TextField className="w-1/2 h-50" inputProps={{style: {fontSize: 20}}} placeholder="Definition" value={definition} onChange={(e) => {
            setDefinition(e.target.value)}} id="outlined-basic" label="Definition" variant="outlined" 
            multiline
            rows={6}
           
            />


    </div>
  )
}
