import React from 'react'
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { UserFlashcardLink } from '~/components/UserFlashcardLink';
const UserPage = () => {
 const router = useRouter();
 const { id } = router.query;
 const sets = api.flashcards.getUserSets.useQuery({id: id as string})
  return (
    <div>
        {sets?.data?.map((set, idx)=> {
            return <UserFlashcardLink key={idx} id={set?.id} title={set?.title}></UserFlashcardLink>

        })}
    </div>
  )
}

export default UserPage;
