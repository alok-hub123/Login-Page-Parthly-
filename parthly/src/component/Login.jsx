import { CiLock, CiMail } from "react-icons/ci";

const Login = ({setEmail, setPassword}) => {
  return (
    <>
      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border  rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#243119]"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <CiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#243119]" />
      </div>
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border  rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#243119]"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <CiLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#243119]" />
      </div>    
    </>
  );
};

export default Login;
