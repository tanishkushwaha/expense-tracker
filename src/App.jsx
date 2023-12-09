import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Stack, Button } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);

  return (
    <>
      <Container className='my-4'>
          <Stack direction='horizontal' gap='2' className='mb-4'>
            <h1 className='me-auto'>Budgets</h1>
            <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
            <Button variant='outline-primary'>Add Expense</Button>
          </Stack>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start'
          }}>
            <BudgetCard name='Entertainment' amount={100} max={1000} />
          </div>
      </Container>

      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
    </>
  );
}

export default App;