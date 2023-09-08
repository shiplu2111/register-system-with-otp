
import Sidebar from "../components/sidebar";



  export default function DashboardLayout({ children }) {
    return (
       
             <>
        <Sidebar />
        {children}
        
      </>
        
     
    )
  }