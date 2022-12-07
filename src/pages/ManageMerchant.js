import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Alert, Button, CircularProgress } from '@mui/material';
import { db } from '../firebase-config';
import MerchantDrawer from '../components/MerchantDrawer';






export default function ManageMerchant() {
  const { id } = useParams();
  
  const [reqData, setReqData] = useState([]);
  const [docId, setDocId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isdisabling, setIsDisabling] = useState(false);
  const [isDisabled, setIsDisabled] = useState(null);
  const [error, setError] = useState("")
  const fetchSingleMerchant = async (id) => {
    const q = query(collection(db, 'users'), where('userId', '==', `${id}`));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setIsLoading(false)
      setError(`No User With The ID: ${id}`)
    }
      querySnapshot.forEach((doc) => {
        setReqData(doc.data());
        setDocId(doc.id);
        setIsLoading(false);

        setIsDisabled(doc.data().isDisabled);
      });
  };
  useEffect(() => {
    fetchSingleMerchant(id);
  }, []);

  // Handle disable and enable merchants

  const handleMerchantDisablility = async () => {
    setIsDisabling(true);
    const userRef = doc(db, 'users', `${docId}`);
    await updateDoc(userRef, {
      isDisabled: !reqData.isDisabled,
    })
      .then(() => {
        setIsDisabled(!isDisabled);
        setIsDisabling(false);
      })
      .catch((e) => {
        setIsDisabling(false);
        alert('Error: check your internet conneection');
    
      });
  };

  return !isLoading ? (
    <>
      {error && <Alert severity="error">{error}</Alert>}

  
        <div className="layout">
          <div className="profile">
            <div className="profile__picture">
              <img
                src="https://img.freepik.com/free-vector/farmer-using-agricultural-technology_53876-120543.jpg?w=740&t=st=1670320509~exp=1670321109~hmac=16f9fa9e05d2f74e94ce3b515229a3b0a38c0933540175ea79b4593bf333137a"
                alt={reqData.company}
              />
            </div>
            <div className="profile__header">
              <div className="profile__account" style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                  {' '}
                  <h4 className="profile__username">{reqData.company}</h4>
                </div>

                <div>
                  <h4 className="profile__username" style={{ fontSize: 15 }}>
                    {reqData.email}
                  </h4>
                </div>
              </div>
            </div>
            <div className="profile__stats">
              <div className="profile__stat">
                <div className="profile__icon profile__icon--gold">
                  <i className="fas fa-wallet" />
                </div>
                <div className="profile__value">
                  ${reqData.balance}
                  <div className="profile__key">Balance</div>
                </div>
              </div>

              <div className="profile__stat">
                <div className="profile__icon profile__icon--blue">
                  <i className="fas fa-signal" />
                </div>
                <div className="profile__value">
                  0<div className="profile__key">Pending Tx</div>
                </div>
              </div>
              <div className="profile__stat">
                <div className="profile__icon profile__icon--pink">
                  <i className="fas fa-heart" />
                </div>
                <div className="profile__value">
                  0<div className="profile__key">Approved Tx</div>
                </div>
              </div>
            </div>
            <div className="profile__stats">
              <div className="profile__stat">
                <div className="profile__icon profile__icon--gold">
                  <i className="fas fa-wallet" />
                </div>
                <div className="profile__value" style={{ fontSize: 22 }}>
                  {reqData.gender}
                  <div className="profile__key">Gender</div>
                </div>
              </div>
              <div className="profile__stat">
                <div className="profile__icon profile__icon--blue">
                  <i className="fas fa-signal" />
                </div>
                <div className="profile__value" style={{ fontSize: 22 }}>
                  {reqData.age}
                  <div className="profile__key">Age Group</div>
                </div>
              </div>
              <div className="profile__stat">
                <div className="profile__icon profile__icon--pink">
                  <i className="fas fa-heart" />
                </div>
                <div className="profile__value" style={{ fontSize: 22 }}>
                  {reqData.country}
                  <div className="profile__key">Country</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <div className="profile__value" style={{ fontSize: 15 }}>
                Payment Url: <span>{reqData.payment_url}</span>
              </div>
              <div className="profile__value" style={{ fontSize: 15 }}>
                Registered on: <span>{reqData.regTime}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 40 }}>
              <div>
                <Button
                  variant="outlined"
                  color={isDisabled ? 'secondary' : 'error'}
                  onClick={handleMerchantDisablility}
                >
                  {isdisabling ? 'Processing...' : isDisabled ? 'Enable Merchant' : 'Disable Merchant'}
                </Button>
              </div>
             
            </div>
          </div>
        </div>
      
    </>
  ) : (
    <CircularProgress color="secondary"  />
  );
}
