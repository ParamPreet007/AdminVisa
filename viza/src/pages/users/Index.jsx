import { Routes } from "react-router-dom"
import { Listing } from "./Listing"
import { Route } from "lucide-react"
import { Add } from "./Add"

const Index = ()=>{
    return (
        <>
        <Routes>
            <Route key='listing' path="/" element={<Listing/>} />
            <Route key='add' path="/add" element={<Add/>}/>

        </Routes>
        </>
    )
}
export default Index