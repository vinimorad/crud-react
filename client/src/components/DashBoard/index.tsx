import { useEffect, useState } from "react";
import Modal from "react-modal";
import { api } from "../../services/api";
import { groupByKey } from "../../utils/array";
import { CadContainer } from "../CadContainer";
import { Moviment } from "../Moviment";
import { NewCadContainerModal } from "../NewCadContainerModal";
import { NewMovimentModal } from "../NewMovimentModal";
import { ReportMoviment } from "../ReportMoviment";
import { Container, Content } from "./styles";


interface Containers {
  id: number,
  ID_Container: string,
  Category: string,
  Type: number,
  State: string,
  Client: string
}

interface Moviments {
  client: string,
  id: number,
  ID_Container: string,
  TypeOfMoviments: string,
  StartDateAndTime: string,
  EndDateAndTime: string
}


Modal.setAppElement('#root')

export function DashBoard() {
  const [searchContainer, setSearchContainer] = useState('')

  const [isCadContainer, setCadContainer] = useState(false)

  const [containers, SetContainers] = useState<Containers[]>([])

  const [containersInformation, setContainersInformation] = useState({})

  const [buttonEditContainersCliked, setButtonEditContainersCliked] = useState(false)



  const [searchMoviment, setSearchMoviment] = useState('')

  const [isMoviment, setMoviment] = useState(false) 

  const [moviments, setMoviments] = useState<Moviments[]>([])

  const [movimentsInformation, setMovimentsInformation] = useState({})

  const [buttonEditMovimentsCliked, setButtonEditMovimentsCliked] = useState(false)


  







  const [showCadContainer, setShowCadContainer] = useState(false)

  const [showMoviment, setShowMoviment] = useState(false)

  const [showReportMoviment, setShowReportMoviment] = useState(false)


  function handleOpenCadContainer() {
    setShowReportMoviment(false)
    setShowMoviment(false)
    setShowCadContainer(true)
    setCadContainer(true)
  }

  function handleOpenMovimentModal() {
    setShowReportMoviment(false)
    setShowCadContainer(false)
    setShowMoviment(true)
    setMoviment(true)
  }

  function handleOpenReportMoviment() {
    setShowMoviment(false)
    setShowCadContainer(false)
    setShowReportMoviment(true)
  }

  function handleCloseCadContainer() {
    setCadContainer(false)
  }

  function handleCloseMoviment() {
    setMoviment(false)
  }


  function handleEditCadContainerModal(container : Containers) {
    setContainersInformation(container)
    setCadContainer(true)
    setButtonEditContainersCliked(true)

    return container
  }

  function handleEditMovimentModal(moviment : Moviments) {
    setMovimentsInformation(moviment)
    setMoviment(true)
    setButtonEditMovimentsCliked(true)

    return moviment
  }

  function handleFalseEditButtonContainer() {
    setButtonEditContainersCliked(false)
  }

  function handleFalseEditButtonMoviment() {
    setButtonEditMovimentsCliked(false)
  }

  async function handleGetContainers() {
    const {data} = await api.get('/container')
    SetContainers(data)
    
    return data

  }

  async function handleDeleteContainers(id : number) {
    const newState = containers.filter(container => container.id !== id)
    await api.delete('/container/' + id).then(response => {
      if(response.status == 200){
        SetContainers(newState)
      }
    })
  }

  async function handleGetMoviments() { 
    const {data} = await api.get('/moviment')
    setMoviments(data)

    return data
  }

  async function handleDeleteMoviments(id : number) {
    const newState = moviments.filter(moviment => moviment.id !== id)
    await api.delete('/moviment/' + id).then(response => {
      if(response.status == 200){
        setMoviments(newState)
      }
    })
  }

  useEffect(() => {
    handleGetContainers()
    handleGetMoviments()
  }, [])

  return (
    <Container>
      <Content>
        <CadContainer onOpenCadContainerModal={() => handleOpenCadContainer()}/>
        <Moviment handleOpenMovimentModal={handleOpenMovimentModal}/>
        <ReportMoviment handleOpenReportMoviment={handleOpenReportMoviment}/>
      </Content>

      <NewCadContainerModal
        isOpen={isCadContainer}
        onRequestClose={handleCloseCadContainer}
        callHandleGetContainers={handleGetContainers}
        containersInformation={containersInformation}
        buttonEditContainersCliked={buttonEditContainersCliked}
        handleFalseEditButtonContainer={handleFalseEditButtonContainer}
      />

      <NewMovimentModal
        isOpen={isMoviment}
        onRequestClose={handleCloseMoviment}
        callHandleGetMoviments={handleGetMoviments}
        movimentsInformation={movimentsInformation}
        buttonEditMovimentsCliked={buttonEditMovimentsCliked}
        handleFalseEditButtonMoviment={handleFalseEditButtonMoviment}
        container={containers}
      />

      { showCadContainer ?
        <>
          <input
            type="text"
            placeholder="Pesquisar por Cliente"
            value={searchContainer}
            onChange={event => setSearchContainer(event.target.value)} />
            <div id="table">
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>ID Container</th>
                    <th>Categoria</th>
                    <th>Status</th>
                    <th>Tipo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {containers.filter(container => {
                    return (!searchContainer.trim()) || (container.Client.toLowerCase().includes(searchContainer.toLowerCase()));

                  }).map((container, id) => {
                    return (
                      <tr key={id}>
                        <td>{container.Client}</td>
                        <td>{container.ID_Container}</td>
                        <td>{container.Category}</td>
                        <td>{container.State}</td>
                        <td>{container.Type}</td>
                        <td><button onClick={() => handleDeleteContainers(container.id)}>Deletar</button><button onClick={() => handleEditCadContainerModal(container)}>Editar</button></td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
        </>

        :
        ''
      }

      { showMoviment ?
        <>
          <input
            type="text"
            placeholder="Pesquisar por Cliente"
            value={searchMoviment}
            onChange={event => setSearchMoviment(event.target.value)} />
            <div id="table">
              <table>
                <thead>
                  <tr>
                    <th>Tipo de Movimentação</th>
                    <th>Data e Hora do Início</th>
                    <th>Data e Hora do Fim</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {moviments.filter(moviment => {
                    return (!searchMoviment.trim()) || (moviment.TypeOfMoviments.toLowerCase().includes(searchMoviment.toLowerCase()));

                  }).map((moviment, id) => {
                    return (
                      <tr key={id}>
                        <td>{moviment.TypeOfMoviments}</td>
                        <td>{moviment.StartDateAndTime}</td>
                        <td>{moviment.EndDateAndTime}</td>
                        <td><button onClick={() => handleDeleteMoviments(moviment.id)}>Deletar</button><button onClick={() => handleEditMovimentModal(moviment)}>Editar</button></td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
        </>

        :
        ''

      }

      { showReportMoviment?
        <>
          <div id="table">
              <h2>Relatórios de Importação</h2>
              <table>
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  { Object.entries(groupByKey(moviments, "TypeOfMoviments")).map(([key, items], id) => {
                    return (
                      <tr key={id}>
                       <td>{key}</td>
                       <td>{items.length}</td>
                      </tr>
                    )
                  
                  })



                  }

                </tbody>
              </table>
            </div>
        
        
        </>

        :

        ''
        

      }
    </Container>
  )
} 