import { auth } from "auth"
import { SessionProvider } from "next-auth/react"
import Agenda from "@/components/Agenda"

export default async function ClientPage({params}) {
  
  const INSTALACAO = (await params).id
  const API_URL = process.env.PRISMA_URL
  const session = await auth()

  const fetchUsers = async (user) => {
    const result = await fetch (`${API_URL}/users`);
    const data = await result.json()
    return (data)
  }

  const fetchUserData = async (user) => {
    const result = await fetch (`${API_URL}/user/${user}`);
    const data = await result.json()
    return (data)
  }

  const fetchLocal = async (id) => {
    const result = await fetch (`${API_URL}/instalacoes/${id}`);
    const data = await result.json()
    return (data)
  }

  if (session){
    const userData = await fetchUserData(session?.user.name);
    const usersData = await fetchUsers()
    const local = await fetchLocal(INSTALACAO)

    if (local !== null){
      return (
        <SessionProvider basePath={"/auth"} session={session}>
          <Agenda user={userData} local={local} users={usersData} API_URL={API_URL}/>
        </SessionProvider>
        )
    }else{
      return(
        <p>Instalação id {INSTALACAO} não encontrada</p>
      )
    }
  }else{
    //redirect('http://10.41.56.130:3000/login/signin?callbackUrl=http%3A%2F%2F10.41.56.130%3A3000%2F')
  }
}