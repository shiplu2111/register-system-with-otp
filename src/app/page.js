
"use client"
import  {useState} from 'react';
import { useRouter } from 'next/navigation';
import {  toast } from 'react-toastify';

export default function Home() {
  const [otpStatus, setOtpStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValue,SetFormValue]=useState({email:"",password:"",otp:""});
  const [otp, setOtp] = useState(null);
  const router=useRouter();

  const inputChange = (name,value) => {
      SetFormValue(formValue=>(
          {
              ...formValue,
              [name]:value
          }
      ))
  }
  const sendOTP=async(e)=>{
    
    e.preventDefault();
    if(formValue.email.length===0){
      toast.error("Email Required");
  }
  else if(formValue.password.length===0){
      toast.error("Password Required");

  }
    else{
      setIsLoading(true);
      const config = {method: 'POST', body: JSON.stringify(formValue)}
      const response = await fetch("/api/email/auth-email", config)
      const json=await response.json();
      if(json['status']===true){
        // setOtpStatus=true;
        setOtpStatus(true);
        setOtp(json['otp']);
    }
    else {
        alert(json['message'])
    }
    setIsLoading(false);
    }
  }
  const Submit = async (e) => {
      e.preventDefault();
     
      
      if(formValue.otp.length===0){
      toast.error("OTP Required");
    }
    
      else{
       if(otp==formValue.otp){
          const config = {method: 'POST', body: JSON.stringify(formValue)}
          const response = await fetch("/api/login", config)
          const json=await response.json();
          if(json['status']===true){
              router.replace("/dashboard")
          }
          else {
              toast.error("OTP did not match");

          }

      }
      else{
          alert("OTP Did Not Match")
      }
      }
  }

  return (
   <>
   <div className="min-h-screen flex items-center justify-center">
   <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
  <div className="px-6 py-4">
    <div className="flex justify-center mx-auto">
      <img
        className="w-auto h-12 sm:h-12"
        src="/logo.png"
        alt=""
      />
    </div>
    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
     
     {
      otpStatus&&"Check Your Email For OTP to Login"
     }

     {
      !otpStatus&&"Register Your Email"
     }
    </h3>
    
    <form onSubmit={Submit} >
      <div className="w-full mt-4">
        <input
          className={`${otpStatus?'hidden':'block'} w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300`}
          type="email"
          placeholder="Email Address"
          aria-label="Email Address"
          value={formValue.email} onChange={(e)=>inputChange('email',e.target.value)}
        />
      </div>
      <div className="w-full mt-4">
        <input
          className={`${otpStatus?'hidden':'block'} w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300`}
          type="password"
          placeholder="Password"
          aria-label="Password"
          value={formValue.password} onChange={(e)=>inputChange('password',e.target.value)}
        />
      </div>

      <div className="w-full mt-4">
        <input 
          className={`${otpStatus?'block':'hidden'} w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300`}
          type="text"
          placeholder="OTP"
          aria-label="otp"
          value={formValue.otp} onChange={(e)=>inputChange('otp',e.target.value)}
        />
      </div>
      <div className="flex items-right justify-between mt-4">
        <div></div>
        <button type='submit' className={`${otpStatus?'':'hidden'} px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
          Sign In
        </button>
        <button onClick={sendOTP} type='button' className={`${otpStatus?'hidden':''} px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
          
          {isLoading ? 'Sending OTP....' : 'Send OTP'}
        </button>
      </div>
    </form>
  </div>
  <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
    <span className="text-sm text-gray-600 dark:text-gray-200">
      Already have an account?{" "}
    </span>
    <a
      href="#"
      className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
    >
      Login Here
    </a>
  </div>
</div>
</div>

   </>
  )
}
