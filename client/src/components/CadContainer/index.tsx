import { Button } from "./styles";


interface CadContainerProps {
  onOpenCadContainerModal: () => void
}

export function CadContainer({onOpenCadContainerModal}: CadContainerProps) {
  return (
    <Button onClick={onOpenCadContainerModal}>Cadastrar Container</Button>
  )
}