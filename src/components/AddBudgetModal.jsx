import { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

// import { useBudgets } from '../contexts/BudgetsContext';

function AddBudgetModal({show,handleClose}) {

  
  const formRef = useRef()
  const { addBudget } = useBudgets()
  

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

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Add New Budget</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form ref={formRef}>

            <Form.Group className="mb-3" controlId="add-budget-name">
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="add-budget-maximum-spending">
              <Form.Label>Maximum Spending :</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={0.1}
                name='maximum_spending'
                required 
              />
            </Form.Group>

           
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default AddBudgetModal;