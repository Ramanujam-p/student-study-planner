import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import { logoutUser, getUser, updateUser } from "../utils/auth";
import API from "../services/api";

const Profile = () => {

  const navigate = useNavigate();
  const user = getUser();

  const [name,setName] = useState(user?.name || "");
  const [password,setPassword] = useState("");
  const [preview,setPreview] = useState(null);
  const [success,setSuccess] = useState(false);

  const handlePhotoChange = (e)=>{

    const file = e.target.files[0];

    if(file){
      setPreview(URL.createObjectURL(file));
    }

  };

const handleUpdate = async () => {

try{

  const updatedData = {
    name
  };

  if(password){
    updatedData.password = password;
  }

  const res = await API.put(
    "/auth/update-profile",
    updatedData,
    {
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  updateUser(res.data.user);

  setSuccess(true);

  setPassword("");

  setTimeout(()=>{
    setSuccess(false);
    navigate("/dashboard");
  },1500);

}catch(err){
  console.error("Profile update failed");
}

};
  const handleLogout = ()=>{
    logoutUser();
    navigate("/login");
  };

  return (

    <div className="profile-page">

      <MainNavbar/>

      <div className="profile-wrapper">

        <h2>My Profile</h2>

        <div className="profile-content">

          <div className="profile-avatar-section">

            {preview ? (
              <img src={preview} alt="profile"/>
            ) : (
              <div className="avatar-circle">
                {name.charAt(0).toUpperCase()}
              </div>
            )}

            <label className="upload-photo">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </label>

          </div>

          <div className="profile-form">

            <div className="form-group">

              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>New Password</label>

              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

            </div>

            <div className="profile-buttons">

              <button
                className="update-btn"
                onClick={handleUpdate}
              >
                Update Profile
              </button>

              {success && (
                <p className="success-message">
                  Profile updated successfully
                </p>
              )}

              <button
                className="dashboard-btn"
                onClick={()=>navigate("/dashboard")}
              >
                Back to Dashboard
              </button>

              <button
                className="logout-btn-profile"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;