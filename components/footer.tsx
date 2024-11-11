import CustomLink from "./custom-link"
import packageJSON from "next-auth/package.json"

export default function Footer() {
  return (
    <footer className="mx-0 my-4 flex w-full flex-col gap-4 px-4 text-sm sm:mx-auto sm:my-12 sm:h-5 sm:max-w-3xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <CustomLink href="http://10.41.57.17/">Intranet</CustomLink>
        <CustomLink href="https://cmc.eb.mil.br/pt/">Site do Colégio</CustomLink>
      </div>
      <div className="flex items-center justify-start gap-2">
        <img
          className="size-5"
          src="https://authjs.dev/img/logo-sm.png"
          alt="Auth.js Logo"
        />
        <CustomLink href="https://npmjs.org/package/next-auth">
          Protegido por NextAuth {packageJSON.version}
        </CustomLink>
      </div>
    </footer>
  )
}
