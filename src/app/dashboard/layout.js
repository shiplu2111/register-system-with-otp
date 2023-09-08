
import Sidebar from "../components/sidebar";

export const metadata = {
  title: "Dashboard",
  description: "Developed by Shiplu",
};

  export default function DashboardLayout({ children }) {
    return (
       
             <>
        <Sidebar />
        {children}
        
      </>
        
     
    )
  }