import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// @mui
import { Stack, Popover, MenuItem, Container, Typography, Grid } from '@mui/material';

// components

import Iconify from '../components/iconify';
import '../styles/settings.css';
// sections

export default function Settings() {
      
  const [open, setOpen] = useState(null);
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
        </Grid>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
