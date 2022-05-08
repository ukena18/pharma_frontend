
import React, { useEffect } from 'react';

function Hello() {
    let getUsers = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/search', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',   
            }
        })
        let data = await response.json()    
        console.log(data)
        
    }
    let profile =  async ()=>{
        let authTokens = localStorage.getItem("authTokens")
        authTokens = JSON.parse(authTokens)
        let response = await fetch('http://127.0.0.1:8000/api/profile/11',{
            method:'GET',
            headers:{
                'Content-Type':'application/json', 
                "Authorization":"Bearer " + authTokens.access
            }
        })

        let data = await response.json()
        console.log("asfdfdsa")
        console.log(authTokens["access"])
        console.log(data)
    }
   useEffect(()=>{
    //    getUsers()
    profile()
   },[])
    return (
        <div>

            <h1>Hello</h1>
    </div>
    );
  }
  
  export default Hello;


