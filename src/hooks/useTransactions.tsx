import { type } from "os";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";


interface transaction {
  id: number;
  title: string;
  amount: number,
  type: string,
  category: string,
  createdAT: string
}

type TransactionInput = Omit<transaction, "id" | "createdAT">;

interface TrasactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transaction: transaction[];
  creatTransaction: (transaction: TransactionInput) => Promise<void>;

}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);


export function TransactionsProvider({ children }: TrasactionsProviderProps) {
  const [trasactions, setTrasactions] = useState<transaction[]>([]);

  useEffect(() => {
    api.get('transactions').then(response =>
      setTrasactions(response.data.transactions))
  }, [])

  async function creatTransaction(transactionInput: TransactionInput) {
  const response = await api.post('/transactions', {
    ...transactionInput, 
    createdAT: new Date(),
  })
  const { transactions: transaction } = response.data;

  setTrasactions([
    ...trasactions,
    transaction,
  ]);
  }

  return (
    <TransactionsContext.Provider value={{ transaction: trasactions, creatTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context
}

