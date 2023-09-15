import { Button, Card, ProgressBar } from "react-bootstrap";
import { currencyFormatter, getCardColor } from "../utils";
import { useState } from "react";
import { useEffect } from "react";
import { UN_CATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";

export default function BudgetCard({name , amount, max, budget_id, showBudgetExpensesModal }) {
  const { getBudgetById, addBudget } =useBudgets();

  // console.log(max)
  
  const[cardState,setCardState] = useState(()=>{
    return getCardColor(amount,max)
  })

  
  useEffect(()=>{
    setCardState(getCardColor(amount,max))
  },[amount,max,cardState])
  
  
  //initialize UnCategorized BudgetCard
  useEffect(()=>{
    let UnCategorizedBudget = getBudgetById(UN_CATEGORIZED_BUDGET_ID)
    if (!UnCategorizedBudget) {
      addBudget({
        name : 'UnCategorized Expenses',
        max: null
      })
    }
  },[])
  

  
  return (
    <Card style={{ width: '100%' }} className={"mb-4 bg-opacity-10 bg-"+cardState}>
      
        <Card.Body>

          <Card.Title className="d-flex justify-content-between align-items-baseline">
              <p className="me-auto display-6 text-secondary">
                  {name}
              </p>
              <div className="d-flex align-items-baseline">
                  <span className={"fs-2 text-"+cardState}>{currencyFormatter(amount)}</span>  
                  { max && (<>
                    <span className="fs-2 text-muted mx-1">/</span>
                    <span className="fs-4 text-muted">{currencyFormatter(max)}</span>
                  </>)}
              </div>
          </Card.Title>
          
          {
            max && (
              <ProgressBar now={amount}
                       min={0}
                       max={max}
                       variant={cardState}
                       className="my-4 rounded-pill"
              />
            )
          }

          <Button variant="outline-primary" className="ms-auto me-3" onClick={()=>showBudgetExpensesModal(budget_id)}>Add Expense</Button>
          <Button variant="outline-secondary">View Expenses</Button>
        </Card.Body>
    </Card>
  )
}
