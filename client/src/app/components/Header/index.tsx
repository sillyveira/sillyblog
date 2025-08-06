'use client'

import { Layout, Typography, Button, Space, Menu } from 'antd';
import { HomeOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

export default function Header() {
    const router = useRouter();
  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Início',
      onClick: () => router.push('/')
    },
    {
      key: 'posts',
      icon: <EditOutlined />,
      label: 'Posts',
      onClick: () => router.push('/posts')
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Perfil',
      onClick: () => router.push('/profile')
    },
  ];

  return (
    <AntHeader style={{ 
      background: '#001529',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0, marginRight: '16px' }}>
          SillyBlog
        </Title>
        <Text style={{ color: '#8c8c8c' }}>
          Um mural de ideias bobas
        </Text>
      </div>
      
        <Menu 
          theme="dark" 
          mode="horizontal" 
          items={menuItems}
          style={{ 
            background: 'transparent',
            border: 'none',
            minWidth: '200px'
          }}
        />
        
    </AntHeader>
  );
}
