import { useRouter } from "next/router";

interface Props {
    id: string,
    title: string,
}

export const UserFlashcardLink: React.FC<Props> = ( {id, title} ) => {
    const onClickHandler = async () => {
        await router.push("/set/"+id);
    }
    const router = useRouter();
    return (
        <div className="w-1/4 h-10 bg-black"onClick={void onClickHandler()}>
            <h1>{title}</h1>
      
        </div>
    )
}