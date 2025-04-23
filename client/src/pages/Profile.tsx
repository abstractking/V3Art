import { useParams } from "wouter";
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';

const Profile = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [headerBackground, setHeaderBackground] = useState("");

  useEffect(() => {
    if (id) {
      // Fetch user data by ID
      fetch(`/api/users/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          setUsername(data.username);
          setProfileImage(data.profileImage || "");
          setHeaderBackground(data.headerBackground || "");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

  const handleUpdateProfile = () => {
    // Logic to update profile details
    console.log("Profile updated:", { username, profileImage, headerBackground });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Profile Image URL</label>
        <input
          type="text"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Header Background URL</label>
        <input
          type="text"
          value={headerBackground}
          onChange={(e) => setHeaderBackground(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <Button onClick={handleUpdateProfile} className="bg-primary text-white px-4 py-2 rounded-md">
        Update Profile
      </Button>
    </div>
  );
};

export default Profile;