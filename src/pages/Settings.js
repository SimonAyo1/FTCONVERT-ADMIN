import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; 
// @mui
import { Stack, Popover, MenuItem, Container, Typography, Grid, Button } from '@mui/material';

// components

import Iconify from '../components/iconify';
import '../styles/settings.css';
// sections

export default function Settings() {
      
  const [open, setOpen] = useState(null);
  const [cryptoName, setCryptoName] = useState(null)
  
  // const setNewCrypto = async () => {
  //   const docRef = await addDoc(collection(db, 'accepted-cryptos'), {
  //     name: cryptoName,
  //   });
  // }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <Helmet>
        <title> Settings | TFConvert </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            CVS
          </Button> */}
        </Stack>

        <Grid item xs={12} sm={6} md={4}>
          <article className="card">
            <article className="grid gap-big">
              <div className="title">Change Password</div>
              <div className="grid col-2 gap-medium">
                <fieldset>
                  <span>Current Password</span>
                  <input type="text" placeholder="" className="a-input" />
                </fieldset>
                <fieldset>
                  <span>New Password</span>
                  <input type="text" className="a-input" />
                </fieldset>
              </div>
            </article>
          </article>

          <article className="grid gap-big" style={{ marginTop: 20 }}>
            <div className="title">Add Crypto</div>
            <div className="grid col-2 gap-medium">
              <fieldset>
                <span>Enter Crypto Name</span>
                <input type="text" className="a-input" onChange = {(e) => setCryptoName(e.target.value)} />
                <Button style={{width: "30%", alignSelf: "flex-end"}}>Add Crypto</Button>
              </fieldset>
            </div>
          </article>
        </Grid>
      </Container>
    </>
  );
}
