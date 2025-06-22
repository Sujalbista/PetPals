import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

type MyJwtPayload = {
  id: string;
  exp: number;
  iat?: number;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string>("");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/signin");

      try {
        const decoded = jwtDecode<MyJwtPayload>(token);
        const id = decoded.id;

        const res = await fetch(`http://localhost:8080/api/user/userProfile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfileData((prev) => ({ ...prev, ...data }));
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setImageFile(file);
    // 🔸 Only for immediate preview
    setPreview(URL.createObjectURL(file));
  }
};

  const handleSave = async () => {
    
    const token = localStorage.getItem("token");
    if (!token) return navigate("/signin");



    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      if (key === "profileImage") return; // skip – backend sets this itself
      if (value) formData.append(key, value);
    });
    if (imageFile) {
      formData.append("profileImageFile", imageFile);
      console.log("profileimg uploaded");
    }
    try {
      const res = await fetch("http://localhost:8080/api/user/updateProfile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!res.ok) throw new Error("Failed to update profile");
     
      const updated = await res.json();        // 👈  get new user doc

      // --- NEW: persist avatar for NavBar ---
      const userId = localStorage.getItem("userId");
      if (updated.profileImage && userId) {
        localStorage.setItem(
          `userAvatar_${userId}`,
          `http://localhost:8080${updated.profileImage}`
        );
        window.dispatchEvent(new Event("storage"));
      }
      setProfileData(prev => ({ ...prev, ...updated }));
      setPreview("");    
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-pet-purple dark:text-pet-purple-light text-center">
          User Profile
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Manage your profile information and preferences.
        </p>

        <div className="flex flex-col items-center space-y-4">
        <img
          src={
            preview
              ? preview                                  // freshly‐selected file
              : profileData.profileImage                 // server path
                ? `http://localhost:8080${profileData.profileImage}`
                : "/default-avatar.png"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4
                    border-pet-purple dark:border-pet-purple-light"
        />


          <div className="w-full max-w-xs">
            <Label htmlFor="profileImage" className="mb-2">
              Profile Picture
            </Label>
            <Input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        <div className="space-y-6">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Address", name: "address", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="w-full max-w-xl">
              <Label htmlFor={name} className="mb-2">
                {label}
              </Label>
              <Input
                id={name}
                name={name}
                type={type}
                value={profileData[name as keyof typeof profileData]}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-pet-purple hover:bg-pet-purple-dark dark:bg-pet-purple-light dark:text-gray-600 dark:hover:bg-pet-purple"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
