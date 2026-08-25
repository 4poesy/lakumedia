'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { MessageSquare, Trash2, Shield, Calendar, User, Newspaper, Film } from 'lucide-react';

export default function CommentModerationPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchComments = async () => {
    setLoading(true);
    const { data } = await (supabase.from('comments' as any) as any)
      .select('*, profiles(display_name, avatar_url)')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      setComments(data);
    } else {
      setComments([
        {
          id: 'c1',
          commentable_type: 'article',
          commentable_id: '40000000-0000-0000-0000-000000000001',
          body: 'What a game! Enyimba played with so much heart today.',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          profiles: { display_name: 'Chidi K.' },
        },
        {
          id: 'mc1',
          commentable_type: 'media_item',
          commentable_id: '50000000-0000-0000-0000-000000000001',
          body: 'Stunning cinematography and soundtrack! Laku Media never disappoints.',
          created_at: new Date(Date.now() - 7200000).toISOString(),
          profiles: { display_name: 'NollywoodFan' },
        },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    const { error } = await (supabase.from('comments' as any) as any)
      .delete()
      .eq('id', id);

    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== id));
    } else {
      alert(`Error removing comment: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6 theme-sports">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-purple-400" /> Comment Moderation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review and delete reader reactions posted across sports articles and multimedia content.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 w-fit">
          <Shield className="w-4 h-4" /> Admin Restricted Access
        </div>
      </div>

      {/* Table List */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading comment backlog...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3">Author</th>
                  <th className="px-6 py-3">Target Context</th>
                  <th className="px-6 py-3">Comment Body</th>
                  <th className="px-6 py-3">Timestamp</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {comments.map((comment) => (
                  <tr key={comment.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-emerald-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        {comment.profiles?.display_name || 'Anonymous'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {comment.commentable_type === 'article' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-fit">
                          <Newspaper className="w-3 h-3" /> Sports Article
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D9541E]/20 text-[#D9541E] border border-[#D9541E]/30 flex items-center gap-1 w-fit">
                          <Film className="w-3 h-3" /> Media Item
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-md truncate text-slate-200">
                      {comment.body}
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-xs font-semibold flex items-center gap-1 ml-auto transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
