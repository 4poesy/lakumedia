'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, ThumbsUp, Reply, User, Heart } from 'lucide-react';

interface CommentItem {
  id: string;
  authorName: string;
  createdAt: string;
  content: string;
  likes: number;
  isExecutive?: boolean;
}

interface StudioCommentSectionProps {
  postId: string;
  postTitle: string;
}

export function StudioCommentSection({ postId, postTitle }: StudioCommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      authorName: 'Engr. Emeka Okonkwo',
      createdAt: 'August 26, 2026 at 2:15 PM',
      content: 'Fascinating breakdown of the 12G-SDI routing vs quad-link SDI! The dual-path satellite uplink failover with Starlink Enterprise is definitely the benchmark for live event engineering in West Africa. Great work Laku Media team!',
      likes: 12,
    },
    {
      id: 'c2',
      authorName: 'Adebayo Samuel Olaku',
      createdAt: 'August 26, 2026 at 4:30 PM',
      content: 'Thank you Engr. Emeka! We built this exact dual-path infrastructure to guarantee zero broadcast drops during high-density stadium concerts. Appreciate your feedback!',
      likes: 18,
      isExecutive: true,
    },
  ]);

  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newComment: CommentItem = {
        id: `c-${Date.now()}`,
        authorName: authorName.trim(),
        createdAt: 'Just now',
        content: commentText.trim(),
        likes: 0,
      };

      setComments([newComment, ...comments]);
      setCommentText('');
      setIsSubmitting(false);
      setShowSuccessToast(true);

      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 600);
  };

  const handleLike = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <div className="bg-[#0F172A] p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#D9541E]" /> Reader Discussion & Comments ({comments.length})
        </h3>
        <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
          Moderated Studio Board
        </span>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-4 rounded-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-extrabold">
            Thank you! Your comment has been published successfully on Laku Media Studio.
          </p>
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">Leave a Professional Comment</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Your Name (Required)..."
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9541E]"
          />
          <input
            type="email"
            placeholder="Your Email (Optional, private)..."
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9541E]"
          />
        </div>

        <textarea
          required
          rows={3}
          placeholder="Share your technical thoughts, questions, or insights on this article..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9541E] resize-none"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>PUBLISHING...</span>
            ) : (
              <>
                <span>POST COMMENT</span> <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-5 rounded-2xl border transition-all ${
              comment.isExecutive
                ? 'bg-slate-900 border-[#D9541E]/40 ml-4 sm:ml-8'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-xs border ${
                    comment.isExecutive
                      ? 'bg-[#D9541E] border-amber-400'
                      : 'bg-[#2A2E7F] border-slate-700'
                  }`}
                >
                  {comment.authorName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">{comment.authorName}</span>
                    {comment.isExecutive && (
                      <span className="px-2 py-0.2 rounded bg-[#D9541E] text-white text-[9px] font-extrabold uppercase">
                        EXECUTIVE AUTHOR
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{comment.createdAt}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1 text-[11px] font-extrabold text-slate-400 hover:text-amber-400 transition-colors bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                <ThumbsUp className="w-3 h-3" /> {comment.likes}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
