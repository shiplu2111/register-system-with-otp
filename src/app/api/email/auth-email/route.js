import { NextResponse , NextRequest} from "next/server";
import nodemailer from "nodemailer";
import { SignJWT } from "jose";


// export async function GET(req, res) {
//   const Key = new TextEncoder().encode(process.env.JWT_KEY);
//   const payload = { email: "Abc@Abc. con", user_id: "Abc123" };
//   let token = await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setIssuer("https://localhost:3000")
//     .setExpirationTime("2h")
//     .sign(Key);
//   return NextResponse.json({ token: token });
// }

export async function POST(req, res) {
   const data  = await req.json();
   const Email = data['email'];

   let Teansporter = nodemailer.createTransport({
      host: "mail.sarait.com.bd",
      port: 25,
      secure: false,
      auth: {
         user: 'next@sarait.com.bd',
         pass: "F_$m{By^Y~Nf",
      },
      tls: {
         rejectUnauthorized: false,
      }
   })

   let otp=Math.floor(Math.random() * 100000) + 123000;

   let myEmail={
      from: 'Test Email From NEXT JS<next@sarait.com.bd>',
      to: Email,
      subject: 'Hello from Sarait',
      text: `Your One Time Password is ${otp}`,
   }

   try {
      const result = await Teansporter.sendMail(myEmail)

      return NextResponse.json(
         {status:true,message:"Email Send Success",result:result, otp:otp},
            {status: 200}
         )
   } catch (error) {
    return NextResponse.json( {status:false,message:"Something Went Wrong Try again later"},)
   }
  }
  