


// 2. query a set with id from the url

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Flashcards } from "~/components/Flashcards";
import { ShareBar } from "~/components/ShareBar";
import { api } from "~/utils/api";

// 3. map through each of the flashcards in the set and use the Flashcard Component to display
const Set = () => {
    const router = useRouter();
    const { id } = router.query;
    const set = api.flashcards.getFlashcardsById.useQuery({
        id: id as string,
      });
    const flashcards = set?.data?.cards;
    if (!flashcards) {
        return <div>
            No Set Exists With That Id!
        </div>
    }
  
    return <div>
        <Flashcards flashcards={flashcards}/>
        <ShareBar url={"http://localhost:3000/set/"} setId={id as string}/>
    </div>
}

export default Set;