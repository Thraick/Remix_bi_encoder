/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from '~/components/Container';

import type { ActionFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { HttpRequest } from '~/utils/httpRequest';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



export const action: ActionFunction = async ({ request }) => {

  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  console.log(data)
  await HttpRequest("create_faq", data)
  


  return redirect('/intents');
};



const NewFaq = (): JSX.Element => {

  return (
    <Box bgcolor={'alternate.main'}>
      <Container maxWidth={800}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Grid item >
            {/* <h1>Faqs</h1> */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              New Faqs
            </Typography>
          </Grid>

          <Grid item justifyContent='right' >
            <Link to='/faqs'>
              <IconButton color="primary" size='large' aria-label="delete" component="label">
                <ArrowBackIosNewIcon fontSize='medium'/>
              </IconButton>
            </Link>
          </Grid>
        </Grid>

        <Card sx={{ p: { xs: 4, md: 6 } }}>
          <Form method='post'>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Enter your question
                </Typography>
                <TextField
                  label="Question *"
                  variant="outlined"
                  name={'question'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Enter your answer
                </Typography>
                <TextField
                  label="Answer *"
                  variant="outlined"
                  name={'answer'}
                  fullWidth
                  rows={3}
                />
              </Grid>

              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'right', sm: 'center' }}
                  justifyContent="flex-end"
                  width={1}
                  maxWidth={600}
                  margin={'0 auto'}
                >

                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    Create
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </Card>
      </Container>
    </Box>
  );
};

export default NewFaq;
