import Box from '@material-ui/core/Box'
import WarningIcon from '@material-ui/icons/Warning'

export const ErrorMessage = ({text}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      m={1}
      p={1}
    >
      <Box>
        <WarningIcon fontSize="large" />
      </Box>
      <Box>
        <p>{text}</p>
      </Box>
    </Box>
  )
}
