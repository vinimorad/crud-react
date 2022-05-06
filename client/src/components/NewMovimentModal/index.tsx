import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal'
import { api } from '../../services/api';
import { Container } from './styles';

interface Containers {
  id: number,
  ID_Container: string,
  Category: string,
  Type: number,
  State: string,
  Client: string
}

interface NewCadContainerModalProps {
  isOpen: boolean,
  onRequestClose: () => void;
  callHandleGetMoviments: () => void;
  movimentsInformation: any;
  buttonEditMovimentsCliked: any
  container: Containers[],
  handleFalseEditButtonMoviment: () => void; 
}

export function NewMovimentModal({isOpen, onRequestClose, callHandleGetMoviments, container, movimentsInformation, buttonEditMovimentsCliked, handleFalseEditButtonMoviment}: NewCadContainerModalProps) {
  const [TypeOfMoviment, setTypeOfMoviment] = useState('')
  const [StartDateAndTime, setStartDateAndTime] = useState('')
  const [EndDateAndTime, seEndDateAndTime] = useState('')
  const [key, setKey] = useState('')
  const [containerId, setContainerId] = useState('')

  async function handleCreateNewMoviment(event: FormEvent) {
    event.preventDefault()


    const data = {
      key,
      TypeOfMoviment,
      StartDateAndTime,
      EndDateAndTime,
      containerId,
    }

    if(buttonEditMovimentsCliked){
      await api.put('/moviment', data).catch(error => console.log("Ops! Ocorrey um erro" + error))
      callHandleGetMoviments()
      onRequestClose()

    }else{
      await api.post('/moviment', data).catch(error => console.log("Ops! Ocorrey um erro" + error))
  

      callHandleGetMoviments()
      clearForm()
    }
      
    



  }

  function clearForm() {
    setTypeOfMoviment('')
    setStartDateAndTime('')
    seEndDateAndTime('')
    setContainerId('')
    handleFalseEditButtonMoviment()
    onRequestClose();
  }

  useEffect(() => {
    if(buttonEditMovimentsCliked){
      setTypeOfMoviment(`${movimentsInformation.TypeOfMoviments}`)
      setStartDateAndTime(`${movimentsInformation.StartDateAndTime}`)
      seEndDateAndTime(movimentsInformation.EndDateAndTime)
      setKey(movimentsInformation.id)
      setContainerId(movimentsInformation.ID_Container)
    }
  }, [onRequestClose])


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={clearForm}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      
      <button onClick={clearForm} className="react-modal-close">X</button>

      <Container onSubmit={handleCreateNewMoviment}>
        <h1>Cadastrar Movimentação</h1>

        <p>Tipo de Movimentação</p>
        <select
          required
          value={TypeOfMoviment}
          onChange={event => setTypeOfMoviment(event.target.value)}
        >
          <option value="" disabled>Selecione uma Opção</option>
          <option value="Embarque">Embarque</option>
          <option value="Descarga">Descarga</option>
          <option value="Gate in">Gate in</option>
          <option value="Gate out">Gate out</option>
          <option value="Reposicionamento">Reposicionamento</option>
          <option value="Pesagem">Pesagem</option>
          <option value="Scanner">Scanner</option>
        </select>

        <p>ID Container:</p>
        <select
          required
          value={containerId}
          onChange={event => setContainerId(event.target.value)}
        >
          <option value="" disabled>Selecione uma Opção</option>
          {container.map((container) => {
            return <option key={container.ID_Container} value={container.ID_Container}>{container.ID_Container}</option>
          })}
        </select>
        

        <p>Data e Hora do Início:</p>
        <input 
          type="text" 
          value={StartDateAndTime}
          onChange={event => setStartDateAndTime(event.target.value)}
        />

        <p>Data e Hora do Fim</p>
        <input 
          type="text" 
          value={EndDateAndTime}
          onChange={event => seEndDateAndTime(event.target.value)}
        />

        {buttonEditMovimentsCliked ? <button id="bt-edit" type="submit">Salvar</button> : <button type="submit">Cadastrar</button>}

      </Container>
      


    </Modal>
  )
}


