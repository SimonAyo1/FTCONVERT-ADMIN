import { useState } from 'react';
import { TextField, Button, Drawer, Box, CircularProgress, Alert } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function MerchantDrawer(props) {
  const [fee, setFee] = useState(null);
  const [isLoading, setIsLoading] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [state, setState] = useState({
    right: false,
  });
  const { docId } = props;
 
  const userRef = doc(db, 'users', docId);
  const handleFee = async () => {
    setIsLoading(true);
    if (fee === null) {
      setIsLoading(false);
      setError("Percentage Can't Be Empty");
    } else {
      await updateDoc(userRef, {
        transactionFee: parseInt(fee, 10),
      })
        .then(() => {
          setMessage('Percentage updated Successfully');
          setIsLoading(false);
        })
        .catch((e) => {
          setError('Failed to set percentage ! Check your internet');
          setIsLoading(false);
         
        });
    }
  };
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ width: 350 }} role="presentation">
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            {' '}
            <h3>Set Transaction Fee</h3>
          </div>

          <Button onClick={toggleDrawer(anchor, false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </Button>
        </div>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <div style={{ marginTop: 20 }}>
          <Box sx={{ minWidth: 120 }}>
            <TextField
              id="Percent"
              label="Percent"
              type="number"
              variant="outlined"
              fullWidth
              style={{ marginTop: 10 }}
              onChange={(e) => {
                setFee(e.target.value);
                setError('');
                setMessage('');
              }}
            />
          </Box>
          <div style={{ marginTop: 10 }}>
            <Button onClick={handleFee} variant="outlined">
              {' '}
              {isLoading ? <CircularProgress size={22} /> : fee === null ? 'Apply' : `Apply ${fee}%`}
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <>
        <Button variant="outlined" onClick={toggleDrawer('right', true)}>
          Set TX Fee
        </Button>
        <Drawer anchor={'right'} open={state.right} onClose={toggleDrawer('right', false)}>
          {list('right')}
        </Drawer>
      </>
    </div>
  );
}
