import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase-config';
import { userActions } from '../store/user/userSlice';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
 const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  
  const [isLoading , setIsLoading] = useState(true)
  
 const [data , setData] = useState({
  id: null,
  company_name: null,
  email: null,
  payment_url: null,
  balance: null,
  wallets: []
 })
 const fetchData = async (id) => {
   const req = query(collection(db, 'users'), where('userId', '==', `${id}`));
   const querySnapshot = await getDocs(req).catch((e) => {
     console.log(e);
   });
   querySnapshot.forEach((doc) => {
     // doc.data() is never undefined for query doc snapshots
    
     setData({
       id: doc.data().userId,
       company_name: doc.data().company,
       email: doc.data().email,
       payment_url: doc.data().payment_url,
       balance: doc.data().balance,
       wallets: doc.data().wallets,
     });
     dispatch(
       userActions.addUser({
         id: doc.data().userId,
         company_name: doc.data().company,
         email: doc.data().email,
         payment_url: doc.data().payment_url,
         balance: doc.data().balance,
         wallets: doc.data().wallets,
       })
     );
     console.log(doc.data());
     console.log('data', data.balance);
     setIsLoading(false);
   });
 };

useEffect(() => {
  fetchData(currentUser.uid);
}, []);
    

  const theme = useTheme();


  return currentUser ? (
    <>
      <Helmet>
        <title> Dashboard | TFConvert </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          TF-Convert Overview
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary color="primary" title="Total Revenue" total={1} icon={'mdi:money'}  />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary  title="Customers" total={200} icon={'ic:baseline-people-alt'} color="secondary" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending TX" total={10} icon={'material-symbols:account-balance-wallet'} color="warning" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Approved TX" total={20} icon={'material-symbols:account-balance-wallet'} color="success" />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Revenue"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Card',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Neobank',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Crypto',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  ) : (
    'Loading data...'
  );
}
