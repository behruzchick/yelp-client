import React, { useState } from 'react'
import'./Create.css'
import { gql, useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
const CREATE_RESTARAUNT = gql `
    mutation CreatePost ($restaurantName:String! , $restaurantDesc:String!,$restaurantCity:String!, $id:ID!){
    addPost(userID:$id post:{
    restaurantName:$restaurantName
    restaurantDesc:$restaurantDesc
    restaurantCity:$restaurantCity
  }) {
        id
        name
        email  
	}
}
`
export const Create = () => {
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")
    const [city,setCity] = useState("")
    const navigate = useNavigate()
    const id  = useParams()
    const [addRestarauntMutation, {loading, error}] = useMutation(CREATE_RESTARAUNT, {
        onCompleted: () => {
            alert("Succes added  Reastaraunt please refresh page")
        }
    })
    function handleCreate(){
        addRestarauntMutation({
            variables:{
                id:id.id,
                restaurantName:name,
                restaurantDesc:desc,
                restaurantCity:city,
            }
        }).then((data) => {
            console.log(data);
        }).catch((error)=> {
            console.log(error);
            alert("Succes added  Reastaraunt please refresh page")
        })
    }
  return (
    <div className='create_wrape'>
        <h3 style={{color:"#fff"}}>Add your restaraunt</h3>
        <form onSubmit={handleCreate} className='form-create'>
            <input type="text" placeholder='Restaraum name' onChange={(e) => setName(e.target.value)} className={name === "" ? "erorr" : null}/>
            <span>{name === "" ? <span className='span-erorr first'>Please enter Name Reastaraunt</span> : null}</span>
            <input type="text" placeholder='Restaraum description' onChange={(e) => setDesc(e.target.value)} className={desc === "" ? "erorr" : null}/>
            <input type="text" style={{marginTop:"30px"}} placeholder='Restaraum city' onChange={(e) => setCity(e.target.value)} className={desc === "" ? "erorr" : null}/>
        </form>
        <button className='btn' onClick={handleCreate} disabled={name === "" && desc === ""}>
            Add
        </button>
    </div>
  )
}
