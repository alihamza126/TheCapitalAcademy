"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { type CalendarDate, parseDate } from "@internationalized/date"
import { Camera, Phone, MapPin, Percent, Users, Mail, Calendar, User, Settings, Save } from 'lucide-react'
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Avatar,
  Select,
  SelectItem,
  DatePicker,
  Spinner,
  Divider,
  Chip,
  Progress,
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/react"
import { uploadFile } from "@/actions/Cloudniary"
import Axios from "@/lib/Axios"
import toast from "react-hot-toast"
import { Female, Male } from "@mui/icons-material"

interface UserProfile {
  _id: string
  username: string
  email: string
  image?: string
  firstName?: string
  lastName?: string
  phone?: string
  gender: "male" | "female"
  dob?: string
  city?: string
  aggPercentage?: number
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "male" as "male" | "female",
    dob: null as CalendarDate | null,
    city: "",
    aggPercentage: "",
    username: "",
  })

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const fields = [
      formData.username,
      formData.firstName,
      formData.lastName,
      formData.phone,
      formData.gender,
      formData.dob,
      formData.city,
      formData.aggPercentage,
      formData.image,
    ]
    const filledFields = fields.filter(field => field && field !== "").length
    return Math.round((filledFields / fields.length) * 100)
  }

  // Fetch user data
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await Axios.get(`/api/v1/users/me`)
      console.log(response)
      const userData = response.data.user
      setUser(userData)
      setFormData({
        image: userData.image || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        gender: userData.gender || "male",
        dob: userData.dob ? parseDate(userData.dob.split("T")[0]) : null,
        city: userData.city || "",
        aggPercentage: userData.aggPercentage?.toString() || "",
        username: userData.username || "",
      })
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to fetch user data"
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB")
      return
    }

    setUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)
      const result = await uploadFile(uploadFormData)
      setFormData({ ...formData, image: result.url })
      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    try {
      const updateData = {
        image: formData.image || null,
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        phone: formData.phone || null,
        gender: formData.gender,
        dob: formData.dob ? formData.dob.toString() : null,
        city: formData.city || null,
        aggPercentage: formData.aggPercentage ? Number.parseFloat(formData.aggPercentage) : null,
        username: formData.username,
      }

      const response = await Axios.put(`/api/v1/users/me`, updateData)
      console.log(response)
      toast.success("Profile updated successfully!")
      setUser(response.data.user)
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to update profile"
      toast.error(errorMessage)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex flex-col items-center space-y-6">
          <Spinner size="lg" color="primary" />
          <div className="text-center">
            <h3 className="text-xl font-semibold text-default-700">Loading Profile</h3>
            <p className="text-default-500">Please wait while we fetch your information...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md shadow-2xl">
          <CardBody className="text-center p-8">
            <div className="text-danger text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-danger mb-2">User Not Found</h3>
            <p className="text-default-500">We couldn't find your profile information.</p>
          </CardBody>
        </Card>
      </div>
    )
  }

  const profileCompletion = calculateProfileCompletion()

  return (
    <div className="min-h-[90vh] w-full px-0">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg border-b border-default-200 sticky top-0 z-10">
        <div className="w-full px-3 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Breadcrumbs>
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Profile</BreadcrumbItem>
              </Breadcrumbs>
              <h1 className="text-2xl font-bold text-default-700 mt-2">Profile Settings</h1>
            </div>
            <Chip
              color={profileCompletion === 100 ? "success" : profileCompletion > 50 ? "warning" : "danger"}
              variant="flat"
              size="lg"
            >
              {profileCompletion}% Complete
            </Chip>
          </div>
        </div>
      </div>

      <div className="w-full px-0 md:px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Overview */}
          <div className="xl:col-span-1">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardBody className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <Avatar
                      src={formData.image || "/placeholder.svg?height=120&width=120&query=user+avatar"}
                      className="w-24 h-24 ring-4 ring-primary/20"
                      isBordered
                      color="primary"
                    />
                    <Button
                      isIconOnly
                      size="sm"
                      color="primary"
                      variant="solid"
                      className="absolute -bottom-1 -right-1 min-w-8 h-8 shadow-lg"
                      onPress={() => fileInputRef.current?.click()}
                      isDisabled={uploading}
                    >
                      {uploading ? <Spinner size="sm" color="white" /> : <Camera size={16} />}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-default-900">
                      {formData.firstName && formData.lastName
                        ? `${formData.firstName} ${formData.lastName}`
                        : formData.username || "User"}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 text-default-600">
                      <Mail size={16} />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <Chip color="primary" variant="flat" size="sm">
                      ID: {user._id.slice(-6)}
                    </Chip>
                  </div>

                  <div className="w-full space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-default-600">Profile Completion</span>
                      <span className="text-sm font-semibold text-default-900">{profileCompletion}%</span>
                    </div>
                    <Progress
                      value={profileCompletion}
                      color={profileCompletion === 100 ? "success" : profileCompletion > 50 ? "warning" : "danger"}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mt-6">
              <CardHeader className="pb-2">
                <h4 className="text-lg font-semibold text-default-900">Quick Info</h4>
              </CardHeader>
              <CardBody className="pt-0 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-default-500">Phone</p>
                    <p className="text-sm font-medium">{formData.phone || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <MapPin size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-default-500">Location</p>
                    <p className="text-sm font-medium">{formData.city || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Percent size={16} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-xs text-default-500">Aggregate</p>
                    <p className="text-sm font-medium">{formData.aggPercentage ? `${formData.aggPercentage}%` : "Not provided"}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Main Content - Form */}
          <div className="xl:col-span-3">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-0">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Settings size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-default-900">Personal Information</h2>
                    <p className="text-sm text-default-600">Update your personal details and preferences</p>
                  </div>
                </div>
              </CardHeader>
              <Divider className="my-4" />
              <CardBody className="px-6 pb-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Hidden file input */}
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

                  {/* Basic Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <User size={18} className="text-primary" />
                      <h3 className="text-lg font-semibold text-default-900">Basic Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Username */}
                      <div className="md:col-span-2 lg:col-span-3">
                        <Input
                          label="Username"
                          labelPlacement="outside-top"
                          placeholder="Enter your username"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          startContent={<Users className="w-4 h-4 text-default-400" />}
                          isRequired
                          variant="flat"
                          color="default"
                          size="lg"

                        />
                      </div>

                      {/* First Name */}
                      <Input
                        label="First Name"
                        labelPlacement="outside-top"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        variant="flat"
                        color="default"
                        size="lg"
                      />

                      {/* Last Name */}
                      <Input
                        label="Last Name"
                        labelPlacement="outside-top"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        variant="flat"
                        color="default"
                        size="lg"

                      />

                      {/* Gender */}
                      <Select

                        labelPlacement="outside"
                        placeholder="Select your gender"
                        selectedKeys={[formData.gender]}
                        onSelectionChange={(keys) => {
                          const selectedKey = Array.from(keys)[0] as string
                          setFormData({ ...formData, gender: selectedKey as "male" | "female" })
                        }}
                        startContent={<Users className="w-4 h-4 text-default-400" />}
                        variant="flat"
                        color="default"
                        size="lg"

                      >
                        <SelectItem startContent={<Male />} key="male" >Male</SelectItem>
                        <SelectItem startContent={<Female />} key="female" >Female</SelectItem>
                      </Select>
                    </div>
                  </div>

                  <Divider />

                  {/* Contact Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Phone size={18} className="text-primary" />
                      <h3 className="text-lg font-semibold text-default-900">Contact Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <Input
                        label="Phone Number"
                        labelPlacement="outside-top"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        startContent={<Phone className="w-4 h-4 text-default-400" />}
                       variant="flat"
                        color="default"
                        size="lg"
                        classNames={{
                          input: "text-base",
                          inputWrapper: "h-12"
                        }}
                      />

                      {/* City */}
                      <Input
                        label="City"
                        labelPlacement="outside-top"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        startContent={<MapPin className="w-4 h-4 text-default-400" />}
                        variant="flat"
                        color="default"
                        size="lg"
                        classNames={{
                          input: "text-base",
                          inputWrapper: "h-12"
                        }}
                      />
                    </div>
                  </div>

                  <Divider />

                  {/* Additional Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar size={18} className="text-primary" />
                      <h3 className="text-lg font-semibold text-default-900">Additional Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                      {/* Date of Birth */}
                      <DatePicker
                        label="Date of Birth"
                        value={formData.dob}
                        onChange={(date) => setFormData({ ...formData, dob: date })}
                       variant="flat"
                        color="default"
                        size="lg"
                        showMonthAndYearPickers
                        classNames={{
                          base: "w-full",
                          selectorButton: "h-12"
                        }}
                      />

                      {/* Aggregate Percentage */}
                      <Input
                        labelPlacement="inside"
                        label="Aggregate Percentage"
                        placeholder="Enter percentage (0-100)"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={formData.aggPercentage}
                        onChange={(e) => setFormData({ ...formData, aggPercentage: e.target.value })}
                        startContent={<Percent className="w-4 h-4 text-default-400" />}
                        endContent={<span className="text-default-400 font-medium">%</span>}
                        variant="flat"
                        color="default"
                        classNames={{
                          input: "text-base",
                          inputWrapper: "flex gap-4",
                          label:"mb-6"
                        }}
                        size="lg"
                      />
                    </div>
                  </div>

                  <Divider />

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6">
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      className="px-12 font-semibold"
                      isDisabled={updating || uploading}
                      isLoading={updating || uploading}
                      startContent={!updating && !uploading ? <Save size={18} /> : undefined}
                    >
                      {updating ? "Updating Profile..." : uploading ? "Uploading Image..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
