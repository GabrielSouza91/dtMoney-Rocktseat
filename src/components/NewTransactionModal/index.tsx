import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './style';
import CloseImg from '../../assets/close.svg';
import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState, useContext } from 'react';
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionsModal({ isOpen, onRequestClose }: NewTransactionModalProps) { 
  const {creatTransaction} = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState("deposit");


  async function handleCreateNewTranssaction(event: FormEvent) {
    event.preventDefault();
     
   await creatTransaction({
      title,
      amount,
      category,
      type
    });


    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();

  }

  return (
    <Modal isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <button type='button'
        onClick={onRequestClose}
        className='react-modal-close'>
        <img src={CloseImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTranssaction}>
        <h2>Cadrastar Transferencia</h2>

        <form action="">

          <input type="text" placeholder='Título'
           value={title} 
           onChange={event => setTitle(event.target.value)}
           />

          <input type="number" placeholder='Valor' 
           value={amount} 
           onChange={event => setAmount(Number(event.target.value))}
          />

          <TransactionTypeContainer>

            <RadioBox
              type='button'
              onClick={() => { setType('deposit') }}
              isActive={type === 'deposit'} 
              activeColor="green"
              >
              <img src={IncomeImg}
                alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox 
            type='button'
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor="red"
            >
              <img src={OutcomeImg} alt="Saída"  />
              <span>Saída</span>
            </RadioBox>

          </TransactionTypeContainer>

          <input type="text" placeholder='Categoria' 
          value={category} 
          onChange={event => setCategory(event.target.value)}
          />
          <button type="submit">Cadrastrar</button>
        </form>

      </Container>
    </Modal>


  );
}