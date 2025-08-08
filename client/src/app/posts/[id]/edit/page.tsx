'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { message, Spin } from 'antd'
import PostForm from '@/app/components/PostForm'
import { useAuth } from '@/contexts/authContext'
import { api } from '@/utils/api'

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

export default function PostEditPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário está logado
    if (!authLoading && !user) {
      message.error('Você precisa estar logado para editar um post')
      router.push('/login')
      return
    }

    if (user) {
      fetchPost()
    }
  }, [user, authLoading, params.id])

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
      
      // Verificar se o usuário é o autor do post
      if (user && parseInt(user.id) !== postData.authorId) {
        message.error('Você não tem permissão para editar este post')
        router.push('/posts')
        return
      }

      setPost(postData)
    } catch (error) {
      console.error('Erro ao buscar post:', error)
      message.error('Erro ao carregar post')
      router.push('/posts')
    } finally {
      setLoading(false)
    }
  }

  const handleEditSubmit = async (data: { title: string; content: string }) => {
    try {
      const response = await api(`/post/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao atualizar post')
      }

      message.success('Post atualizado com sucesso!')
      router.push(`/posts/${params.id}`)
    } catch (error: any) {
      throw error // Repassar o erro para o PostForm tratar
    }
  }

  // Mostrar loading enquanto verifica autenticação ou carrega post
  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  // Se não estiver logado ou não tiver post, não renderizar nada
  if (!user || !post) {
    return null
  }

  return (
    <PostForm 
      mode="edit"
      postId={params.id as string}
      initialData={{
        title: post.title,
        content: post.content
      }}
      onSubmit={handleEditSubmit}
    />
  )
}
