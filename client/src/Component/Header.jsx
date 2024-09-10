import {Box, styled, Container, Button, Icon} from '@mui/material'
import { Link } from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

export default function Header(){
    
   
    return(
        <>  
  
         <AppBar component="nav">
            
         <Toolbar >
            <IconButton>
            <Link to='/'>Books</Link></IconButton>
                 <IconButton><Link to='/history'>Records</Link></IconButton>
                 
                
               
                
            </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '64px' }}>
        
      </Container>
        </>
    )
}