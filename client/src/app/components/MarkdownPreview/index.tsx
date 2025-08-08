interface MarkdownPreviewProps {
  content: string;
  maxLength?: number;
}

export default function MarkdownPreview({ content, maxLength = 120 }: MarkdownPreviewProps) {
  const extractPreview = (markdownContent: string, maxLen: number) => {
    // Remove markdown formatting for preview
    const cleanContent = markdownContent
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`(.*?)`/g, '$1') // Remove code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();

    if (cleanContent.length <= maxLen) {
      return cleanContent;
    }

    return cleanContent.substring(0, maxLen).trim() + '...';
  };

  return (
    <span className="text-gray-600 leading-relaxed text-base">
      {extractPreview(content, maxLength)}
    </span>
  );
}
