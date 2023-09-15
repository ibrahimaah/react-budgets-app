import { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';


function AddExpenseModal({show,handleClose,budgetId}) {
  

  const formRef = useRef()
  const { addExpense,
          budgets } = useBudgets()
  

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
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Add New Expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form ref={formRef}>

            <Form.Group className="mb-3" controlId="add-budget-name">
              <Form.Label>Description :</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="add-budget-maximum-spending">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                step={0.1}
                name='amount'
                required 
              />
            </Form.Group>

            <Form.Select name="budget" defaultValue={budgetId}>
                {
                    budgets.map(budget => {
                        return (
                            <option key={budget.id} value={budget.id}>{budget.name}</option>
                        )
                    })
                }
            </Form.Select>
           
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

export default AddExpenseModal;