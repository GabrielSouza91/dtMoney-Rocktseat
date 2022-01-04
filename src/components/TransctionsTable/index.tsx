import { useContext, useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { api } from "../../services/api";
import { Container } from "./style";

export function TransctionTable() {
  const { transaction } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transaction.map(trasactions => {
            return (
              <tr key={trasactions.id}>
                <td>{trasactions.title}</td>
                <td className={trasactions.type}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(trasactions.amount)}
                </td>
                <td>{trasactions.category}</td>
                <td> {new Intl.DateTimeFormat('pt-BR', {
                }).format(
                  new Date(trasactions.createdAT)
                )}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>

  );
}