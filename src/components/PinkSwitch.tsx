import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'

const PinkSwitch = styled(Switch)({
  width: 44,
  height: 24,
  padding: 0,

  '& .MuiSwitch-switchBase': {
    padding: 2,
    top: 0,
    left: 0,

    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',

      '& + .MuiSwitch-track': {
        backgroundColor: '#ec4899', // pink-500
        opacity: 1,
      },
    },
  },

  '& .MuiSwitch-thumb': {
    width: 20,
    height: 20,
    boxShadow: 'none',
  },

  '& .MuiSwitch-track': {
    borderRadius: 12,
    backgroundColor: '#e5e7eb', // gray-200
    opacity: 1,
  },
})

export default PinkSwitch