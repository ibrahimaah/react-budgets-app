import { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';
import { useTranslation } from 'react-i18next';

// import { useBudgets } from '../contexts/BudgetsContext';

function AddBudgetModal({show,handleClose}) {

  
  const formRef = useRef()
  const { addBudget,code } = useBudgets()
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault()

    const current_form = formRef.current
    const budget_name = current_form.name.value
    const budget_maximum_spending = current_form.maximum_spending.value

    if (!budget_name || !budget_maximum_spending) {
      return
    }
    
    addBudget({
      name:budget_name,
      max : parseFloat(budget_maximum_spending)
    })

    handleClose();
  }
  

  return (
    <>

      <Modal show={show} onHide={handleClose} backdrop="static">

        <Modal.Header closeButton={false}>
          <Modal.Title className='m-auto'>{t('addNewBudget')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form ref={formRef} className={code==='ar' ? 'text-end' :''}>

            <Form.Group className="mb-3" controlId="add-budget-name">
              <Form.Label>{t('name')}</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="name"
                className={code==='ar' ? 'text-end' :''}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="add-budget-maximum-spending">
              <Form.Label>{t('maxSpending')}</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={0.1}
                name='maximum_spending'
                className={code==='ar' ? 'text-end' :''}
                required 
              />
            </Form.Group>

           
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

export default AddBudgetModal;