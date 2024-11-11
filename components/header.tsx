import { MainNav } from "./main-nav"
import UserButton from "./user-button"

export default function Header({
  API_URL
}) {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
        <MainNav />
        <UserButton API_URL={API_URL}/>
      </div>
    </header>
  )
}
