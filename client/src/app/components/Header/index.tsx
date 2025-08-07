"use client";

import { Layout, Typography, Button, Space, Menu, Dropdown } from "antd";
import { HomeOutlined, EditOutlined, UserOutlined, DownOutlined, LogoutOutlined, ProfileOutlined } from "@ant-design/icons";

import type { MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/authContext";

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Logged user menu
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Perfil',
      onClick: () => router.push(`/profile/${user?.id}`),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  const menuItems: MenuProps["items"] = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Início",
      onClick: () => router.push("/"),
    },
    {
      key: "posts",
      icon: <EditOutlined />,
      label: "Posts",
      onClick: () => router.push("/posts"),
    },
  ];

  return (
    <AntHeader className="bg-slate-800 px-16 flex items-center justify-between fixed top-0 left-0 right-0 z-50 w-full shadow-lg">
      <div className="flex items-center">
        <Title
          level={3}
          className="!text-white !m-0 !mr-4"
        >
          SillyBlog
        </Title>
        <Text className="!text-gray-400">Um mural de ideias bobas</Text>
      </div>

      <div className="flex space-x-2">
        <Button
          type="primary"
          icon={<HomeOutlined />}
          onClick={() => router.push("/")}
          className="hover:bg-blue-600 transition-colors"
        >
          Início
        </Button>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => router.push("/posts")}
          className="hover:bg-blue-600 transition-colors"
        >
          Posts
        </Button>
        
        {user ? (
          <Dropdown 
            menu={{ items: userMenuItems }} 
            placement="bottomRight"
            trigger={['click']}
          >
            <Button 
              type="primary" 
              icon={<UserOutlined />}
              className="hover:bg-blue-600 transition-colors"
            >
              {user.name} <DownOutlined />
            </Button>
          </Dropdown>
        ) : (
          <Button 
            type="primary" 
            icon={<UserOutlined />} 
            onClick={() => router.push("/login")}
            className="hover:bg-blue-600 transition-colors"
          >
            Login
          </Button>
        )}
      </div>
    </AntHeader>
  );
}
