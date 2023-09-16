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

  const { budgets,getBudgetExpensesTotalAmount, getTotalAmount, getTotalMax,getBudgetExpenses } = useBudgets()
  
  let unCategoricalExpenses = getBudgetExpenses(UN_CATEGORIZED_BUDGET_ID)
  
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

        <Stack direction="horizontal" className="mb-4" gap={3}> 
          <h1 className='display-4 fw-bold text-primary'>Budgets</h1>
          <Button variant="primary" className="ms-auto" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={() => showBudgetExpensesModal(UN_CATEGORIZED_BUDGET_ID)}>Add Expense</Button>
        </Stack>

        <Row className='justify-content-center'>
        {
          budgets.map(budget => {
            
            const amount = getBudgetExpensesTotalAmount(budget.id)
            
            //we don't show unCategorized expenses if there is no unCategorized expenses
            
            if (budget.id === UN_CATEGORIZED_BUDGET_ID && getBudgetExpenses(budget.id).length === 0) {
              return
            }

            return (
            <Col sm={budget.id === UN_CATEGORIZED_BUDGET_ID ? 8 : 6} key={budget.id}>
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
        <Row className='justify-content-center'>
          {
            //total budget should appear only if we have at least two categorical budgets
            (budgets.length > 1 && unCategoricalExpenses.length > 0 ||
            budgets.length > 2 && unCategoricalExpenses.length === 0) &&
            (<Col sm={8}>
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


      <AddBudgetModal 
                      show={showAddBudgetModal} 
                      handleClose={() => setShowAddBudgetModal(false)}/>
      <AddExpenseModal 
                      show={showAddExpenseModal}
                      handleClose={() => setShowAddExpenseModal(false)} 
                      budgetId={budgetId}/>  
      <ViewExpensesModal 
                      show={showViewExpensesModal}
                      handleClose={() => setShowViewExpensesModal(false)} 
                      budgetId={budgetId}/>
    </>
  )
}

export default App