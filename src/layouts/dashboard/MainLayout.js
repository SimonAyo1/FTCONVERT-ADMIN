import React, { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
import { Backdrop, CircularProgress } from '@mui/material';
import Header from './header';
import Nav from './nav';
import { AuthContext } from '../../context/AuthContext';
import useFetchMerchants from '../../hooks/useFetchMerchants';
import { merchantAction } from '../../store/user/userSlice';


// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function MainLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const { isLoading, isNoUser, USERLIST } = useFetchMerchants('fetch-all');
  
  let totalRevenue
   USERLIST.map(e => {
     totalRevenue =+ e.balance
     return totalRevenue
  })

  if(!isLoading) {
 dispatch(merchantAction.addMerchants(USERLIST));
 dispatch(
   merchantAction.addDashboardData({
     totalRevenue,
     totalMerchants: USERLIST.length,
   })
 );
  }
 
  
  dispatch(merchantAction.addMerchantFetch({isLoading, isNoUser}));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth/login');
    }
  }, []);
  return currentUser ? (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      {isLoading ? (
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
           
          >
            <CircularProgress color="secondary" />
          </Backdrop>
        </>
      ) : (
        <Main>
          <Outlet />
        </Main>
      )}
    </StyledRoot>
  ) : (
    ''
  );
}
