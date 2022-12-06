import * as React from 'react';
import { TextField, Button, Drawer, Select, FormControl, MenuItem, InputLabel, Box } from '@mui/material';

export default function MerchantDrawer(props) {
  const [crypto, setcrypto] = React.useState('');

  const handleChange = (event) => {
    setcrypto(event.target.value);
  };
  const [state, setState] = React.useState({
    right: false,
  });
  const { company, docId } = props;
  const toggleDrawer = (anchor, open) => (event) => {
 
    setState({ [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ width: 350 }} role="presentation">
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            {' '}
            <h3>Set Crypto Rate</h3>
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

        <div style={{ marginTop: 20 }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Crypto</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={crypto}
                label="Crypto"
                onChange={handleChange}
              >
                <MenuItem value="USDT">USDT</MenuItem>
                <MenuItem value="USDC">USDC</MenuItem>
                <MenuItem value="BUSD">BUSD</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Rate"
              type="number"
              variant="outlined"
              fullWidth
              style={{ marginTop: 10 }}
            />
          </Box>
          <div style={{ marginTop: 10 }}>
            <Button>Apply Rate</Button>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <>
        <Button variant="outlined" onClick={toggleDrawer('right', true)}>
          Set Rate
        </Button>
        <Drawer anchor={'right'} open={state.right} onClose={toggleDrawer('right', false)}>
          {list('right')}
        </Drawer>
      </>
    </div>
  );
}
