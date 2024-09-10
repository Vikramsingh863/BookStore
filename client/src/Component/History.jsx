import { Box, Button, Typography, styled } from '@mui/material'

import { useState } from 'react'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useContext, useCallback, useMemo } from 'react';
import { Datacontext } from '../Context/Dataprovider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';
import { getAllBooks, getReportbyBookId, getAllUsers } from '../Services/api';
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





export default function Home() {

  const [books, setBooks] = useState([])
  const [reports, setReports] = useState([])
  let totalEarning=[0]
  const {users, setUsers}=useContext(Datacontext)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await getAllBooks();
        setBooks(result);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  async function getReport(value) {
    const result = await getReportbyBookId(value._id)
    setReports(result)
  }
  function userName(userId){
    
    //  const username= users.filter((a)=>{
    //     if(a._id==userId)
    //       return a.name
    //   })
    const exists = users.find(user => user._id == userId);
    console.log(exists)
    if(exists?.name){
      return exists.name  }
      else{
        return userId
      }
  }

  useEffect(() => {
    async function fetchingData() {
      const data = await getAllUsers()
      console.log(data)
      setUsers(data)
    }
    fetchingData()
  }, [])

  function timeStamp(timestamp) {
    const date = new Date(timestamp)
    let day = date.getDate()
    let month = date.toLocaleString('default', { month: 'short' });
    console.log(timestamp, day, month)
    return (`${day}-${month}`)

  }
function Earning(rent, from, to){
  const borrow =new Date(from).getDate()
 const returned = new Date(to).getDate()
 let days = borrow-returned 
 if(days==0){days=+1}
 totalEarning = [...totalEarning,rent*days]
  return(`${rent} * ${days} = ${rent*days}`) 
}
function totalIncome(totalEarning){
let earning= totalEarning.reduce((a,b)=>{
    return a+b;
  })
  return earning
}

  return (

    <Container>

      <Left>
        {/* <Button variant="outlined" style={{ width: '250px', height: '50px' }}  >Get Books</Button> */}
        <Autocomplete
          disablePortal
          options={books}
          getOptionLabel={(option) => option.name}
          sx={{ maxWidth: 250 }}
          renderInput={(params) =>
            <TextField {...params} label="Select a Book" />}
          onChange={(event, value) => {
            value&&getReport(value)

          }}
          isOptionEqualToValue={(option, value) => option._id === value._id}
        />

        {/* <Box style={{ border: '1px solid #d3d3d3', borderRadius: '10px', padding: '10px', maxWidth: '230px' }}>
          <Typography>Select Price Range</Typography>

        </Box>
        <Button variant="outlined" style={{ width: '250px', height: '50px' }} > Search </Button> */}
      </Left>

      <Right>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell align="left">S.No</TableCell>


                <TableCell align="left">Borrower</TableCell>
                <TableCell align="left">Borrowed</TableCell>
                <TableCell align="left">Returned </TableCell>
                <TableCell align="left">Rent </TableCell>

              </TableRow>
            </TableHead>

            <TableBody>

              {
                reports && reports.map((reports, count) => (
                  <TableRow
                    key={books._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {count + 1}
                    </TableCell>
                    <TableCell align="left">{userName(reports.userId)}</TableCell>
                    <TableCell align="left">{timeStamp(reports.startDate)}</TableCell>
                    <TableCell align="left">{timeStamp(reports.createdAt)}</TableCell>
                    <TableCell align="left">{Earning(reports.rent_per_day,reports.startDate,reports.createdAt )}</TableCell>
                  </TableRow>
                  
                ))
              }
              <TableRow>
              <TableCell align="left">
                Total Earning
                </TableCell>
              <TableCell colSpan={3} align="right">
                </TableCell>
                <TableCell align="left">
                {totalIncome(totalEarning)}
                </TableCell>
              </TableRow>
            </TableBody>


          </Table>
        </TableContainer>

      </Right>
    </Container>

  )
}