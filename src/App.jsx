import React, { useState } from 'react' 

import { Button, Col, Container, Row, Stack} from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import { UN_CATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpensesModal from './components/ViewExpensesModal';


const App = () => {

  

  let [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  let [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  let [showViewExpensesModal, setShowViewExpensesModal] = useState(false)
  
  let [budgetId,setBudgetId] = useState()

  const { budgets,expenses,getBudgetExpensesTotalAmount, getTotalAmount, getTotalMax,getBudgetExpenses } = useBudgets()
  
  
  const showBudgetExpensesModal = (budget_id) => {
    
    setBudgetId(budget_id)
    setShowAddExpenseModal(true)
    
  }
  
  const showExpensesModal = (budget_id) => {
    setBudgetId(budget_id)
    setShowViewExpensesModal(true)
  }
  
  return (
    <>
      <Container className='my-4'>

        <Stack direction="horizontal" className="mb-4" gap="2"> 
          <h1 className='display-4 fw-bold text-primary'>Budgets</h1>
          <Button variant="primary" className="ms-auto" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={() => showBudgetExpensesModal(UN_CATEGORIZED_BUDGET_ID)}>Add Expense</Button>
        </Stack>

        <Row>
        {
          budgets.map(budget => {
            
            const amount = getBudgetExpensesTotalAmount(budget.id)
            
            //we don't show unCategorized expenses if there is no unCategorized expenses
            // console.log('budet_id ',budget.id)
            
            if (budget.id === UN_CATEGORIZED_BUDGET_ID && getBudgetExpenses(budget.id).length === 0) {
              return
            }

            return (
            <Col sm={6} key={budget.id}>
              <BudgetCard 
                  // key={budget.id}
                  name={budget.name} 
                  amount={amount}
                  max={budget.max}
                  budget_id={budget.id}
                  showBudgetExpensesModal ={()=>showBudgetExpensesModal(budget.id)}
                  showExpensesModal = {()=>showExpensesModal(budget.id)}
              />
            </Col>
            )
          })
        }
          

          
        </Row>
        <Row>
          {
            
            expenses.length > 0 &&
            (<Col sm={6}>
                <BudgetCard 
                    name="Total" 
                    amount={getTotalAmount()}
                    max={getTotalMax() ? getTotalMax() : null}
                    budget_id={null}
                    showBudgetExpensesModal ={null}
                />
          </Col>)
          }
        </Row>
      </Container> 


      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
      <AddExpenseModal 
                       show={showAddExpenseModal}
                       handleClose={() => setShowAddExpenseModal(false)} 
                       budgetId={budgetId}
                       
      />  
      <ViewExpensesModal 
                      show={showViewExpensesModal}
                      handleClose={() => setShowViewExpensesModal(false)} 
                      budgetId={budgetId}
      />
    </>
  )
}

export default App