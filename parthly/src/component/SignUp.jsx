import React from 'react'

function SignUp({setFullName, setEmail, setPassword, setConfirmPassword}) {
  return (
    <>
      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-3 border  rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#243119]"
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border  rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#243119]"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border  rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#243119]"
        onChange={(e) => setPassword(e.target.value)}
        required
      /> 
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-3 border  rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#243119]"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      /> 

    </>
  )
}

export default SignUp
