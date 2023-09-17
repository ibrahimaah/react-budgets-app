import { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { UN_CATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';


function AddExpenseModal({show,handleClose,budgetId}) {
  

  const formRef = useRef()
  const { addExpense,
          budgets,code, t } = useBudgets()

  const handleSubmit = (e) => {

    e.preventDefault()

    const current_form = formRef.current
    const expense_description = current_form.description.value
    const expense_amount = current_form.amount.value
    const budget_id = current_form.budget.value

    if (!expense_description || !expense_amount) {
      return
    }

    addExpense({
      description:expense_description,
      amount : parseFloat(expense_amount),
      budgetId: budget_id
    })


    handleClose();
  }
  

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">

        <Modal.Header closeButton={false}>
          <Modal.Title className='m-auto'>{t('addNewExpense')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form ref={formRef} className={code==='ar' ? 'text-end' :''}>

            <Form.Group className="mb-3" controlId="add-budget-name">
              <Form.Label>{t('desc')}</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="description"
                className={code==='ar' ? 'text-end' :''}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="add-budget-maximum-spending">
              <Form.Label>{t('amount')}</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={0.1}
                name='amount'
                className={code==='ar' ? 'text-end' :''}
                required 
              />
            </Form.Group>

            <Form.Select name="budget" defaultValue={budgetId} className={code==='ar' ? 'text-end' :''}>
                {
                    budgets.map(budget => {

                      if (budget.id === UN_CATEGORIZED_BUDGET_ID && code === 'ar') {
                        return (
                          <option key={budget.id} value={budget.id}>غير مصنفة</option>
                        )
                      }
                        return (
                            <option key={budget.id} value={budget.id}>{budget.name}</option>
                        )
                    })
                }
            </Form.Select>
           
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            {t('close')}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {t('add')}
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default AddExpenseModal;