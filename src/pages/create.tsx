import React, {useState, useEffect} from 'react'
import { EditableFlashcard } from '~/components/EditableFlashcard'
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import { Alert, Button, TextField } from '@mui/material'
import { useRouter } from 'next/router';
interface ICard {
    term: string,
    definition: string,

}
const Create: React.FC = () => {
  const {data: session} = useSession()
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const [flashcards, setFlashcards] = useState<ICard[]>(
    [{
    term: "",
    definition: ""
  }]
  )
  
  const setMutation = api.flashcards.createSet.useMutation()
  const flashcardsMutation = api.flashcards.createFlashcards.useMutation()
  const router = useRouter();
  if (!session?.user) return <div></div>;


  const createFlashcards = async () =>{
    if (!title){
      setError("Please enter a title.")
      return;
    }
    const set = await setMutation.mutateAsync({title})
    const cleanCards = removeEmptyFlashcards(flashcards);
    if (cleanCards.length<1){
      setError("Please fill in all fields.")
      return;
    }

    await flashcardsMutation.mutateAsync({flashcards: cleanCards, setId: set.id})
    await router.push("/set/"+set?.id);



    
  }

  const removeEmptyFlashcards = (flashcards: ICard[]) => {
    // check if any flashcards are empty and filter them out
      const cleanFlashcards: ICard[] = [];
      
      for(let i = 0; i<flashcards.length; i++){
        if (flashcards[i]?.term.trim() && flashcards[i]?.definition.trim()){
          flashcards[i] = {...flashcards[i] as ICard}
          cleanFlashcards.push(flashcards[i] as ICard);
          
        }
      }
      return cleanFlashcards;
    }

  return (
    <div className="flex flex-col w-3/4 m-auto mb-10">
      <div className="m-auto">
        <h1 className="text-xl mb-16 text-gray-600">Create A Flashcard Set</h1>
      </div>
      <TextField color="primary" inputProps={{style: {fontSize: 20}}} className="mb-10" id="filled-basic" label="Title" placeholder="Enter Title Here" value={title} onChange={(e) => setTitle(e.target.value)}/>

    {flashcards.map((flashcard, index)=> {
      return <div className="flex flex-col w-full m-auto mb-10 " key={index}>
        <EditableFlashcard term={flashcard.term} definition={flashcard.definition} flashcards={flashcards} setFlashcards={setFlashcards} idx={index}/>
        </div>
    })}
      
        {error && <Alert severity="error">{error}</Alert>}
        <Button className="w-1/3 m-auto" onClick={() => {
          setFlashcards([...flashcards, {term: '', definition: ''}])
        }}color="secondary">+ Add Card</Button>
        <Button className="w-1/3 m-auto mt-5" variant="outlined" onClick={() => void createFlashcards()} color="success">
  Create
</Button>
      
    </div>
  )
}



export default Create;

