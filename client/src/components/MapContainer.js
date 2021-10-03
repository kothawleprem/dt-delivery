import React from 'react';
import { useState, useEffect } from 'react'

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios'
const MapContainer = () => {
    
    const [disable, setDisable] = React.useState(false);
    const [tasks, setData] = useState([]);
    const [selected,setSelected] = useState({})
    

    const onSelect = task => {
      setSelected(task)
    }

    useEffect(()=>{
        axios.get('https://dt-delivery.herokuapp.com/read')
        .then(response => {
            // console.log(response)
            setData(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    })


  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat:12.931496, lng: 77.678845
  }
  const icons = {
    true: {
      icon:"delivered.svg",
    },
    false: {
      icon: "un-delivered.svg",
    },
    mylocation: {
      icon:"my location.svg",
    },
  };

  
  const updateStatus = () => {
    return (
      fetch("https://dt-delivery.herokuapp.com/update?orderid=" + selected.orderId)
      
    

    )
  }

  

  return (
     <LoadScript
       googleMapsApiKey='AIzaSyBWov5InMgouGGDyTHkkSp-y8fQF6TwlnI'>
      <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={20}
          center={defaultCenter}>
         


         {
          tasks.map(task => {
            
              return (
                
               
              <Marker key={task.orderId} position={{lat: parseFloat(task.latitude),lng: parseFloat(task.longitude)}}  label={task.rank.toString()} icon={icons[task.visited.toString()].icon} onClick={() => onSelect(
                { 
                  location:
                      {
                        lat: parseFloat(task.latitude),lng: parseFloat(task.longitude)
                      },
                  orderId: task.orderId,
                  customerName: task.customerName,
                  addressId: task.addressId,
                  flat: task.flat,
                  building: task.building,
                  wing: task.wing,
                  area: task.area,
                  city: task.city,
                  latitude:task.latitude,
                  googleAddressData:task.googleAddressData,
                  instructions:task.instructions,
                  phoneNo:task.phoneNo,
                  visited:task.visited
                }
                
                )}
                />
              )
            })

            
            
         }
         
         
        {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
            <div  className="card"  className="iw-container">
            <div className="card-body" > 
              <h5 className="card-title" className="title">{selected.customerName}</h5>
              <br />
              <p>{selected.flat}{selected.building}{selected.wing}{selected.area}{selected.city}</p>
              <br />
              <h6 >Instructions: {selected.instructions}</h6>
              <h6 >Contact: {selected.phoneNo}</h6>
              <h6 >Status: {selected.visited.toString()}</h6>
              <button type="button" className="btn btn-danger" disable={true} onClick={() => setDisable(true)} onClick={updateStatus} > delivered</button>
             
           </div>

          </div>
            </InfoWindow>
            )
         }
     </GoogleMap>

     </LoadScript>
  )
}
export default MapContainer;