import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { useCookies } from "react-cookie";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const ManageStore = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["user_id"]);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the endpoint using axios
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/store/");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetail = (storeId) => {
    navigate(`/admin/manage-store/${storeId}`);
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{ display: "flex", backgroundColor: "#6CD4FF" }}
      >
        <img
          src={logo}
          className="cursor-pointer"
          style={{ width: "100px", height: "100px" }}
          onClick={() => {
            navigate("/admin");
          }}
        />
        <nav
          className="navbar p-3"
          style={{ backgroundColor: "#6CD4FF", width: "100%" }}
        >
          <div style={{ flex: 2 }}></div>
          <div>
            {cookie.user_id && (
              <div className="d-flex">
                <p
                  style={{
                    fontFamily: "Literata",
                    fontSize: "16pt",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  Welcome, Admin
                </p>
                <button
                  className="me-2 ms-12 rounded"
                  style={{
                    fontFamily: "Literata",
                    fontSize: "16pt",
                    display: "block",
                    fontWeight: 700,
                    color: "white",
                    backgroundColor: "#C46E85",
                    borderColor: "#C46E85",
                    width: "8rem",
                    height: "2.5rem",
                  }}
                  onClick={() => {
                    removeCookie("user_id");
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="container-fluid" style={{ backgroundColor: "#1286CE" }}>
        <NavLink
          to="/admin"
          style={{
            color: "white",
            fontFamily: "Literata",
            fontWeight: 700,
            fontSize: "15pt",
            marginLeft: "3%",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/admin/manage-users"
          style={{
            color: "white",
            fontFamily: "Literata",
            fontWeight: 700,
            fontSize: "15pt",
            marginLeft: "3%",
          }}
        >
          Users Management
        </NavLink>
        <NavLink
          to="/admin/manage-community"
          style={{
            color: "white",
            fontFamily: "Literata",
            fontWeight: 700,
            fontSize: "15pt",
            marginLeft: "3%",
          }}
        >
          Posts Management
        </NavLink>
        <NavLink
          to="/admin/manage-store"
          style={{
            color: "white",
            fontFamily: "Literata",
            fontWeight: 700,
            fontSize: "15pt",
            marginLeft: "3%",
          }}
        >
          Store Management
        </NavLink>
      </div>
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Stores</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Store ID</th>
              <th className="py-2 px-4 border-b">Store Name</th>
              <th className="py-2 px-4 border-b">Store Description</th>
              <th className="py-2 px-4 border-b">Owner</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.store_id}>
                <td className="py-2 px-4 border-b">{store.store_id}</td>
                <td className="py-2 px-4 border-b">{store.store_name}</td>
                <td className="py-2 px-4 border-b">
                  {store.store_description}
                </td>
                <td className="py-2 px-4 border-b">{store.owner}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleViewDetail(store.store_id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageStore;
