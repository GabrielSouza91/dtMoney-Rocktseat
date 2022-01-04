import { Container } from "../Deashbord/styles";
import { Summary } from "../Summary";
import { TransctionTable } from "../TransctionsTable";

export function Deashbord(){
  return(
    <Container>
      <Summary />
      <TransctionTable />
    </Container>
  );
}