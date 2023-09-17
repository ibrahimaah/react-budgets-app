
import { Button, Modal, Stack } from 'react-bootstrap';
import { UN_CATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { currencyFormatter } from '../utils';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

// import { useBudgets } from '../contexts/BudgetsContext';

function ViewExpensesModal({show,handleClose,budgetId}) {
  

  
  const { getBudgetById,getBudgetExpenses,deleteItem,code } = useBudgets()
  const { t } = useTranslation();

  let budget = getBudgetById(budgetId)
  let budgetExpenses = getBudgetExpenses(budgetId)

  return (
    <>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>
            {(budgetId === UN_CATEGORIZED_BUDGET_ID && code === 'ar') ? t('expenses') + ' غير مصنفة' : budget?.name+' - '+ t('expenses') }
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Stack direction='vertical' gap={3}>
            
                {
                    budgetExpenses?.map(expense => {
                        return (
                          <Stack direction='horizontal' gap={3} key={expense.id}>
                                <div>{expense?.description}</div>
                                <div className='ms-auto'>{currencyFormatter(expense?.amount)}</div>
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

       

      </Modal>
    </>
  );
}

export default ViewExpensesModal;