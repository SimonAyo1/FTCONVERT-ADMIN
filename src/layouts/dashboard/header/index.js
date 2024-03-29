import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// utils
import { bgBlur } from '../../../utils/cssStyles';
// import  {handleSignOut}  from '../../../utils/signout';
// components
import Iconify from '../../../components/iconify';
//
import ConnectWallet from "../../../web3/ConnectWallet";


// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const navigate = useNavigate()
    const handleLogout = () => {
      const auth = getAuth();
      signOut(auth);
      navigate("/auth/login")
      
    };
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
         
          <Button variant="contained" onClick={handleLogout}>Sign out</Button>
     <ConnectWallet />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
