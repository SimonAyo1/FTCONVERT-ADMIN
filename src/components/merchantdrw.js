import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  Drawer,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MerchantDrawer(props) {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const [crypto, setcrypto] = useState('');
  const [updatedCryptoRate, setUpdatedCryptoRate] = useState(null);
  const [acceptedCryptos, setAcceptedCryptos] = useState([]);
  const fetchAcceptedCryptos = async () => {
    const querySnapshot = await getDocs(collection(db, 'accepted-cryptos'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      setAcceptedCryptos((e) => [
        ...e,
        {
          name: doc.data().name,
          rate: doc.data().rate,
          dId: doc.id,
        },
      ]);
    });
  };
  useEffect(() => {
    fetchAcceptedCryptos();
  }, []);

  const [state, setState] = useState({
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
            <h3>Manage Crypto</h3>
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
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Add Crypto" {...a11yProps(0)} />
              <Tab label="Set Rate" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <>ghj</>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Crypto</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={crypto}
                  label="Crypto"
                  onChange={handleTabChange}
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
          </TabPanel>
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
