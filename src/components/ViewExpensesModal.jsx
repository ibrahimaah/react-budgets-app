
import { Button, Modal, Stack } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

// import { useBudgets } from '../contexts/BudgetsContext';

function ViewExpensesModal({show,handleClose,budgetId}) {
  

  
  const { getBudgetById,getBudgetExpenses,deleteItem } = useBudgets()
  

  let budget = getBudgetById(budgetId)
  let budgetExpenses = getBudgetExpenses(budgetId)

  return (
    <>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>{budget?.name} - Expenses</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Stack direction='vertical' gap={3}>
            <Stack direction='horizontal' gap={2}>
                {
                    budgetExpenses?.map(expense => {
                        return (
                            <>
                                <div>{expense?.description}</div>
                                <div>{expense?.amount}</div>
                                <div>
                                    <button 
                                        className='btn btn-sm btn-outline-danger'
                                        onClick={()=>deleteItem({id:expense.id,item_type:'expense'})}>X</button>
                                </div>
                            </>
                        )
                    })
                }
            </Stack>
          </Stack>
        </Modal.Body>

       

      </Modal>
    </>
  );
}

export default ViewExpensesModal;