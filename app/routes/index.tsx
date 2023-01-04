// export default function Index() {
//   return (
//     <div> hello</div>
//   );
// }


import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Container from '~/components/Container';
import { Topbar, Sidebar, Footer } from '../components/mainLayout';
// import { Topbar, Sidebar, Footer, ThemeModeToggler } from '../components/mainLayout';

import pages from '~/components/mainLayout/navigation';
import { Form, Link, useLoaderData, useSearchParams } from '@remix-run/react';
import { Button, Card, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node';
import { HttpRequest } from '~/utils/httpRequest';
import { selectedIntent } from 'cookies.server';
// import invariant from 'tiny-invariant';



interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
  bgcolor?: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const intentList = await HttpRequest("list_state", {})

    return json({ intentList: intentList.report[0]});
  } catch (error) {
    console.log(error)
    return json(error);
  }
}

export const action: ActionFunction = async ({ request }) => {

  const formData = await request.formData();
  let data = Object.fromEntries(formData);

  return json({},{
    headers: {
      "Set-Cookie": await selectedIntent.serialize(data),
    },
  });
};


const Main = ({
  children,
  colorInvert = false,
  bgcolor = 'transparent',
}: Props): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const { intentList } = useLoaderData();

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = (): void => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = (): void => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box>
      <AppBar
        position={'sticky'}
        sx={{
          top: 0,
          backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1}>
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            // pages={pages}
            colorInvert={trigger ? false : colorInvert}
          />
        </Container>
      </AppBar>
      <main>
        <Divider />


        <Box bgcolor={'alternate.main'}>
          {/* {data && <pre>{JSON.stringify(data, null, 1)}</pre>} */}
          <Container maxWidth={800}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Grid item >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Discussion
                </Typography>
              </Grid>
            </Grid>

            <Card sx={{ p: { xs: 4, md: 6 } }}>
              <Form method='post' action='?index'>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={4}
                >
                  <Grid item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">View Point</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        name='label'
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Pitch</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name='answer'
                        // value={age}
                        label="Age"
                        // onChange={handleChange}
                      >
                        <MenuItem value={10}>View Point</MenuItem>
                        <MenuItem value={20}>Pitch</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      spacing={0}
                    >
                      <Button size={'large'} variant={'contained'} type={'submit'}>
                        Update
                      </Button>
                    </Stack>
                  </Grid>

                </Grid>
              </Form>

            </Card>
          </Container>
        </Box>

        {children}

        <Divider />
      </main>
      <Container paddingY={4}>
        <Footer />
      </Container>
    </Box>
  );
};

export default Main;
function httpPost(arg0: string, form: any) {
  throw new Error('Function not implemented.');
}

