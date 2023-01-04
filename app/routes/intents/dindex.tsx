import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Container from '~/components/Container';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Form, Link as RouterLink, useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import type { ActionFunction, LoaderFunction} from '@remix-run/node';
import { json } from '@remix-run/node';
import { HttpRequest } from '~/utils/httpRequest';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



// export const loader: LoaderFunction = async () => {
//   try {
//     const response = await HttpRequest("list_intent", {})
//     return json(response.report[0]);
//   } catch (error) {
//     console.log(error)
//     return json(error);
//   }
// }

export const action: ActionFunction = async ({ request }) => {

  let form = await request.formData()
  let values = Object.fromEntries(form)
  console.log("values")
  console.log(values)

  try {
    const response = await HttpRequest("get_all_anchors", values)
    return json({"data": response.report[0], "data2": values});
  } catch (error) {
    console.log(error)
    return json(error);
  }
}

// const FaqsIndex = (): JSX.Element => {
//   const {data, data2} = useActionData();


//   const submit = useSubmit();
//   // const data = useLoaderData();
//   const [open, setOpen] = React.useState(false);
//   const [deleteID, setDeleteID] = React.useState();
//   const handleClickOpen = (props: any) => {
//     setDeleteID(props)
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleDelete = async () => {
//     let id = { id: deleteID }

//     await HttpRequest("delete_intents", id)
//     submit(null, { action: "/intents", method: 'get' })

//     setOpen(false);
//   };


//   return (

//     <Box bgcolor="alternate.main">
//       {/* {data && <pre>{JSON.stringify(data, null, 1)}</pre>} */}

//       <Container maxWidth={800}>

//         <Grid
//           container
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//           m={2}
//         >
//           <Grid item >
//             {/* <h1>Faqs</h1> */}
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 700,
//               }}
//             >
//               Anchor Group
//             </Typography>
//           </Grid>

//           <Grid item justifyContent='right' >
//               <Button variant="contained" component={RouterLink} to="/intents/new">
//                 New Anchor Group
//               </Button>
//           </Grid>
//         </Grid>


//         <List
//           sx={{
//             width: '100%',
//             bgcolor: 'background.paper',
//             padding: 2,
//             borderRadius: 2,
//             boxShadow: 2,
//           }}

//         >
//           {[...data].reverse().map((item: any) => (
//             <Grid container spacing={2} key={item.jid} mt={2}>
//               <Grid item xs={10}>
//                 <Box marginLeft={2}>
//                   <ListItemText
//                     primary={item.anchor}
//                     primaryTypographyProps={{ fontWeight: 700 }}
//                   />
//                   {/* <Box marginTop={2}>
//                     <Typography variant={'subtitle2'}>
//                       {item.context.answer}
//                     </Typography>
//                   </Box> */}
//                 </Box>
//               </Grid>
//               <Grid item xs={2} >
//                 <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 'auto' }}>
//                   <Form method="post" action="intents/groups">
//                     <input type="hidden" name='topic_id' value={data2.topic_id} />
//                     <input type="hidden" name='anchor_group_name' value={data2.anchor_group_name} />
//                     <Button variant="outlined" component={RouterLink} to={item.anchor}>
//                       Edit
//                     </Button>
//                     </Form>
//                   <IconButton color="primary" aria-label="delete" component="label" onClick={() => handleClickOpen(item.jid)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </Stack>
//               </Grid>
//             </Grid>
//           ))}
//         </List>

//       </Container>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Use Google's location service?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Would you like to delete?
//           </DialogContentText>
//           <DialogContentText id="alert-dialog-description">
//             item.context.question
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleDelete} autoFocus>
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//     </Box>
//   );
// };


const UpdateFaq = (): JSX.Element => {
  const {data} = useLoaderData();

  return(
    <>
    hello
    </>
  )
}


export default UpdateFaq;
// export default FaqsIndex;
