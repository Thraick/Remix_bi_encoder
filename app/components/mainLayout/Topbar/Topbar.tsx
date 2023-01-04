import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

// import { NavItem } from './components';
import { Link as RouterLink, useLoaderData } from '@remix-run/react';

import type { ActionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
// import { authenticator, supabaseStrategy } from '~/supabase/auth.server';


import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';



// export const loader = async ({ request }: LoaderArgs) => {
//   const session = await supabaseStrategy.checkSession(request, {
//     failureRedirect: "/auth/login",
//   });
//   return json({ session });
// };

// export const action = async ({ request }: ActionArgs) => {
//   await authenticator.logout(request, { redirectTo: '/auth/login' });
// };




interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSidebarOpen: () => void;
  // pages: {
  //   landings: Array<PageItem>;
  //   company: Array<PageItem>;
  //   account: Array<PageItem>;
  //   secondary: Array<PageItem>;
  //   blog: Array<PageItem>;
  //   portfolio: Array<PageItem>;
  // };
  colorInvert?: boolean;
}

const Topbar = ({
  onSidebarOpen,
  // pages,
  colorInvert = false,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const [loggedIn, setLoggedIn] = useState(true)
  // const {
  //   landings: landingPages,
  //   secondary: secondaryPages,
  //   company: companyPages,
  //   account: accountPages,
  //   portfolio: portfolioPages,
  //   blog: blogPages,
  // } = pages;
  // const { session } = useLoaderData<typeof loader>();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
        title="theFront"
        width={{ xs: 100, md: 120 }}
      >
        <Box
          component={'img'}
          src={
            mode === 'light' && !colorInvert
              ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
              : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
          }
          height={1}
          width={1}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box>
          {/* <RouterLink to='/faqs'>
            <Button variant="text" color="primary">
              Faqs
            </Button>
          </RouterLink> */}
          <Button variant="text" color="primary" component={RouterLink} to="/faqs">Faqs</Button>
        </Box>
        <Box>
          {/* <RouterLink to='/states'>
            <Button variant="text" color="primary">
              States
            </Button>
          </RouterLink> */}
          <Button variant="text" color="primary" component={RouterLink} to="/states">States</Button>
        </Box>
        <Box>
          {/* <RouterLink to='/intents'>
            <Button variant="text" color="primary">
              Intents
            </Button>
          </RouterLink> */}
          <Button variant="text" color="primary" component={RouterLink} to="/intent">Intent</Button>
        </Box>
        <Box>
          {/* <RouterLink to='/entity'>
            <Button variant="text" color="primary">
              Entity
            </Button>
          </RouterLink> */}
          <Button variant="text" color="primary" component={RouterLink} to="/entity">Entity</Button>

        </Box>

        <Box marginLeft={4}>
          {loggedIn ?
          <>
            <Button variant="contained" color="primary" component={RouterLink} to="/auth/login">Login</Button>
            <Button variant="contained" color="primary" component={RouterLink} to="/auth/register">Register</Button>

          {/* <RouterLink to='/auth/login'>
            <Button variant="contained" color="primary" component={RouterLink}>
              Login
            </Button>
          </RouterLink>
          <RouterLink to='/auth/register'>
            <Button variant="contained" color="primary">
              Register
            </Button>
          </RouterLink> */}
          </>
          :

          <Form method='post'>
            <Button variant="contained" color="primary" component={RouterLink} to="/auth/logout">Logout</Button>

            {/* <Button variant="contained" color="primary">
              Logout
            </Button> */}
          </Form>
          }

        </Box>

      </Box>
      {/* <Box alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box> */}
    </Box>
  );
};

export default Topbar;
