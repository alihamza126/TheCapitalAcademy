'use client';

import React, { useState } from "react";
import {
  Avatar,
  TextField,
  IconButton,
  Alert,
} from "@mui/material";
import { Close, CloseOutlined } from "@mui/icons-material";
import { useSnackbar, closeSnackbar } from 'notistack';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const user = ""
  const [imageUrl, setImageUrl] = useState("");
  const [alertOpen, setAlertOpen] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const showCenteredSnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 2500,
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      action: (
        <IconButton onClick={() => closeSnackbar()} size="small">
          <Close fontSize="small" />
        </IconButton>
      )
    });
  };

  const [formData, setFormData] = useState({
    fullName: user?.fullname || "",
    fName: user?.fathername || "",
    email: user?.email || "",
    city: user?.city || "",
    contact: user?.contact || "",
    course: user?.course || "",
    domicalCity: user?.domicalCity || "",
    aggPercentage: user?.aggPercentage || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   setIsLoading(true);
    //   const userData = { id: user._id };

    //   Object.entries(formData).forEach(([key, value]) => {
    //     if (value !== user[key]) userData[key] = value;
    //   });

    //   if (image) {
    //     const imgData = new FormData();
    //     imgData.append("image", image);
    //     const res = await axiosInstance.post("/upload/img", imgData, {
    //       headers: { "Content-Type": "multipart/form-data" }
    //     });
    //     userData.profileUrl = res.data.fileURL;
    //   }

    //   const response = await axiosInstance.post("/user/update", userData);
    //   if (response.data.user) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //     dispatch(setUser(response.data));
    //     window.location.reload();
    //   } else if (response.data.code === 11000) {
    //     showCenteredSnackbar("Email Already Registered", "error");
    //   }

    //   setIsLoading(false);
    // } catch (error) {
    //   setIsLoading(false);
    // }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result);
    reader.readAsDataURL(file);
    setImage(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">Profile Settings</h2>

      {alertOpen && (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Alert
            className="mb-6"
            variant="filled"
            severity="info"
            action={
              <IconButton size="small" color="inherit" onClick={() => setAlertOpen(false)}>
                <CloseOutlined fontSize="inherit" />
              </IconButton>
            }
          >
            <p className="text-sm">Please complete the following details:</p>
            <ol className="text-sm list-disc pl-5">
              {user.domicalCity === '' && <li>Domicile City</li>}
              {(user.aggPercentage < 1 || user.aggPercentage === undefined) && <li>Aggregate Marks Percentage</li>}
            </ol>
          </Alert>
        </motion.div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="rounded-2xl shadow-lg p-6 text-center">
          <CardContent className="flex flex-col items-center">
            <Avatar
              sx={{ width: 130, height: 130 }}
              src={imageUrl?.replace('/upload/', '/upload/w_200,h_200,c_fill/')}
              alt="Profile Image"
            />
            <label htmlFor="file" className="mt-4">
              <input type="file" id="file" hidden accept="image/*" onChange={handleFileChange} />
              <span className="cursor-pointer inline-block bg-primary text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Change Image
              </span>
            </label>
            <p className="mt-4 text-sm text-muted-foreground">Username</p>
            <p className="font-semibold text-primary">@{user.username}</p>
          </CardContent>
        </Card>

        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
            <TextField fullWidth label="Father Name" name="fName" value={formData.fName} onChange={handleChange} />
            <TextField fullWidth label="Email" name="email" type="email" required value={formData.email} onChange={handleChange} className="md:col-span-2" />
            <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} />
            <TextField fullWidth label="Contact Number" name="contact" value={formData.contact} onChange={handleChange} />
            <TextField fullWidth label="Aggregate %" name="aggPercentage" type="number" value={formData.aggPercentage} onChange={handleChange} />
            <TextField fullWidth label="Domicile City" name="domicalCity" value={formData.domicalCity} onChange={handleChange} />

            <div className="md:col-span-2 mt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    Updating...
                    <span className="animate-pulse">•</span>
                  </div>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
