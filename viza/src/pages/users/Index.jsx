import { Route, Routes } from "react-router-dom";
import Listing from "./Listing";
import Add from "./Add";

const Index = () => {
  return (
    <>
      <Routes>
        <Route key="user-list" path="/" element={<Listing />} />
        <Route key="user-listt" path="/list" element={<Listing />} />
        <Route key="add-user" path="/add" element={<Add />} />
      </Routes>
    </>
  );
};
export default Index;
