import React, { useState } from 'react'
import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material'
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

import './Home.css'
import brand from '../../assets/brand.svg'

const options = [
  {key: 'search', title: 'Ask Me', icon: <SearchOutlined/>, tooltip: 'You can search questions or choose from recently searched'},
  {key: 'dashboards', title: 'Dashboards', icon: <DashboardOutlinedIcon/>, tooltip: 'You can choose from the three available dashboard options'},
  {key: 'self', title: 'Self - Service Reporting', icon: <ListOutlinedIcon/>, tooltip: 'Choose the type of view as per your requirement'}
]

const handleClick = () => {}

const OptionsList = () => {
  return (
      <List dense={true}>
        {options.map((option) => (
          <ListItem disablePadding>
            <Tooltip title={option.tooltip} placement='right'>
              <ListItemButton 
                disableGutters /*className='Menu-options-list-item'*/ style={{marginLeft: '16px', display: 'flex', flexDirection: 'row'}}
                onClick={handleClick}
              >
                <ListItemIcon /*className='Menu-options-list-icon'*/ style={{minWidth:'35px', color: 'white'}}>
                  {option.icon}
                </ListItemIcon>
                <ListItemText className='Menu-options-list-text'
                  primary={option.title}
                  />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
  )
}

const Options = () => {
  return <Box id='options' className='Menu-options-box'>
    <OptionsList/>
  </Box>
}


const Profile = () => {
  return (
    <Box id='profile' className='Menu-profile-div'>
      <div id='avatar-icon' className='Menu-profile-avatar-div'>
        <Avatar /*className='Menu-profile-avatar-logo'*/ style={{width: 18, height: 18, backgroundColor: '#5D55BF'}}>
          <Typography /*className='Menu-profile-avatar-text' */ style={{alignSelf: 'center', fontSize: 8}}>
            MS
          </Typography>
        </Avatar></div>
      <div id='avatar-text' className='Menu-profile-text-div'>
        <Typography className='Menu-profile-text'>
          Admin
        </Typography>
      </div>
    </Box>
  )
}

const Branding = () => {
  return (
    <div id='brand' /*className='Menu-brand-div'*/ style={{display: 'flex', height: '10vh', width: '100%', alignItems: 'center'}}>
      <img src={brand} alt="brand" className='Menu-brand-image'/>
    </div>
  )
}
export function Menu(){
  const [open, setOpen] = React.useState(false)
  return (
    <Box id='menu' className='Menu'>
      <Branding/>
      <Options/>
      <Profile/>
    </Box>
  )
}

