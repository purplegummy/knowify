import React from 'react'
import { FlashcardArray } from "react-quizlet-flashcard";

interface ICard {
  term: string,
  definition: string,
}
  interface Props {
    flashcards: ICard[]
}
interface IQCards {
 
    /**
     * Unique identifier for the card.
     */
    id: number;
    /**
     * HTML string for the front of the card.
     */
    frontHTML: string | JSX.Element;
    /**
     * HTML string for the back of the card.
     */
    backHTML: string | JSX.Element;
    /**
     * Styles for the front of the card.
     */
    frontCardStyle?: React.CSSProperties;
    /**
     * Styles for the content of the front facing card.
     */
    frontContentStyle?: React.CSSProperties;
    /**
     * Styles for the back of the card.
     */
    backCardStyle?: React.CSSProperties;
    /**
     * Styles for the content of the back facing card.
     */
    backContentStyle?: React.CSSProperties;
    /**
     * Class name for each card container.
     */
    className?: string;
    /**
     * Card Height in px|%|vh|vw.
     */
    height?: string;
    /**
     * Card Width in px|%|vh|vw.
     */
    width?: string;
    /**
     * Card border radius in px|%|vh|vw.
     * @default 1rem
     * @type string
     */
    borderRadius?: string;
    /**
     * Styles for the card container.
     */
    style?: React.CSSProperties;

}
  

export const Flashcards: React.FC<Props> = ( {flashcards} ) => {
   const contentStyles = {display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" } as React.CSSProperties
   const newCards: IQCards[]  = []
   let index =0;
   flashcards?.forEach((flash)=> {
     
      newCards.push({id: index, frontHTML: String(flash.term) , backHTML: String(flash.definition), backContentStyle: contentStyles, frontContentStyle: contentStyles })
      
      index++;

   })
   console.log(newCards)
  return (
    <div className="flex justify-center">
        <div className="w-1/2 h-1/2">
        <FlashcardArray cards={newCards}/>
        </div>

    </div>
  )
}
