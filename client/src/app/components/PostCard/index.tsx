import { Card, Avatar, Typography, Button } from 'antd';
import { UserOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import MarkdownPreview from '../MarkdownPreview';

const { Title, Text, Paragraph } = Typography;

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

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/posts/${post.id}`);
  };

  const handleAuthorClick = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Previne o clique no card
    router.push(`/profile/${post.authorId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card
      className="mb-4 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500 p-5"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Title level={3} className="!mb-2 !text-gray-800">
            {post.title}
          </Title>
          
          <div className="flex items-center mb-3">
            <Avatar 
              icon={<UserOutlined />} 
              className="bg-blue-500 mr-2 cursor-pointer hover:bg-blue-600 transition-colors"
              size="small"
              onClick={handleAuthorClick}
            />
            <Text 
              strong 
              className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleAuthorClick}
            >
              {post.authorName}
            </Text>
            <Text type="secondary" className="ml-2">
              • {post.authorEmail}
            </Text>
          </div>

          <Paragraph className="!mb-3">
            <MarkdownPreview content={post.content} maxLength={120} />
          </Paragraph>

          <div className="flex justify-between items-center">
            <Button 
              type="primary" 
              icon={<EyeOutlined />}
              size="small"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleCardClick}
            >
              Ler mais
            </Button>
            
            {post.createdAt && (
              <Text type="secondary" className="text-sm">
                {formatDate(post.createdAt)}
              </Text>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
