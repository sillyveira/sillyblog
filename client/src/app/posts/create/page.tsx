'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { message } from 'antd'
import PostForm from '@/app/components/PostForm'
import { useAuth } from '@/contexts/authContext'

export default function PostCreatePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    // Verificar se o usuário está logado
    if (!loading && !user) {
      message.error('Você precisa estar logado para criar um post')
      router.push('/login')
    }
  }, [user, loading, router])

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return <div className="flex justify-center items-center h-full">Carregando...</div>
  }

  // Se não estiver logado, não renderizar nada (será redirecionado)
  if (!user) {
    return null
  }

  return (
    <div className="h-full overflow-y-auto">
      <PostForm mode="create" />
    </div>
  )
}