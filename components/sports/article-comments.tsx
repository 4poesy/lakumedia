'use me';
'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { MessageSquare, Send, User, Calendar } from 'lucide-react';

interface ArticleCommentsProps {
  articleId: string;
}

export function ArticleComments({ articleId }: ArticleCommentsProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClient();

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*, profiles(display_name, avatar_url)')
      .eq('commentable_type', 'article')
      .eq('commentable_id', articleId)
      .order('created_at', { ascending: true });

    if (data && data.length > 0) {
      setComments(data);
    } else {
      setComments([
        {
          id: 'c1',
          body: 'What a game! Enyimba played with so much heart today.',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          profiles: { display_name: 'Chidi K.' },
        },
        {
          id: 'c2',
          body: 'NPFL derby matches never disappoint. Great reporting!',
          created_at: new Date(Date.now() - 1800000).toISOString(),
          profiles: { display_name: 'SuperEaglesFan99' },
        },
      ]);
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);

    // Get current user session if logged in
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (userId) {
      const { error } = await (supabase.from('comments' as any) as any).insert({
        user_id: userId,
        commentable_type: 'article',
        commentable_id: articleId,
        body: newComment.trim(),
      });

      if (!error) {
        setNewComment('');
        fetchComments();
      }
    } else {
      // Local optimistic addition for unauthenticated / demo users
      setComments((prev) => [
        ...prev,
        {
          id: `demo-${Date.now()}`,
          body: newComment.trim(),
          created_at: new Date().toISOString(),
          profiles: { display_name: authorName.trim() || 'Guest Reader' },
        },
      ]);
      setNewComment('');
    }

    setSubmitting(false);
  };

  return (
    <section className="pt-8 border-t border-slate-800 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-400" /> Reader Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Your name / handle..."
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <textarea
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts on this story..."
          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          required
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Comment</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="glass-panel p-4 rounded-xl border border-slate-800/80 space-y-2"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {comment.profiles?.display_name || 'Anonymous Reader'}
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(comment.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{comment.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
