import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
// @mui
import { Stack, Container, Typography, Grid, Button, CircularProgress } from '@mui/material';

// components

import Iconify from '../components/iconify';
import '../styles/settings.css';
import { db } from '../firebase-config';
// sections

export default function Settings() {
  const [open, setOpen] = useState(null);
  const [cryptoName, setCryptoName] = useState(null);
  const [cryptoRate, setCryptoRate] = useState(null);
  const [updatedCryptoRate, setUpdatedCryptoRate] = useState(null);
  const [isAddingCrypto, setIsAddingCrypto] = useState(false);
  const [isSettingRate, setIsSettingRate] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const [dId, setDID] = useState(null);
  const [dIdDelete, setDIDDelete] = useState(null);
  const [acceptedCryptos, setAcceptedCryptos] = useState([]);
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
  const deleteCrypto = async () => {
    if(acceptedCryptos.length < 1) {
      alert("Error: No Crypto To Delete")
    }
    else {
  setisDeleting(true);
  await deleteDoc(doc(db, 'accepted-cryptos', dIdDelete))
    .then(() => {
      setDIDDelete(null);
      setisDeleting(false);
    })
    .catch(() => {
      setisDeleting(false);
      alert('Something is wrong, Failed to delete,');
    });
    }
  
  };
  const addCrypto = async () => {
    setIsAddingCrypto(true);
    if (cryptoName === null || cryptoRate === null) {
      alert('please enter crypto name and rate');
      setIsAddingCrypto(false);
    } else {
      await addDoc(collection(db, 'accepted-cryptos'), {
        name: cryptoName,
        rate: parseInt(cryptoRate, 10),
      })
        .then((e) => {
          setIsAddingCrypto(false);
          alert('Added Successfully');
          setCryptoName(null);
          setCryptoRate(null);
        })
        .catch((e) => {
          setIsAddingCrypto(false);
          alert('Something is wrong, Failed to add,');
        });
    }
  };
  const setRate = async () => {
   if (acceptedCryptos.length < 1) {
     alert('Error: No Crypto To Update');
   } 
   else {
setIsSettingRate(true);
const cryptoRef = doc(db, 'accepted-cryptos', `${dId}`);

await updateDoc(cryptoRef, {
  rate: parseInt(updatedCryptoRate, 10),
})
  .then((e) => {
    setIsSettingRate(false);
    alert('Added Successfully');
    setUpdatedCryptoRate(null);
  })
  .catch((e) => {
    setIsSettingRate(false);
    alert('Something is wrong, Failed to update');
  });
   }
    
  };
  useEffect(() => {
    fetchAcceptedCryptos();
  }, []);
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
                <input type="text" className="a-input" onChange={(e) => setCryptoName(e.target.value)} />
              </fieldset>
              <fieldset>
                <span>Enter rate</span>
                <input type="number" className="a-input" onChange={(e) => setCryptoRate(e.target.value)} />
              </fieldset>
              <Button variant="outlined" style={{ width: '30%', alignSelf: 'flex-end' }} onClick={addCrypto}>
                {isAddingCrypto ? <CircularProgress color="secondary" size={22} /> : ' Add Crypto'}
              </Button>
            </div>
          </article>
          <article className="grid gap-big" style={{ marginTop: 20 }}>
            <div className="title">Set Rate</div>
            <div className="grid col-2 gap-medium">
              <fieldset>
                <span>Select Crypto</span>
                <select className="a-input" onChange={(e) => setDID(e.target.value)}>
                  <option value="">select</option>
                  {acceptedCryptos.map((crypto) => (
                    <option value={crypto.dId}>{crypto.name}</option>
                  ))}
                </select>
              </fieldset>
              <fieldset>
                <span>Rate / USD</span>
                <input type="number" className="a-input" onChange={(e) => setUpdatedCryptoRate(e.target.value)} />
              </fieldset>
              <Button variant="outlined" style={{ width: '30%', alignSelf: 'flex-end' }} onClick={setRate}>
                {isSettingRate ? <CircularProgress color="secondary" size={22} /> : ' Set Rate'}
              </Button>
            </div>
          </article>
          <article className="grid gap-big" style={{ marginTop: 20 }}>
            <div className="title">Remove Crypto</div>
            <div className="grid col-2 gap-medium">
              <fieldset>
                <span>Select Crypto</span>
                <select className="a-input" onChange={(e) => setDIDDelete(e.target.value)}>
                  <option value="">select</option>
                  {acceptedCryptos.map((crypto) => (
                    <option value={crypto.dId}>{crypto.name}</option>
                  ))}
                </select>
              </fieldset>
             
            </div>
             <Button variant="outlined" style={{ width: '20%', alignSelf: 'flex-end' }} onClick={deleteCrypto}>
                {isDeleting ? <CircularProgress color="secondary" size={22} /> : 'Remove Crypto'}
              </Button>
          </article>
        </Grid>
      </Container>
    </>
  );
}
