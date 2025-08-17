// const userMenuItems = [
//   {
//     key: "profile",
//     label: "Profile",
//     icon: <UserOutlined />,
//   },
//   {
//     key: "settings",
//     label: "Settings",
//     icon: <SettingOutlined />,
//   },
//   {
//     type: "divider" as const,
//   },
//   {
//     key: "logout",
//     label: "Logout",
//     icon: <LogoutOutlined />,
//     danger: true,
//   },
// ]

export default function TestLayout({ children }: { children: React.ReactNode }) {


  return (
    <>
      {children}
    </>
  )
}
