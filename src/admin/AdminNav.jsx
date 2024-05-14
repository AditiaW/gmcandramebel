import React from 'react';
import { Container , Row } from 'reactstrap'
import useAuth from "../custom-hooks/useAuth"
import "../styles/admin-nav.css"
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'

const logout=()=>{
    signOut(auth).then(()=>{
      toast.success("Logged out")
    }).catch(err=>{
      toast.error(err.message)

    })
  }

const admin_nav=[
    {
        display : "Dashboard" ,
        path:"/dashboard"
    },
    {
        display : "All-Products" ,
        path:"/dashboard/all-products"
    },
    {
        display : "Orders" ,
        path:"/dashboard/orders"
    },
    {
        display : "Users" ,
        path:"/dashboard/users"
    },
    {
        display: "Add Product", 
        path: "/dashboard/add-products"
      }
]

const AdminNav = () => {

    const{currentUser}=useAuth();

  return (
   <>
    <header className='admin_header'>
     <div className="admin_nav-top">
        <Container>
            <div className="admin_nav-wrapper-top">
                <div className="logo">
                <h2>
                    <Link to="/home">GMCandraMebel</Link>
                </h2>
                </div>
                <div className="search_box">
                    <input type="text" placeholder='Search....' />
                    <span><i class="ri-search-line"></i></span>
                </div>
                <div className="admin_nav-top-right">
                    <img src={currentUser && currentUser.photoURL} alt="" />
                    <span onClick={logout}><i class='ri-logout-box-line'></i></span>
                </div>

            </div>
        </Container>
     </div>
    </header>
    <section className="admin_menu p-0">
        <Container>
            <Row>
                <div className="admin_navigation">
                    <ul className="admin_menu-list">
                        {
                            admin_nav.map((item , index)=>(
                                <li className="admin_menu-item" key={index}>
                                    <NavLink to={item.path} className={navclass=>navclass.isActive ? "active_admin-menu " : ""} >{item.display}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Row>
        </Container>
    </section>
   </>
  )
}

export default AdminNav