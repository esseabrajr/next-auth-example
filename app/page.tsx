import CustomLink from "@/components/custom-link"
import { auth } from "auth"
import Apresentacao from '@/components/sistemas/Apresentacao'
import Agendamento from '@/components/sistemas/Agendamento'
import SystemCard from '@/components/sistemas/SystemCard'

const fetchUserData = async (user:string) => {
  const API_URL = process.env.PRISMA_URL
  const result = await fetch (`${API_URL}/user/${user}`);
  const data = await result.json()
  return (data)
}

export default async function Index() {
  const session = await auth()

  if (session?.user){
    const userData = await fetchUserData(session?.user.name)
    return (
      <div className="container-fluid">
        <h3 className="text-center">Bem-vindo {userData.posto_grad.descricao} {userData.nome_completo}</h3>
        <div className="row">
        <SystemCard 
          title="Apresentação"
          img="/continencia.webp"
          link="http://10.41.57.44/sistemas/apresentacao/inicial.php"
        />
        <SystemCard 
          title="Agendamento"
          img="/instalacao_1.png"
          link="/agenda/1"
        />
        </div>
      </div>
    )
  }else{
    return(
      <h3 className="text-center">Usuário não autenticado</h3>
    )
  }

}
