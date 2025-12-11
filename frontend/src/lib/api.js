import axiosInstance from "./axios";

export const register = async (userData) => {
  console.log(userData);
  const response = await axiosInstance.post('/register', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axiosInstance.post('/login', userData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/logout');
  return response.data;
};
export const authuser=async()=>{
    try{
      const res=await axiosInstance.get("/me");
    
      return res.data;
    }
    catch(error){
        console.log("error occured in logout",error);
        return null;
    }

}
export const createProduct=async(formData)=>{
  console.log(formData);
   const response = await axiosInstance.post('/', formData);
  return response.data;
}
export const deleteProduct=async(id)=>{
       try{
      const res=await axiosInstance.delete(`/${id}`);
    
      return res.data;
    }
    catch(error){
        console.log("error occured in logout",error);
        return null;
    }
}
export const updateProduct=async(id,formData)=>{
       try{
      const res=await axiosInstance.put(`/${id}`,formData);
        console.log(res);
      return res.data;
    }
    catch(error){
        console.log("error occured in logout",error);
        return null;
    }
}
export const getProducts=async()=>{
     try{
      const res=await axiosInstance.get(`/`);
    
      return res.data;
    }
    catch(error){
        console.log("error occured in logout",error);
        return null;
    }
}
export const getProduct = async (id) => {
    
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
};