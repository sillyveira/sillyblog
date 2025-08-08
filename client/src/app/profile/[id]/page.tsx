'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, Avatar, Typography, Spin, Alert, Button, Divider, Space, Tag } from 'antd'
import { UserOutlined, MailOutlined, CalendarOutlined, ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { api } from '@/utils/api'
import { useAuth } from '@/contexts/authContext'

const { Title, Text, Paragraph } = Typography

interface UserProfile {
  id: number
  name: string
  email: string
  createdAt: string
}

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user: currentUser } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [params.id])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await api(`/auth/profile/${params.id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Usuário não encontrado')
          return
        }
        throw new Error('Erro ao carregar perfil')
      }

      const profileData = await response.json()
      setProfile(profileData)
    } catch (error: any) {
      console.error('Erro ao buscar perfil:', error)
      setError(error.message || 'Erro ao carregar perfil')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isOwnProfile = currentUser && profile && parseInt(currentUser.id) === profile.id

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center bg-gray-50">
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex justify-center items-center bg-gray-50 px-4">
        <Alert
          message="Erro ao carregar perfil"
          description={error}
          type="error"
          showIcon
          action={
            <Space className='ml-4' direction="vertical">
              <Button onClick={fetchProfile} className='w-full'>
                Tentar novamente
              </Button>
              <Button 
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push('/posts')}
              >
                Voltar aos Posts
              </Button>
            </Space>
          }
        />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="h-full flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <Title level={3} className="text-gray-500">Perfil não encontrado</Title>
          <Button 
            type="primary" 
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push('/posts')}
            className="mt-4"
          >
            Voltar aos Posts
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Back button */}
        <div className="mb-6">
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
            className="flex items-center"
          >
            Voltar
          </Button>
        </div>

        {/* Main profile card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="text-center mb-8">
            
            {/* Avatar and basic information */}
            <div className="mb-6">
              <Avatar 
                size={120} 
                icon={<UserOutlined />}
                className="bg-gradient-to-r from-blue-500 to-purple-600 mb-4"
              />
              
              <div className="flex justify-center items-center gap-3 mb-2">
                <Title level={1} className="!mb-0 !text-gray-800">
                  {profile.name}
                </Title>
                {isOwnProfile && (
                  <Tag color="blue" className="text-sm">
                    Seu perfil
                  </Tag>
                )}
              </div>
              
              <div className="flex justify-center items-center text-gray-600 mb-4">
                <MailOutlined className="mr-2" />
                <Text className="text-lg">{profile.email}</Text>
              </div>
            </div>

            <Divider />

            {/* Detailed information */}
            <div className="max-w-2xl mx-auto">
              <Title level={3} className="!text-gray-800 !mb-6">
                Informações do Perfil
              </Title>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                
                {/* Creation date */}
                <Card 
                  className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  bodyStyle={{ padding: '20px' }}
                >
                  <div className="flex items-center mb-3">
                    <CalendarOutlined className="text-blue-500 text-xl mr-3" />
                    <Title level={5} className="!mb-0 !text-gray-700">
                      Membro desde
                    </Title>
                  </div>
                  <Text className="text-gray-600 text-base">
                    {formatDate(profile.createdAt)}
                  </Text>
                </Card>

                {/* User ID */}
                <Card 
                  className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  bodyStyle={{ padding: '20px' }}
                >
                  <div className="flex items-center mb-3">
                    <UserOutlined className="text-purple-500 text-xl mr-3" />
                    <Title level={5} className="!mb-0 !text-gray-700">
                      ID do Usuário
                    </Title>
                  </div>
                  <Text className="text-gray-600 text-base font-mono">
                    #{profile.id}
                  </Text>
                </Card>

              </div>

              {/* Actions */}
              {isOwnProfile && (
                <div className="mt-8">
                  <Divider />
                  <Title level={4} className="!text-gray-800 !mb-4">
                    Ações do Perfil
                  </Title>
                  <Space size="middle" wrap>
                    <Button 
                      type="primary" 
                      icon={<EditOutlined />}
                      size="large"
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={() => router.push('/posts/create')}
                    >
                      Criar Novo Post
                    </Button>
                    <Button 
                      size="large"
                      onClick={() => router.push('/posts')}
                    >
                      Ver Todos os Posts
                    </Button>
                  </Space>
                </div>
              )}

              {/* Future statistics */}
              <div className="mt-8">
                <Divider />
                <div className="text-center">
                  <Text type="secondary" className="text-base">
                    {isOwnProfile 
                      ? 'Suas estatísticas e posts aparecerão aqui em breve!' 
                      : `Estatísticas e posts de ${profile.name} aparecerão aqui em breve!`
                    }
                  </Text>
                </div>
              </div>

            </div>
          </div>
        </Card>

        {/* Footer Spacer */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}
