
import { Button, Modal, Stack } from 'react-bootstrap';
import { UN_CATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext';
import React from 'react';
import { currencyFormatter } from '../utils';

// import { useBudgets } from '../contexts/BudgetsContext';

function ViewExpensesModal({show,handleClose,budgetId}) {
  

  
  const { getBudgetById,getBudgetExpenses,deleteItem,code,t } = useBudgets()
  

  let budget = getBudgetById(budgetId)
  let budgetExpenses = getBudgetExpenses(budgetId)

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">

        <Modal.Header closeButton={false}>
          <Modal.Title className='m-auto'>
            {(budgetId === UN_CATEGORIZED_BUDGET_ID && code === 'ar') ? t('expenses') + ' غير مصنفة' : budget?.name+' - '+ t('expenses') }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Stack direction='vertical' gap={3}>
            
                {
                    budgetExpenses?.map(expense => {
                        return (
                          <Stack className={code==='ar' ? 'flex-row-reverse' : ''} direction='horizontal' gap={3} key={expense.id}>
                                <div>{expense?.description}</div>
                                <div className={`m${code==='ar' ? 'e' : 's'}-auto`}  dangerouslySetInnerHTML={{__html:currencyFormatter(expense?.amount,code)}}>
                                </div>
                                <div>
                                    <button 
                                        className='btn btn-sm btn-outline-danger'
                                        onClick={()=>deleteItem({id:expense.id,item_type:'expense'})}>X</button>
                                </div>
                          </Stack>
                        )
                    })
                }
            
          </Stack>
        </Modal.Body>

        <Modal.Footer className={code === 'ar' ? 'justify-content-start' : ''}>
          <Button className='btn-sm' variant="danger" onClick={handleClose}>
            {t('close')}
          </Button> 
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default ViewExpensesModal;