import Navbar from '../components/navbar'
import { Outlet } from 'react-router'
const Layout = () =>{
    return(
        <>
        <Navbar />
        <Outlet/>
        </>
    )
}

export default Layout