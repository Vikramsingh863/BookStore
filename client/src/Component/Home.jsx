import { Box, Button, Typography, styled, Input } from '@mui/material'
import { getAllBooks, updateBook,returnBook } from '../Services/api'
import { useState } from 'react'
import { getAllUsers } from '../Services/api.js';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useContext, useCallback, useMemo,useRef } from 'react';
import { Datacontext } from '../Context/Dataprovider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';
import { filterBooks } from '../Services/api';
const Container = styled('Box')`
  display:flex;
  max-Width:100vw;
  Height:100vh
`
const Left = styled('Box')`
  Width:25%;
  margin:10px;
    & > * {
    margin-top: 20px;
  }

`
const Right = styled('Box')`
  Width:75%;
  Height:100%;
  overflow:scroll;
  
`

const getUniqueCategories = (books) => {

  const uniqueCategories = [...new Set(books.map(book => book.category))];
  return uniqueCategories.map(category => ({
    category,
    // Optional: include any additional properties if needed
  }));
};



export default function Home() {
  const inputRef = useRef(null)
  const [books, setBooks] = useState([])
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([])
  const { users, setUsers } = useContext(Datacontext)
  const [assignUser, setAssignUser] = useState()

  const [value, setValue] = React.useState([10, 30]);

  // value&&console.log(value)

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };
    function valuetext(value) {
      return `${value}$`;
    }

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  // Memoize valuetext to avoid re-creation on every render
  // const valuetext = useCallback((value) => {
  //   return `${value}°C`;
  // }, [users]);

  // Optional: Memoize the slider value if the logic to compute it is complex
  const memoizedValue = useMemo(() => value, [value]);

  // Logging the value to console (only for debugging purpose)
  




  useEffect(() => {
    setUniqueCategories(getUniqueCategories(books));
  }, [books]);


  useEffect(() => {
    async function fetchingData() {
      const data = await getAllUsers()
      
      setUsers(data)
    }
    fetchingData()
  }, [])

  async function Filtered(value, categoryFilter) {
    
    const min_rent = value[0]
    const max_rent = value[1]
    const category = categoryFilter
    
    const result = await filterBooks(false, min_rent, max_rent, categoryFilter, inputRef.current.value)
    setBooks(result)
  }


  async function getBooks() {
    let result = await getAllBooks()
    setBooks(result)
  }
  useEffect(() => {
    getBooks()

  }, [assignUser])


  async function assignToUser(bookId, userId) {
    const result = await updateBook(bookId, userId)
    setAssignUser(result)
  }

  async function returned(bookId) {  
    
    const result = await returnBook(bookId)
    setAssignUser(result)

  }
  function timeStamp(timestamp){
    const date = new Date(timestamp)
    let day=date.getDate()
    let month = date.toLocaleString('default', { month: 'short' });
    
    return(`${day}-${month}`)
    
  }
  function userName(userId){
  const exists = users.find(user => user._id == userId);
  
  if(exists?.name){
    return exists.name  }
    else{
      return userId
    }
}

  return (

    <Container>

      <Left>
        <Button variant="outlined" style={{ width: '250px', height: '50px' }} onClick={getBooks} >Get All Books</Button>
        {/* <Input inputRef={inputRef} variant="outlined"/> */}
        <TextField id="outlined-basic" label="Type Book Name" variant="outlined" style={{ width: '250px', height: '50px',marginTop:'10px'  }} inputRef={inputRef}/>
        {/* <input ref={inputRef} placeholder="Enter sub name" /> */}
        <Autocomplete
          disablePortal
          options={uniqueCategories}
          getOptionLabel={(option) => option.category}
          sx={{ maxWidth: 250 }}
          renderInput={(params) =>
            <TextField {...params} label="Select Category" />}
          onChange={(event, value) => {
            // console.log(event.target.innerText)
            getBooks()
            setCategoryFilter(event.target.innerText)
          }}
        />
        <Box  style={{border:'1px solid #d3d3d3' ,borderRadius:'10px', padding:'10px', maxWidth:'230px'}}>
          <Typography>Select Price Range</Typography>
          
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            sx={{ maxWidth: 200 }}
            min={10}
            max={30}

          />
        </Box>
        <Button variant="outlined" style={{ width: '250px', height: '50px' }} onClick={() => Filtered(value, categoryFilter)} > Search </Button>
      </Left>

      <Right>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell align="left">S.No</TableCell>
                <TableCell align="left">Book Name</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Rent </TableCell>
                <TableCell align="center">Issued to</TableCell>
                <TableCell align="center">Issue Date </TableCell>
                <TableCell align="left">Assign now</TableCell>

              </TableRow>
            </TableHead>
            
            <TableBody>

              {
                books && books.map((books, count) => (
                  <TableRow
                    key={books.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {count + 1}
                    </TableCell>
                    <TableCell align="left">{books.name}</TableCell>
                    <TableCell align="left">{books.category}</TableCell>
                    <TableCell align="left">{books.rent_per_day}</TableCell>
                  
                    <TableCell align="center">{books.userId?userName(books.userId):"_"}</TableCell>
                    {
                     
                    }
                    <TableCell align="left">{books.userId?timeStamp(books.updatedAt): " _ "}</TableCell>

                    <TableCell align="left">
                      {books.userId ?
                        <Button onClick={() => returned(books._id)}>Return</Button> :

                        //   <Autocomplete
                        //   disablePortal
                        //   options={users}
                        //   getOptionLabel={(option) => option.name}
                        //   optionLabel={(option) => option._id}
                        //   sx={{ width: 300 }}
                        //   renderInput={(params) => <TextField {...params} label="Assign Now" />}
                        //   onChange={(event)=>assignToUser(books._id,event )}
                        // />


                        <Autocomplete
                          disablePortal
                          
                          options={users}
                          getOptionLabel={(option) => option.name}
                          sx={{ width: 200 }}
                          renderInput={(params) => <TextField {...params} label="Assign Now" />}
                          onChange={(event, value) => {
                            if (value) {

                              assignToUser(books._id, value._id);
                            }
                          }}
                        />

                        // <Button onClick={()=>assignToUser(books._id)}>assign now</Button>
                      }
                    </TableCell>

                  </TableRow>
                ))}
            </TableBody>


          </Table>
        </TableContainer>

      </Right>
    </Container>

  )
}