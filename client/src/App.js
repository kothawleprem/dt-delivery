import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MapContainer from './components/MapContainer';
import './App.css';
import { CssBaseline, Grid } from '@material-ui/core';




function App() {
 return (
  <>
  <Header />
  <Grid container spacing={3} style={{ width: '100%' }}>
  <Grid item xs={12} md={4}>
  

  </Grid>

  <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
   <MapContainer />
   </Grid> 
   </Grid>

  </>
  );
}

export default App;
