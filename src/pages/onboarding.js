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
import { updateUser } from "@/lib/actions/user.actions";

function UserForm() {
    const [formData, setFormData] = useState({
        id: "",
        username: "",
        name: "",
        image: "",
        bio: "",
        onboarded: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await updateUser({
    //             userId: formData.userId,
    //             username: formData.username,
    //             name: formData.name,
    //             bio: formData.bio,
    //             image: formData.image
    //             // path: '/profile/edit'
    //         });
    //         console.log("User updated successfully!");
          
    //     } catch (error) {
    //         console.error("Error updating user:", error.message);
           
    //     }
    // };

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
            <label>
                ID:
                <input type="text" name="id" value={formData.id} onChange={handleChange} required />
            </label>
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

            <label>
                Image URL:
                <input type="url" name="image" value={formData.image} onChange={handleChange} />
            </label>
            <br />

            <label>
                Bio:
                <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
            </label>
            <br />

            <label>
                Onboarded:
                <input type="checkbox" name="onboarded" checked={formData.onboarded} onChange={handleChange} />
            </label>
            <br />

            <input type="submit" value="Submit" />
        </form>
    );
}

export default UserForm;