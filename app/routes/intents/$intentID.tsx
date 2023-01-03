/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Container from '~/components/Container';

import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import { HttpRequest } from '~/utils/httpRequest';
import { IconButton, Input, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import DeleteIcon from '@mui/icons-material/Delete';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



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



export const loader: LoaderFunction = async ({ params }) => {
  let id = { id: params.intentID }

  try {
    const response = await HttpRequest("get_intent", id)
    return json(response.report[0]);
  } catch (error) {
    console.log(error)
    return json(error);
  }
}

const UpdateFaq = (): JSX.Element => {
  const data = useLoaderData();
  const submit = useSubmit();


  const [list, setlist] = useState(data.context.utterances)
  const [intent, setIntent] = useState(data.context.name_of_intent)
  const [openEditIntent, setOpenEditIntent] = useState(false)
  const [openEditUtterance, setOpenEditUtterance] = useState(false)
  const [openUtteranceDialog, setOpenUtteranceDialog] = useState(false)
  const [openIntentDialog, setOpenIntentDialog] = useState(false)
  const [openNewUtterance, setOpenNewUtterance] = useState(false)
  const [updateIntent, setUpdateIntent] = useState('')
  const [updateUtteranceIdChange, setUpdateUtteranceIdChange] = useState('')
  const [deleteUtteranceValue, setDeleteUtteranceValue] = useState('')
  const [updateUtteranceValueChange, setUpdateUtteranceValueChange] = useState('')
  const [newUtteranceChange, setNewUtteranceChange] = useState('')


  const handleIntentEdit = () => {
    setOpenEditIntent(openEditIntent => !openEditIntent)
  }

  const handleIntentSave = () => {

    let values = {
      name_of_intent: updateIntent,
      utterances: list,
      id: data.jid
    }
    setIntent(updateIntent)
    let formData = new FormData();
    formData.append('updateIntent', JSON.stringify(values))
    submit(formData, { action: `/intents/${data.jid}`, method: 'post' })

    setOpenEditIntent(false)
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



  const handleUtteranceDialogClose = () => {
    setOpenUtteranceDialog(false)
  }

  const handleUtteranceDelete = (item:any) => {
    setDeleteUtteranceValue(item)
    setOpenUtteranceDialog(true)
  }

  const confirmHandleUtteranceDelete = () => {
    const newList = list.filter((item: any, idx: any) => item !== deleteUtteranceValue);

    let values = {
      name_of_intent: data.context.name_of_intent,
      utterances: newList,
      id: data.jid
    }
    setlist(newList)


    let formData = new FormData();
    formData.append('updateIntent', JSON.stringify(values))
    submit(formData, { action: `/intents/${data.jid}`, method: 'post' })

    setOpenUtteranceDialog(false)
  }


  const handleIntentDelete = () => {
    let values = {
      id: data.jid
    }

    let formData = new FormData();
    formData.append('deleteIntent', JSON.stringify(values))
    submit(formData, { action: `/intents/${data.jid}`, method: 'post' })
    setOpenIntentDialog(false)
  }

  return (
    <Box bgcolor={'alternate.main'}>
      {data && <pre>{JSON.stringify(data, null, 1)}</pre>}
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
              Intents
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
            <Grid container spacing={4}>

              <Grid item xs={12}>
                <Typography variant={'h6'}>
                  Intent
                </Typography>
              </Grid>

              <Grid item xs={12}
                container
                spacing={2}
                sx={{ px: { xs: 2, md: 3 } }}
                direction="row"
              >
                {
                  openEditIntent
                    ?
                    <Grid item xs={10}>
                      <TextField
                        label="Intent *"
                        variant="outlined"
                        name={'name_of_intent'}
                        fullWidth
                        defaultValue={intent}
                        onChange={event => setUpdateIntent(event.target.value)}
                      />
                    </Grid>
                    :
                    <Grid item xs={10}>
                      <Box marginLeft={2}>
                        {data.context.name_of_intent}
                      </Box>
                    </Grid>
                }

                <Grid item xs={2}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 'auto' }}>
                    <Button variant="outlined" component="label" onClick={handleIntentEdit}>
                      {openEditIntent ? "cancel" : "Edit"}
                    </Button>
                    {
                      openEditIntent
                        ?
                        <Button variant="contained" color="primary" disabled={!updateIntent} onClick={handleIntentSave}>
                          save
                        </Button>
                        :
                        <IconButton color="primary" aria-label="delete" component="label" onClick={()=>setOpenIntentDialog(true)}>
                          <DeleteIcon />
                        </IconButton>
                    }
                  </Stack>
                </Grid>
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

              <Input
                name='id'
                value={data.jid}
                type="hidden"
              />
              {/* <Grid item container xs={12}>
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
                    Update
                  </Button>
                </Box>
              </Grid> */}
            </Grid>
          </Form>
        </Card>
      </Container>


      <Dialog
        open={openUtteranceDialog}
        onClose={handleUtteranceDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Would you like to delete?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteUtteranceValue}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUtteranceDialogClose}>Cancel</Button>
          <Button onClick={confirmHandleUtteranceDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openIntentDialog}
        onClose={handleUtteranceDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Would you like to delete this intent and utterances?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {data.context.name_of_intent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenIntentDialog(false)}>Cancel</Button>
          <Button onClick={handleIntentDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateFaq;
