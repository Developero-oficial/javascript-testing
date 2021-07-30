import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import {Link} from 'react-router-dom'

import {Layout} from '../../components/layout'
import {saveProductService} from '../../services/products-services'

const initialFormValidations = {
  name: '',
  size: '',
  description: '',
}

export const AddProductPage = () => {
  const [isSaving, setIsSaving] = React.useState(false)
  const [isSavedSuccess, setIsSavedSuccess] = React.useState(false)
  const [formValidations, setFormValidations] = React.useState(
    initialFormValidations,
  )

  const getIsValidForm = ({name, size, description}) => {
    const formValidations = {
      name: '',
      size: '',
      description: '',
    }

    if (!name) {
      formValidations.name = 'The name is required'
    }

    if (!size) {
      formValidations.size = 'The size is required'
    }

    if (!description) {
      formValidations.description = 'The description is required'
    }

    setFormValidations(formValidations)

    return name && size && description
  }

  const handleCloseSnackbar = e => {
    setIsSavedSuccess(false)
  }

  const handleSubmit = async e => {
    try {
      setIsSaving(true)
      e.preventDefault()
      const {name, size, description} = e.target.elements

      const formValues = {
        name: name.value,
        size: size.value,
        description: description.value,
      }

      const isValidForm = getIsValidForm(formValues)

      if (!isValidForm) {
        return
      }

      const response = await saveProductService(formValues)

      setFormValidations(initialFormValidations)

      if (response.status === 201) {
        name.value = ''
        size.value = ''
        description.value = ''
        setIsSavedSuccess(true)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Layout>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Add new product
          </Typography>

          {isSaving && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Name"
                fullWidth
                error={!!formValidations.name}
                helperText={formValidations.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                id="size"
                name="size"
                label="Size"
                fullWidth
                error={!!formValidations.size}
                helperText={formValidations.size}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Description"
                fullWidth
                error={!!formValidations.description}
                helperText={formValidations.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth component={Link} to="/">
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSaving}
                fullWidth
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isSavedSuccess}
        autoHideDuration={3000}
        message="Product saved successfully"
        onClose={handleCloseSnackbar}
      />
    </Layout>
  )
}
