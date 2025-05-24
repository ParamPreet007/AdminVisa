import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

 const AppLayout = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
    useEffect(() => {
    if (!token) navigate("/login");
  }, []);
  return (
    <div>Layout</div>
  )
}
export default AppLayout