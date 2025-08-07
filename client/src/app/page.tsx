'use client'

import { useState, useEffect } from 'react'
import { Button, Typography, Card, Space, Avatar, Divider } from 'antd'
import { 
  PlusOutlined, 
  BookOutlined, 
  EditOutlined, 
  StarOutlined,
  RocketOutlined,
  HeartOutlined
} from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/authContext'

const { Title, Text, Paragraph } = Typography

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  const features = [
    {
      icon: <EditOutlined className="text-2xl text-blue-500" />,
      title: "Editor Markdown",
      description: "Escreva seus posts usando Markdown com preview em tempo real"
    },
    {
      icon: <BookOutlined className="text-2xl text-green-500" />,
      title: "Leitura Fácil",
      description: "Interface limpa e responsiva para uma experiência de leitura agradável"
    },
    {
      icon: <StarOutlined className="text-2xl text-yellow-500" />,
      title: "Comunidade",
      description: "Compartilhe suas ideias bobas e criativas com outros usuários"
    }
  ]

  const handleCreatePost = () => {
    if (user) {
      router.push('/posts/create')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out`}>
          <div className="mb-8">
            <Title 
              level={1} 
              className="!text-5xl !font-bold !mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              🎭 SillyBlog
            </Title>
            <Title 
              level={2} 
              className="!text-2xl !text-gray-600 !font-normal !mb-6"
            >
              Um mural de ideias bobas
            </Title>
            <Paragraph className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Expresse sua criatividade, compartilhe pensamentos aleatórios e conecte-se com uma 
              comunidade que celebra o absurdo e o criativo da vida cotidiana.
            </Paragraph>
          </div>

          <Space size="large" className="flex-wrap justify-center">
            <Button 
              type="primary" 
              size="large" 
              icon={<PlusOutlined />}
              onClick={handleCreatePost}
              className="bg-gradient-to-r from-blue-500 to-purple-600 border-none hover:from-blue-600 hover:to-purple-700 h-12 px-8 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {user ? 'Criar Post' : 'Começar Agora'}
            </Button>
            <Button 
              size="large" 
              icon={<BookOutlined />}
              onClick={() => router.push('/posts')}
              className="h-12 px-8 text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Explorar Posts
            </Button>
          </Space>
        </div>

        {/* Features Section */}
        <div className={`mb-16 transition-all duration-1000 ease-out delay-300`}>
          <Title level={2} className="!text-center !text-3xl !text-gray-800 !mb-12">
            <RocketOutlined className="mr-3 text-blue-500" />
            Por que usar o SillyBlog?
          </Title>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm animate-pulse-slow`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:rotate-12">
                      {feature.icon}
                    </div>
                  </div>
                  <Title level={4} className="!text-gray-800 !mb-3">
                    {feature.title}
                  </Title>
                  <Text className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Spacer */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}
