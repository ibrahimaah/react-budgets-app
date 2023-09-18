import React, { useState } from 'react' 

import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import { UN_CATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpensesModal from './components/ViewExpensesModal';
import '../src/index.css'
const App = () => {

  let [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  let [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  let [showViewExpensesModal, setShowViewExpensesModal] = useState(false)
  
  let [budgetId,setBudgetId] = useState()

  const { budgets,
          getBudgetExpensesTotalAmount,
          getTotalAmount,
          getTotalMax,
          getBudgetExpenses,
          code,
          setCode,
          t,
          i18n } = useBudgets()
          
  


  let unCategoricalExpenses = getBudgetExpenses(UN_CATEGORIZED_BUDGET_ID)
  
  const showBudgetExpensesModal = (budget_id) => {
    
    setBudgetId(budget_id)
    setShowAddExpenseModal(true)
    
  }
  
  const showExpensesModal = (budget_id) => {
    setBudgetId(budget_id)
    setShowViewExpensesModal(true)
  }
  
  const handleTrans = (code) => {
    let newCode = code === 'en' ? 'ar' : 'en'
      setCode(newCode)
      i18n.changeLanguage(newCode)
  }

  
  return (
    <>


      <Container className='my-4'>

        <Stack direction="horizontal" className="mb-4" gap={3}> 
          <h1 className='text-primary main-title'>Budget Tracker</h1>
          <Button 
              variant="primary" 
              className="ms-auto" 
              onClick={() => setShowAddBudgetModal(true)}>{ t('addBudget') }</Button>

          <Button variant="outline-primary" 
                  onClick={() => showBudgetExpensesModal(UN_CATEGORIZED_BUDGET_ID)}>
                    {t('addExpense')}</Button>

          <Button 
              variant='success' 
              className='btn-sm'
              onClick={()=>handleTrans(code)}>{code === 'en' ? 'العربية' : 'English'}
          </Button>
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
                  name={ (budget.id === UN_CATEGORIZED_BUDGET_ID && code === 'ar') ? 'غير مصنفة' : budget.name} 
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
                    name={t('total')} 
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