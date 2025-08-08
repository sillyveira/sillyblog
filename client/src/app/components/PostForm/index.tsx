'use client'

import { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Typography, message, Space, Tabs } from 'antd'
import { EyeOutlined, EditOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'

const { Title } = Typography
const { TextArea } = Input

interface PostFormData {
  title: string
  content: string
}

interface PostFormProps {
  initialData?: PostFormData
  postId?: string
  mode: 'create' | 'edit'
  onSubmit?: (data: PostFormData) => Promise<void>
}

export default function PostForm({ initialData, postId, mode, onSubmit }: PostFormProps) {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [previewContent, setPreviewContent] = useState(initialData?.content || '')
  const [contentValue, setContentValue] = useState(initialData?.content || '')
  const [activeTab, setActiveTab] = useState('editor')

  // Synchronize initial data when it changes
  useEffect(() => {
    if (initialData) {
      setContentValue(initialData.content || '')
      setPreviewContent(initialData.content || '')
    }
  }, [initialData])

  const handleSubmit = async (values: PostFormData) => {
    try {
      setLoading(true)
      
      // Manual validation for content since we disabled automatic validation
      if (!contentValue || contentValue.trim().length < 10) {
        message.error('O conteúdo deve ter pelo menos 10 caracteres')
        return
      }
      
      // Ensure content is updated
      const submissionData = {
        ...values,
        content: contentValue
      }
      
      if (onSubmit) {
        await onSubmit(submissionData)
      } else {
        // Default behavior for create mode
        const response = await api('/post', {
          method: 'POST',
          body: JSON.stringify(submissionData)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Erro ao criar post')
        }

        message.success('Post criado com sucesso!')
        router.push('/posts')
      }
    } catch (error: any) {
      console.error('Erro ao salvar post:', error)
      message.error(error.message || 'Erro ao salvar post')
    } finally {
      setLoading(false)
    }
  }

  const tabItems = [
    {
      key: 'editor',
      label: (
        <Space>
          <EditOutlined />
          Editor
        </Space>
      ),
      children: (
        <TextArea
          placeholder="Digite o conteúdo do post em Markdown..."
          rows={10}
          value={contentValue}
          onChange={(e) => {
            const newValue = e.target.value
            setContentValue(newValue)
            setPreviewContent(newValue)
          }}
          className="font-mono text-sm"
        />
      )
    },
    {
      key: 'preview',
      label: (
        <Space>
          <EyeOutlined />
          Preview
        </Space>
      ),
      children: (
        <div className="h-64 p-4 bg-gray-50 rounded border overflow-y-auto">
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
              {previewContent || '*Preview aparecerá aqui quando você começar a digitar...*'}
            </ReactMarkdown>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="h-full max-w-4xl mx-auto p-4 flex flex-col">
      {/* Back button */}
      <div className="mb-4 flex-shrink-0">
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          className="flex items-center"
        >
          Voltar
        </Button>
      </div>

      {/* Main card */}
      <Card 
        className="shadow-lg flex-1 flex flex-col overflow-hidden"
        title={
          <Title level={2} className="mb-0">
            {mode === 'create' ? 'Criar Novo Post' : 'Editar Post'}
          </Title>
        }
      >
        <div className="flex-1 overflow-y-auto">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={initialData}
            className="h-full"
          >
          {/* Title field */}
          <Form.Item
            label={<span className="text-lg font-medium">Título do Post</span>}
            name="title"
            rules={[
              { required: true, message: 'Por favor, insira o título do post' },
              { min: 3, message: 'O título deve ter pelo menos 3 caracteres' },
              { max: 200, message: 'O título deve ter no máximo 200 caracteres' }
            ]}
          >
            <Input 
              placeholder="Digite o título do seu post..." 
              size="large"
              className="text-lg"
            />
          </Form.Item>

          {/* Content field with tabs */}
          <Form.Item
            label={<span className="text-lg font-medium">Conteúdo (Markdown)</span>}
            name="content"
            rules={[
              { required: true, message: 'Por favor, insira o conteúdo do post' },
              { min: 10, message: 'O conteúdo deve ter pelo menos 10 caracteres' }
            ]}
            validateTrigger={[]} // Disable automatic validation
          >
            <div>
              <Tabs 
                activeKey={activeTab} 
                onChange={setActiveTab}
                items={tabItems}
                className="border rounded-lg"
              />
            </div>
          </Form.Item>

          {/* Markdown tips */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <Title level={5} className="text-blue-800 mb-2">💡 Dicas de Markdown:</Title>
            <div className="text-sm text-blue-700 space-y-1">
              <div><code># Título</code> para cabeçalhos</div>
              <div><code>**texto**</code> para negrito</div>
              <div><code>*texto*</code> para itálico</div>
              <div><code>`código`</code> para código inline</div>
              <div><code>&gt; citação</code> para blockquote</div>
              <div><code>- item</code> para listas</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t mt-auto">
            <Button 
              onClick={() => router.back()}
              size="large"
            >
              Cancelar
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
              size="large"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {mode === 'create' ? 'Criar Post' : 'Salvar Alterações'}
            </Button>
          </div>
        </Form>
        </div>
      </Card>
    </div>
  )
}
