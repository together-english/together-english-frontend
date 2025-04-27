'use client'

import {useState} from 'react'
import Button from '@/components/button/Button'

type CommentEditorProps = {
  circleId: string
  nickname: string
  onCommentPosted: (content: string) => Promise<boolean>
}

const CommentEditor: React.FC<CommentEditorProps> = ({
  circleId,
  nickname,
  onCommentPosted
}) => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('댓글 내용을 입력하세요.')
      return
    }

    setIsSubmitting(true)
    const success = await onCommentPosted(content)
    if (success) {
      setContent('')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-gray-700">{nickname}</span>
      </div>
      <textarea
        className="w-full p-3 border rounded-lg"
        rows={4}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        disabled={isSubmitting}
      />
      <div className="mt-2 flex justify-end">
        <Button color="blue" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '제출 중...' : '댓글 작성'}
        </Button>
      </div>
    </div>
  )
}

export default CommentEditor
