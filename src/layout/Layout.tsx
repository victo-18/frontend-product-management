import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
const Layout = () => {
  return (
    <>
       <header className="bg-slate-800">
        <ToastContainer/>
        <div className=" mx-auto max-w-6xl py-4 ">
            <h1 className="text-4xl font-extrabold text-white">
                Products Management
            </h1>
        </div>

       </header>
    <main className="mx-auto mt-10 max-w-6xl  py-4 bg-white shadow">
    <Outlet/>
    </main>
    </>
 
  )
}

export default Layout