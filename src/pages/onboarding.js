// import { currentUser } from "@clerk/nextjs"
// import { ClerkProvider, useUser, SignIn, SignedOut } from '@clerk/nextjs'
// import Obform from "../components/forms/onboardingform"

// function Onboarding(){
//     const { user } = useUser()
//     console.log(user)

//     const userInfo = {}
//     const userData = {
//         id: user?.id, 
//         objectId: userInfo?._id,
//         username: userInfo?.username || user?.username, 
//         name: userInfo?.name || user?.firstName || '', 
//         bio: userInfo?.bio || '',
//         avatar: userInfo?.avatar || '',
//         image: userInfo?.image || user?.imageUrl,

//     }


    

//     return user ? <Obform user={userData}/> : <div>Loading...</div>;

// }

// export default Onboarding

import React, { useState } from 'react';
import { ClerkProvider, useUser, SignIn, SignedOut } from '@clerk/nextjs'
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";

function UserForm() {
  const { user } = useUser()
  console.log(user)
   resolver: zodResolver(UserValidation)
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        bio: "",
        
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('/api/createuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          console.log("User created successfully:", data.user);
      
        } catch (error) {
          console.error("Error creating user:", error.message);
        }
      };
      


    return (
        <form onSubmit={handleSubmit}>
           
            <br />

            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </label>
            <br />

            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <br />

            <br />

            <label>
                Bio:
                <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
            </label>
            <br />
            <br />

            <input type="submit" value="Submit" />
        </form>
    );
}

export default UserForm;