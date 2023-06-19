import React from 'react'
import { Box } from '@mui/material'

import { Menu } from './Menu'
import { Container } from './Container'

export function Home() {
  return (
    <Box id='Home' style={{ 
      display: 'flex',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#403759',
      border: 10,
      borderColor: 'black'
    }}>
      <Menu/>
      <Container/>
    </Box>
  )
}
