
import React, {useState,useEffect,useContext} from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'



function Order_add() {
    let navigate = useNavigate();
    const [name,setName] = useState("Person name");
    const [last,setLast] = useState("person last");
    const [customer,setCustomer] = useState(null);
    const [parent,setParent] = useState(null);
    let { logoutUser} = useContext(AuthContext)
    let { pk } = useParams();
    let authTokens = localStorage.getItem("authTokens")
    authTokens = JSON.parse(authTokens)

    //  get user for order_add so we know who we craete an order for
    const getUser = async () => { 
        
        const response = await fetch(`http://127.0.0.1:8000/api/order_add/${pk}`,{
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+String(authTokens?.access)
        },
        
        })

        let data = await response.json()
        data = data["result"]
        setName(()=>data?.customer.name)
        setLast(()=>data?.customer.last)
        setCustomer(data?.customer)
        setParent(data?.parent)
        

    }
    // send order to bacend 
    const order_add_api = async (e) => { 
        
        e.preventDefault()
        const response = await fetch(`http://127.0.0.1:8000/api/order_add/${pk}`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+String(authTokens.access)
        },
        body: JSON.stringify({description:e.target.description.value,
                            price:e.target.price.value,
                            is_paid:e.target.is_paid.value,
                            who_paid:e.target.whoPaid.value,
                            payment_method:e.target.paymentMethod.value,
                }),
        })
        let data = await response.json()
        if(response.status === 200){
            data = data?.result
            data = data.customer
            navigate(`/profile/${data.id}`)    
        }else{
            console.log("somethin went wrong status is not 200 ")
        }
        
    }

    useEffect(()=>{
        getUser()
    },[])
    return (
        
        <div>
            <form className="add-order-form" onSubmit={order_add_api}>
                    <div className="add-order-container">
                    <label htmlFor="name">Name:</label>
                    <input  className="input-text" type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
                    
                    <label htmlFor="last">Last:</label>
                    <input  className="input-text" type="text" id="last" name="last" value={last} onChange={(e)=>setLast(e.target.value)} />
                    
                    <label htmlFor="description">Descr:</label>
                    <input  className="input-text" type="text" id="description" name="description" placeholder="description" required />
                
                    <label htmlFor="price">Price:</label>
                    <input  className="input-text" type="text" id="price" name="price" placeholder="price" required />
                    
                    <label htmlFor="is_paid">Is paid: </label>
                    <input  class="input-text" type="checkbox" id="is_paid" name="is_paid"/>

                    <label htmlFor="whoPaid">Who paid:</label>
                    <input  className="input-text" type="text" id="whoPaid" list="whoPaid_list" name="whoPaid" placeholder="Who Paid" />
                    <datalist id="whoPaid_list">
                        <option value={customer?.name} />
                        <option value={parent?.name} />
                    </datalist>
                
                    <label htmlFor="paymentMethod">Method: </label>
                    <input  className="input-text" type="text" list="paymentMethod_list" id="paymentMethod" name="paymentMethod"/>
                    <datalist id="paymentMethod_list">
                        <option value="CASH" />
                        <option value="CARD" />
                    </datalist>

                    <button className="add-button search-button">ADD</button>
                </div>
            </form>
        </div>
    
    );
  }
  
  export default Order_add;