'use client'

import {useState} from 'react'
import Image from 'next/image'
import {TComment, TCommentPage} from '@/types/comment'
import Pagination from '@/components/Pagination'
import Button from '@/components/button/Button'

type CommentListProps = {
  comments: TComment[]
  pageData: TCommentPage
  onPageChange: (page: number) => void
  onUpdateComment: (commentId: string, content: string) => Promise<boolean>
  onDeleteComment: (commentId: string) => Promise<boolean>
  currentNickname: string
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  pageData,
  onPageChange,
  onUpdateComment,
  onDeleteComment,
  currentNickname
}) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  const currentPage = pageData.number + 1 // 0-based to 1-based
  const totalPages = pageData.totalPages

  const handlePageChange = (page: number) => {
    onPageChange(page - 1) // 1-based to 0-based
  }

  const handleEditClick = (comment: TComment) => {
    setEditingCommentId(comment.id)
    setEditContent(comment.content)
  }

  const handleUpdateSubmit = async (commentId: string) => {
    if (!editContent.trim()) {
      alert('댓글 내용을 입력하세요.')
      return
    }
    const success = await onUpdateComment(commentId, editContent)
    if (success) {
      setEditingCommentId(null)
      setEditContent('')
    }
  }

  const handleDeleteClick = async (commentId: string) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      await onDeleteComment(commentId)
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        댓글 ({pageData.totalElements})
      </h3>
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map(comment => (
            <div
              key={comment.id}
              className="bg-gray-100 p-4 rounded-lg shadow flex items-start gap-4">
              <Image
                className="w-10 h-10 rounded-full"
                src={comment.profile || '/images/defaultProfile.png'}
                alt={comment.nickname}
                width={40}
                height={40}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800">{comment.nickname}</p>
                  <p className="text-gray-600 text-sm">
                    {new Date(comment.updatedAt).toLocaleString()}
                  </p>
                </div>
                {editingCommentId === comment.id ? (
                  <div className="mt-2">
                    <textarea
                      className="w-full p-3 border rounded-lg"
                      rows={3}
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <Button color="blue" onClick={() => setEditingCommentId(null)}>
                        취소
                      </Button>
                      <Button color="cyan" onClick={() => handleUpdateSubmit(comment.id)}>
                        저장
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 mt-1">{comment.content}</p>
                    {comment.nickname === currentNickname && (
                      <div className="mt-2 flex gap-2">
                        <Button color="cyan" onClick={() => handleEditClick(comment)}>
                          수정
                        </Button>
                        <Button color="red" onClick={() => handleDeleteClick(comment.id)}>
                          삭제
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">아직 댓글이 없습니다.</p>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default CommentList
