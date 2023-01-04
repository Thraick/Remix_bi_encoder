/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from '~/components/Container';

import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import { HttpRequest } from '~/utils/httpRequest';
import { IconButton, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectedIntent } from 'cookies.server';



// export const action: ActionFunction = async ({ request }) => {

//   const formData = await request.formData();
//   let data = Object.fromEntries(formData);
//   console.log(data)
//   await HttpRequest("create_faq", data)



//   return redirect('/intents');
// };


export const action: ActionFunction = async ({ request }) => {

  let form = await request.formData()
  let values = Object.fromEntries(form)

  if ('updateIntent' in values) {
    let val = form.get('updateIntent')
    let report = await HttpRequest('update_intent', val)
    console.log(report)
    return null;
  } 
  else if ('deleteIntent' in values) {
    let val = form.get('deleteIntent')
    let report = await HttpRequest('delete_intent', val)
    console.log(report)
    return redirect('/intents');
  } 
  else {
    return null;
  }  
};



export const loader: LoaderFunction = async ({ params, request }) => {
  let id = { id: params.intentID }

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await selectedIntent.parse(cookieHeader)) || {};

  try {
    const response = await HttpRequest("get_intent", id)
    return json({"data": response.report[0], "selectedIntent": cookie});
  } catch (error) {
    console.log(error)
    return json(error);
  }
}



const NewFaq = (): JSX.Element => {

  const {data, selectedIntent} = useLoaderData();
  const [openNewUtterance, setOpenNewUtterance] = useState(false)
  const [newUtteranceChange, setNewUtteranceChange] = useState('')
  const submit = useSubmit();

  const handleNewUtterance = async () => {
    let values = {
      name_of_intent: data.context.name_of_intent,
      utterances: [newUtteranceChange, ...list],
      id: data.jid
    }
    setlist(values.utterances)

    let formData = new FormData();
    formData.append('updateIntent', JSON.stringify(values))
    submit(formData, { action: `/intents/${data.jid}`, method: 'post' })

    setOpenNewUtterance(openNewUtterance => !openNewUtterance)
  }

  const [list, setlist] = useState(data.context.utterances)
  const [updateUtteranceValueChange, setUpdateUtteranceValueChange] = useState('')
  const [openEditUtterance, setOpenEditUtterance] = useState(false)
  const [updateUtteranceIdChange, setUpdateUtteranceIdChange] = useState('')
  const [deleteUtteranceValue, setDeleteUtteranceValue] = useState('')
  const [openUtteranceDialog, setOpenUtteranceDialog] = useState(false)
  const [updateIntent, setUpdateIntent] = useState('')


  const handleUtteranceDelete = (item:any) => {
    setDeleteUtteranceValue(item)
    setOpenUtteranceDialog(true)
  }

  const handleUtteranceEdit = (id: any) => {
    console.log(id)
    setUpdateUtteranceIdChange(id)
    setOpenEditUtterance(openEditUtterance => !openEditUtterance)
  }
  
  const handleUtteranceSave = () => {
    list.splice(updateUtteranceIdChange, 1, updateUtteranceValueChange)
    let newList = [...list]
  
    let values = {
      name_of_intent: updateIntent,
      utterances: newList,
      id: data.jid
    }  
  
    let formData = new FormData();
    formData.append('updateIntent', JSON.stringify(values))
    submit(formData, { action: `/intents/${data.jid}`, method: 'post' })
    setOpenEditUtterance(openEditUtterance => !openEditUtterance)
  }  
  


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
              New Anchor Group
            </Typography>
          </Grid>

          <Grid item justifyContent='right' >
            <Link to='/intents'>
              <IconButton color="primary" size='large' aria-label="delete" component="label">
                <ArrowBackIosNewIcon fontSize='medium' />
              </IconButton>
            </Link>
          </Grid>
        </Grid>

        <Card sx={{ p: { xs: 4, md: 6 } }}>

          <Form method='post'>
            {/* <Grid container spacing={4}> */}

            <Grid item xs={12}
              container
              spacing={2}
              sx={{ px: { xs: 2, md: 3 } }}
              direction="row"
            >

              <Grid item xs={10}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Anchor Group
                </Typography>
              </Grid>

              <Grid item xs={10}>
                <TextField
                  label="Anchor Group*"
                  variant="outlined"
                  name={'anchor'}
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <Button size={'large'} variant={'contained'} component="label">
                  Save
                </Button>
              </Grid>


              <Grid item xs={12}
                container
                justifyContent="space-between"
                alignItems="center"
                direction="row"
              >
                <Typography variant={'h6'}>
                  Utterance
                </Typography>


                {
                  openNewUtterance
                    ?
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 'auto' }}>
                      <Button variant={'outlined'} onClick={() => setOpenNewUtterance(openNewUtterance => !openNewUtterance)}>
                        Cancel
                      </Button>
                      <Button variant={'contained'} onClick={handleNewUtterance}>
                        Save
                      </Button>
                    </Stack>
                    :
                    <Button variant={'contained'} onClick={() => setOpenNewUtterance(openNewUtterance => !openNewUtterance)}>
                      New Utterance
                    </Button>
                }
              </Grid>
              {openNewUtterance && <Grid item xs={12}>
                <TextField
                  label="New Utterance *"
                  variant="outlined"
                  name={'utterance'}
                  fullWidth
                  onChange={event => setNewUtteranceChange(event.target.value)}
                />
              </Grid>}


            </Grid>
  

            {list && list.map((item: any, idx: any) => (
                <Grid container spacing={2} key={idx} mt={2} sx={{ px: { xs: 2, md: 3 } }}>
                  {
                    openEditUtterance && updateUtteranceIdChange == idx
                      ?
                      <Grid item xs={10}>
                        <TextField
                          label="Utterance *"
                          variant="outlined"
                          name={'utterance'}
                          fullWidth
                          defaultValue={item}
                          onChange={evt => setUpdateUtteranceValueChange(evt.target.value)}
                        />
                      </Grid>
                      :
                      <Grid item xs={10} sx={{ display: 'none' }}>
                        <TextField
                          label="Utterance *"
                          variant="outlined"
                          name={'utterance'}
                          fullWidth
                          defaultValue={item}
                        />
                      </Grid>
                  }
                  {
                    openEditUtterance && updateUtteranceIdChange == idx
                      ?
                      null
                      :
                      <Grid item xs={10}>
                        <Box marginLeft={2}>
                          {item}
                        </Box>
                      </Grid>
                  }

                  <Grid item xs={2} >
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 'auto' }}>
                      <Button variant="outlined" component="label" onClick={() => handleUtteranceEdit(idx)}>
                        {openEditUtterance && updateUtteranceIdChange == idx ? "cancel" : "Edit"}
                      </Button>
                      {openEditUtterance && updateUtteranceIdChange == idx ?
                        <Button variant="contained" color="primary" onClick={handleUtteranceSave} disabled={!updateUtteranceValueChange}>
                          save
                        </Button>
                        :
                        <IconButton color="primary" aria-label="delete" component="label" onClick={() => handleUtteranceDelete(item)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    </Stack>
                  </Grid>

                </Grid>





              ))}

          {/* </Grid> */}

        </Form>
      </Card>
    </Container>
    </Box >
  );
};

export default NewFaq;
