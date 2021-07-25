import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

export const Products = ({data}) => {
  return (
    <React.Fragment>
      <Typography>Products</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Size</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

Products.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
