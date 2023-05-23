import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const {data: session} = useSession()

  return (
    <>
  <div className="">
    

      {session?.user && <button onClick={() => void signOut()}>Sign Out</button>}

     
    
  </div>


    </>
  );
};
export default Home;