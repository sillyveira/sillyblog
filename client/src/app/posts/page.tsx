"use client";

import { useState, useEffect } from 'react';
import { List, Typography, Spin, Alert, Button, Pagination } from 'antd';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import PostCard from '../components/PostCard';
import PostSkeleton from '../components/PostSkeleton';

const { Title, Text } = Typography;

interface Post {
  id?: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  authorEmail: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PostsResponse {
  posts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);
    const router = useRouter();
  const fetchPosts = async (page: number, limit: number) => {
    try {
      // Se for primeira carga, usa loading normal, se for paginação, usa paginationLoading
      if (page === 1 && posts.length === 0) {
        setLoading(true);
      } else {
        setPaginationLoading(true);
      }
      setError(null);
      
      const response = await api(`/post/?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      // Failure case
      if (!response.ok && response.status !== 304) {
        throw new Error(`Erro ao buscar posts: ${response.status}`);
      }

      // No new data to update
      if (response.status === 304) {
        return;
      }

      const data: PostsResponse = await response.json();
      setPosts(data.posts || []);
      setTotal(data.pagination?.totalPosts || 0);
      setTotalPages(data.pagination?.totalPages || 0);
      
    } catch (err: any) {
      console.error('Error during fetchPosts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setPaginationLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex justify-center items-center px-4">
        <Alert
          message="Erro ao carregar posts"
          description={error}
          type="error"
          showIcon
          action={
            <Button onClick={() => fetchPosts(currentPage, pageSize)}>
              Tentar novamente
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="max-w-4xl mx-auto px-4 py-8 h-full flex flex-col">
        {/* Header fixo */}
        <div className="text-center mb-6 flex-shrink-0">
          <Title level={1} className="!text-gray-800 !mb-2">
            📝 Posts do SillyBlog
          </Title>
          <Text type="secondary" className="text-lg">
            Um mural de ideias bobas e criativas
          </Text>
        </div>

        {/* Container com altura fixa para os posts */}
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mb-4 min-h-0">
          {paginationLoading ? (
            // Mostra skeletons durante carregamento da paginação
            <div className="min-w-3xl">
              {Array.from({ length: pageSize }).map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          ) : (
            // Mostra posts reais
            <List
              className="min-w-full"
              dataSource={posts}
              renderItem={(post) => (
                <PostCard key={post.id} post={post} />
              )}
            />
          )}
        </div>

        {/* Paginação sempre visível na parte inferior */}
        {total > pageSize && (
          <div className="flex-shrink-0 flex justify-center py-4 bg-white border-t border-gray-200 rounded-lg shadow-sm">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => 
                `${range[0]}-${range[1]} de ${total} posts`
              }
            />
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="flex-1 flex items-center justify-center">
            <Text type="secondary" className="text-lg">
              Nenhum post encontrado
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
