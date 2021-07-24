import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App'

const Profile = ()=>{
    const[mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{               
                "Authorization":"Bearer "+localStorage.getItem("jwt")  
            }
        }).then(res=>res.json())
        .then(result=>{
           setPics(result.mypost)
        })
    },[])
    return(
        <div style= {{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>
        <div>
            <img style={{width:"160px", height:"160px", borderRadius:"80px"}} 
            src="https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            />
        </div>
        <div>
            <h4>
                {state?state.name:"loading"}
            </h4>
            <div style={{width:"108%",display:"flex",justifyContent:"space-between"}}>
            <h6>post</h6>
            <h6>follower</h6>
            <h6>following</h6>
        </div>        
      </div>
      </div>

      <div className="gallery">
      {
          mypics.map(item=>{
              return(
                <img key={item._id} className="item" src={item.photo} alt={item.title} />  
      
              )
          })
      }
     
      </div>
      </div>
    )
}

export default Profile;