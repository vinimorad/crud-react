import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal'
import { api } from '../../services/api';
import { Container } from './styles';

interface NewCadContainerModalProps {
  isOpen: boolean,
  onRequestClose: () => void;
  callHandleGetContainers: () => void;
  containersInformation: any;
  buttonEditContainersCliked: any
  handleFalseEditButtonContainer: () => void; 
}

export function NewCadContainerModal({isOpen, onRequestClose, callHandleGetContainers, containersInformation, buttonEditContainersCliked, handleFalseEditButtonContainer}: NewCadContainerModalProps) {
  const [client, setClient] = useState('')
  const [ID, setID] = useState('')
  const [type, setType] = useState(0)
  const [category, setCategory] = useState('')
  const [key, setKey] = useState('')
  const [state, setState] = useState('')

  const [warning, setWarning] = useState(false)

  async function handleCreateNewCadContainer(event: FormEvent) {
    event.preventDefault()

    const validContainer = /([A-z]{4})+([0-9]{7})/g

    const data = {
      key,
      client,
      ID,
      type,
      category,
      state
    }

    callHandleGetContainers()
    if(buttonEditContainersCliked){
      await api.put('/container', data).catch(error => console.log("Ops! Ocorrey um erro" + error))
      callHandleGetContainers()
      onRequestClose()
      
      
    }else{
      if(!validContainer.test(ID)){
        setWarning(true)
      }else{
        await api.post('/container', data).catch(error => console.log("Ops! Ocorrey um erro" + error))
  
        setWarning(false)
        callHandleGetContainers()
        clearForm()
      }
      
    }



  }

  function clearForm() {
    setClient('')
    setID('')
    setType(0)
    setCategory('')
    setState('')
    setWarning(false)
    handleFalseEditButtonContainer()
    onRequestClose();
  }

  useEffect(() => {
    if(buttonEditContainersCliked){
      setClient(`${containersInformation.Client}`)
      setID(`${containersInformation.ID_Container}`)
      setType(containersInformation.Type)
      setCategory(containersInformation.Category)
      setState(containersInformation.State)
      setKey(containersInformation.id)
    }
  }, [onRequestClose])

  // console.log(buttonEditContainersCliked)
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={clearForm}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      
      <button onClick={clearForm} className="react-modal-close">X</button>

      <Container onSubmit={handleCreateNewCadContainer}>
        <h1>Cadastrar Container</h1>

        <p>Client:</p>
        <input 
          type="text" 
          value={client}
          onChange={event => setClient(event.target.value)}
          required
        />

        <p>ID Container: {warning ? <span className="warning">Precisa conter 4 letrar e 7 números</span>: ''}</p>
        <input 
          type="text" 
          placeholder="TEST1234567"
          maxLength={11}
          value={ID}
          onChange={event => setID(event.target.value)}
        />

        <p>Tipos:</p>
        <select
          value={type}
          onChange={event => setType(Number(event.target.value))}
        >
          <option value="0">None</option>
          <option value="40">40</option>
          <option value="20">20</option>
        </select>

        <p>Categoria:</p>
        <select
          value={category}
          onChange={event => setCategory(event.target.value)}
        >
          <option value="None">None</option>
          <option value="Importação">Importação</option>
          <option value="Exportação">Exportação</option>
        </select>

        <p>Status:</p>
        <select
          value={state}
          onChange={event => setState(event.target.value)}
        >
          <option value="None">None</option>
          <option value="Cheio">Cheio</option>
          <option value="Vazio">Vazio</option>
        </select>

        {buttonEditContainersCliked ? <button id="bt-edit" type="submit">Salvar</button> : <button type="submit">Cadastrar</button>}

      </Container>
      


    </Modal>
  )
}