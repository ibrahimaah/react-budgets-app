import { Button, Card, ProgressBar } from "react-bootstrap";
import { currencyFormatter, getCardColor } from "../utils";
import { useState } from "react";
import { useEffect } from "react";

export default function BudgetCard({name , amount, max, budget_id, showBudgetExpensesModal }) {

  // alert('render')

  let ratio = amount / max ;
  
  const[cardState,setCardState] = useState(()=>{
    return getCardColor(ratio)
  })

  
  useEffect(()=>{
    setCardState(getCardColor(ratio))
  },[ratio,cardState])
  
  
  

  
  return (
    <Card style={{ width: '100%' }} className={"mb-4 bg-opacity-10 bg-"+cardState}>
      
        <Card.Body>

          <Card.Title className="d-flex justify-content-between align-items-baseline">
              <p className="me-auto display-6 text-secondary">
                  {name}
              </p>
              <div className="d-flex align-items-baseline">
                  <span className={"fs-2 text-"+cardState}>{currencyFormatter(amount)}</span>  
                  <span className="fs-2 text-muted mx-1">/</span>
                  <span className="fs-4 text-muted">{currencyFormatter(max)}</span>
              </div>
          </Card.Title>
          
          <ProgressBar now={amount}
                       min={0}
                       max={max}
                       variant={cardState}
                       className="my-4 rounded-pill"
          />

          <Button variant="outline-primary" className="ms-auto me-3" onClick={()=>showBudgetExpensesModal(budget_id)}>Add Expense</Button>
          <Button variant="outline-secondary">View Expenses</Button>
        </Card.Body>
    </Card>
  )
}
