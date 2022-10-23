import axios from 'axios';


export  const signup = async (data) =>{
    const config ={
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const response = await axios.post('/api/auth/signup', data, config);
    return response; 
};


export  const signin = async (data) =>{
    const config ={
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post('/api/auth/signin', data, config);
    return response; 
};

export const getUserData = async(data)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    const response = await axios.get('/api/auth/getinfo/'+data,config);
    return response;
}

export const editUserData = async(data)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    console.log("User Data from Auth : ",data);
    const response = await axios.put('/api/auth/editsellerinfo',data,config);
    return response;
}

export const addUserImage = async(data)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    
    const response = await axios.post('/api/auth/adduserimage',data,config);
    return response;
}



export const addPost = async(data)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    
    const response = await axios.post('/api/auth/addPost',data,config);
   
    return response;
}
export const deletePostData = async(postID)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    
    const response = await axios.delete('/api/auth/deletepost/'+postID,config);
   
    return response;
}
export const getPostData = async(postID)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    console.log("ID : "+postID);
    const response = await axios.get('/api/auth/getpost/'+postID,config);
   
    return response;
}
export const updatePostData = async(data)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    const response = await axios.put('/api/auth/updatepost',data,config);
    return response;
}

export const getCountsData = async()=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    const response = await axios.get('/api/auth/getuserscount',config);
    return response;
}

export const getSellersData = async()=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    const response = await axios.get('/api/auth/getallsellers',config);
    return response;
}

export const deleteSellersData = async(email)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    const response = await axios.delete('/api/auth/deleteSeller/'+email,config);
    return response;
}


export const getBuyersData = async()=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    const response = await axios.get('/api/auth/getallbuyers',config);
    return response;
}

export const deleteBuyersData = async(email)=>{

    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    const response = await axios.delete('/api/auth/deletebuyer/'+email,config);
    return response;
}

export const addPostByAdmin = async(data)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    
    const response = await axios.post('/api/auth/addadminpost',data,config);
   
    return response;
}

export const getPostByAdmin = async(data)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        }
    }
    
    const response = await axios.get('/api/auth/getadminpost',config);
   
    return response;
}
