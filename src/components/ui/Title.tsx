import { Wallet } from 'lucide-react'


export const Title = () => {
  return (
    <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center flex items-center justify-center">
      <Wallet className="mr-2 h-8 w-8" />
      Administrador de Gastos
    </h1>
  )
}
