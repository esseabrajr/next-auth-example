import { auth } from "auth"
import { SessionProvider } from "next-auth/react"
import Rango from "@/components/Rango"

export default async function ClientPage({params}) {
  
  const INSTALACAO = 1
  const API_URL = process.env.PRISMA_URL
  const session = await auth()

  const fetchUserData = async (user) => {
    const result = await fetch (`${API_URL}/user/${user}/rango`);
    const data = await result.json()
    return (data)
  }


  if (session){
    const userData = await fetchUserData(session?.user.name);

      return (
        <SessionProvider basePath={"/auth"} session={session}>
          <Rango user={userData} API_URL={API_URL}/>
        </SessionProvider>
        )
  }else{
    //redirect('http://10.41.56.130:3000/login/signin?callbackUrl=http%3A%2F%2F10.41.56.130%3A3000%2F')
  }
}