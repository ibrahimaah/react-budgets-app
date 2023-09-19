import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter, getCardColor } from "../utils";
import { useState } from "react";
import { useEffect } from "react";
import { UN_CATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";


export default function BudgetCard({name , amount, max, budget_id, showBudgetExpensesModal ,showExpensesModal}) {
  const { getBudgetById, addBudget, deleteItem, code, t} =useBudgets();

  
  
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
        name : 'UnCategorized',
        max: null
      })
    }
  },[])
  

  const deleteBudget = (budget_id) => {
    if (confirm("Are you sure ?") == true){
      deleteItem({id:budget_id,item_type:'budget'})
    } 
    else {
      return
    }
    
  }
  return (
    <Card style={{ width: '100%' }} className={"mb-4 bg-opacity-10 bg-"+cardState}>
      
        <Card.Body>

          <Card.Title className={`d-flex justify-content-between align-items-baseline ${code ==='ar' ? 'flex-row-reverse' : ''}`}>
              <p className="display-6 text-secondary">
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

          {
            budget_id &&
            (<Stack direction="horizontal" gap={3} className={code==='ar' ? 'flex-row-reverse' : ''}>
              <Button className='btn-sm' variant="outline-primary"  onClick={()=>showBudgetExpensesModal(budget_id)}>{t('addExpense')}</Button>
              <Button className='btn-sm' variant="outline-secondary" onClick = {() => showExpensesModal(budget_id) }>{t('viewExpenses')}</Button>
              { (budget_id !== UN_CATEGORIZED_BUDGET_ID)  && (<Button 
                  variant="outline-danger" 
                  className={`m${code==='ar' ? 'e' : 's'}-auto btn-sm`}  
                  onClick = {() => deleteBudget(budget_id) }>{t('delete')}</Button>) }
            </Stack>)
          }
        </Card.Body>
    </Card>
  )
}
