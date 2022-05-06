import { Button } from "./styles"

interface OpenReportMovimentProps {
  handleOpenReportMoviment: () => void
}

export function ReportMoviment({handleOpenReportMoviment}:OpenReportMovimentProps ) {
  return (
    <Button onClick={handleOpenReportMoviment}>Relatório de Movimentações</Button>
  )
}