import { Button } from "./styles"

interface MovimentProps {
  handleOpenMovimentModal: () => void;
}

export function Moviment({handleOpenMovimentModal}: MovimentProps) {
  return (
    <Button onClick={handleOpenMovimentModal}>Movimentações</Button>
  )
}