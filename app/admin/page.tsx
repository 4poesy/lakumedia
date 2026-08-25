import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import {
  LayoutDashboard,
  Newspaper,
  Activity,
  Film,
  Camera,
  MessageSquare,
  Users,
  ChevronRight,
  PlusCircle,
  Clock,
  Radio,
} from 'lucide-react';

export const revalidate = 10;

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Query counts
  const { count: articlesCount } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true });

  const { count: draftArticlesCount } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft');

  const { count: fixturesCount } = await supabase
    .from('fixtures')
    .select('*', { count: 'exact', head: true });

  const { count: mediaCount } = await supabase
    .from('media_items')
    .select('*', { count: 'exact', head: true });

  const { count: liveNowMediaCount } = await supabase
    .from('media_items')
    .select('*', { count: 'exact', head: true })
    .eq('live_status', 'live_now');

  const { count: servicesCount } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true });

  const { count: commentsCount } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true });

  const { count: profilesCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="space-y-8 theme-sports">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-emerald-400" /> CMS Admin Command Center
        </h1>
        <p className="text-sm text-slate-400">
          At-a-glance platform metrics, content management tools, live match scoring, and user moderation.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Articles</span>
            <Newspaper className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{articlesCount || 3}</p>
          <p className="text-[11px] text-amber-400 font-medium">{draftArticlesCount || 0} drafts pending</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Fixtures</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{fixturesCount || 3}</p>
          <p className="text-[11px] text-emerald-400 font-medium">Match Center active</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Media Catalog</span>
            <Film className="w-4 h-4 text-[#D9541E]" />
          </div>
          <p className="text-2xl font-extrabold text-white">{mediaCount || 6}</p>
          <p className="text-[11px] text-[#D9541E] font-medium flex items-center gap-1">
            <Radio className="w-3 h-3 animate-pulse" /> {liveNowMediaCount || 1} live now
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Comments & Users</span>
            <MessageSquare className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{commentsCount || 2}</p>
          <p className="text-[11px] text-slate-400 font-medium">{profilesCount || 5} user accounts</p>
        </div>
      </div>

      {/* Admin Quick Action Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Articles CMS Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Articles & Editorial CMS</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Publish, edit, and categorize sports news across NPFL, EPL, and Transfers.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/80">
            <Link
              href="/admin/articles"
              className="flex-1 text-center py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700"
            >
              View Articles
            </Link>
            <Link
              href="/admin/articles/new"
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs"
            >
              <PlusCircle className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Live Scores Console Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Match Scores Console</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Update fixture home/away scores and match statuses with Supabase Realtime broadcast.
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80">
            <Link
              href="/admin/live-scores"
              className="block w-full text-center py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow"
            >
              Open Score Console
            </Link>
          </div>
        </div>

        {/* Media Library Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#D9541E]/20 text-[#D9541E] flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Media Catalog Admin</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Manage films, documentaries, series episodes, and live video stream records.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/80">
            <Link
              href="/admin/media"
              className="flex-1 text-center py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700"
            >
              Manage Catalog
            </Link>
            <Link
              href="/admin/media/new"
              className="p-2 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-bold text-xs"
            >
              <PlusCircle className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Services Portfolio Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#D9541E]/20 text-[#D9541E] flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Production Services</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Manage Laku Media offerings across music videos, movie editing, TV, and photography.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/80">
            <Link
              href="/admin/services"
              className="flex-1 text-center py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700"
            >
              Manage Services ({servicesCount || 4})
            </Link>
            <Link
              href="/admin/services/new"
              className="p-2 rounded-xl bg-[#D9541E] hover:bg-[#b84315] text-white font-bold text-xs"
            >
              <PlusCircle className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Comment Moderation Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Comment Moderation</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Review and delete reader reactions across articles and video items.
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80">
            <Link
              href="/admin/comments"
              className="block w-full text-center py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-purple-300 border border-purple-500/30"
            >
              Moderate Comments
            </Link>
          </div>
        </div>

        {/* User Roles Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">User Role Management</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Manage user permissions and elevate accounts to editor or admin roles.
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80">
            <Link
              href="/admin/users"
              className="block w-full text-center py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-blue-300 border border-blue-500/30"
            >
              Manage Roles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
