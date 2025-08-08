'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, Button, Typography, message, Avatar, Space, Popconfirm, Skeleton } from 'antd'
import { UserOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import { api } from '@/utils/api'
import { useAuth } from '@/contexts/authContext'

const { Title, Text } = Typography

interface Post {
  id: number
  title: string
  content: string
  authorId: number
  authorName: string
  authorEmail: string
  createdAt: string
  updatedAt: string
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await api(`/post/${params.id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          message.error('Post não encontrado')
          router.push('/posts')
          return
        }
        throw new Error('Erro ao carregar post')
      }

      const postData = await response.json()
      setPost(postData)
    } catch (error) {
      console.error('Erro ao buscar post:', error)
      message.error('Erro ao carregar post')
      router.push('/posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      const response = await api(`/post/${params.id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao deletar post')
      }

      message.success('Post deletado com sucesso!')
      router.push('/posts')
    } catch (error: any) {
      console.error('Erro ao deletar post:', error)
      message.error(error.message || 'Erro ao deletar post')
    } finally {
      setDeleting(false)
    }
  }

  const handleEdit = () => {
    router.push(`/posts/${params.id}/edit`)
  }

  const handleAuthorClick = () => {
    if (post) {
      router.push(`/profile/${post.authorId}`)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isAuthor = user && post && parseInt(user.id) === post.authorId

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Skeleton.Button active size="default" className="mb-4" />
        </div>
        <Card className="shadow-lg">
          <Skeleton active paragraph={{ rows: 8 }} />
        </Card>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <Title level={3} className="text-gray-500">Post não encontrado</Title>
        <Button 
          type="primary" 
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push('/posts')}
          className="mt-4"
        >
          Voltar aos Posts
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back button */}
      <div className="mb-6 flex justify-between items-center">
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push('/posts')}
          className="flex items-center"
        >
          Voltar aos Posts
        </Button>

        {isAuthor && (
            <Space>
              <Button 
                type="default" 
                icon={<EditOutlined />}
                onClick={handleEdit}
                className="border-blue-500 text-blue-500 hover:bg-blue-50"
              >
                Editar
              </Button>
              <Popconfirm
                title="Deletar post"
                description="Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita."
                onConfirm={handleDelete}
                okText="Sim, deletar"
                cancelText="Cancelar"
                okButtonProps={{ danger: true, loading: deleting }}
              >
                <Button 
                  type="default" 
                  danger 
                  icon={<DeleteOutlined />}
                  loading={deleting}
                >
                  Deletar
                </Button>
              </Popconfirm>
            </Space>
          )}
      </div>

      {/* Main post card */}
      <Card 
        className="shadow-lg"
        title={
          <div className="border-b border-gray-200 pb-4 pt-5 mb-6">
            <Title level={1} className="mb-4 text-gray-800">
              {post.title}
            </Title>
            
            {/* Author information */}
            <div className="flex justify-between items-center">
              <Space className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" onClick={handleAuthorClick}>
                <Avatar icon={<UserOutlined />} size="default" className="hover:bg-blue-600 transition-colors" />
                <div>
                  <Text strong className="text-gray-700 hover:text-blue-600 transition-colors">{post.authorName}</Text>
                  <br />
                  <Text type="secondary" className="text-sm">{post.authorEmail}</Text>
                </div>
              </Space>
              
              <div className="text-right">
                <Text type="secondary" className="text-sm block">
                  Criado em: {formatDate(post.createdAt)}
                </Text>
                {post.updatedAt !== post.createdAt && (
                  <Text type="secondary" className="text-sm block">
                    Atualizado em: {formatDate(post.updatedAt)}
                  </Text>
                )}
              </div>
            </div>
          </div>
        }
      >
        {/* Post content rendered as Markdown */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <ReactMarkdown 
            components={{
              h1: ({ children }: any) => <h1 className="text-3xl font-bold mb-4 text-gray-800">{children}</h1>,
              h2: ({ children }: any) => <h2 className="text-2xl font-semibold mb-3 text-gray-800">{children}</h2>,
              h3: ({ children }: any) => <h3 className="text-xl font-medium mb-2 text-gray-800">{children}</h3>,
              p: ({ children }: any) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
              ul: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
              ol: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
              li: ({ children }: any) => <li className="text-gray-700">{children}</li>,
              blockquote: ({ children }: any) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4">
                  {children}
                </blockquote>
              ),
              code: ({ children }: any) => (
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                  {children}
                </code>
              ),
              pre: ({ children }: any) => (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  {children}
                </pre>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </Card>
    </div>
  )
}
