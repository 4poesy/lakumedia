'use me';
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Users, Shield, UserCheck, Save, Check } from 'lucide-react';
import { UserRole } from '@/lib/types/supabase';

export default function UserRolesAdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const supabase = createClient();

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await (supabase.from('profiles' as any) as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      setUsers(data);
    } else {
      setUsers([
        {
          id: 'u1',
          display_name: 'Adebayo Samuel Olaku',
          role: 'admin',
          created_at: new Date().toISOString(),
        },
        {
          id: 'u2',
          display_name: 'Lakumedia Desk Editor',
          role: 'editor',
          created_at: new Date().toISOString(),
        },
        {
          id: 'u3',
          display_name: 'Chidi K.',
          role: 'reader',
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleSaveRole = async (user: any) => {
    setSavingId(user.id);
    setSuccessMsg(null);

    const { error } = await (supabase.from('profiles' as any) as any)
      .update({
        role: user.role,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    setSavingId(null);

    if (!error) {
      setSuccessMsg(`Role updated for ${user.display_name || 'user'}`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      alert(`Error updating user role: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6 theme-sports">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400" /> User Role Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Oversee platform user profiles and manage administrative permissions (`reader`, `editor`, `admin`).
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center gap-1.5 w-fit">
          <Shield className="w-4 h-4" /> Admin Restricted Access
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* Table List */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading user profiles...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3">Display Name</th>
                  <th className="px-6 py-3">Current Role</th>
                  <th className="px-6 py-3">Joined Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>{user.display_name || 'Anonymous User'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="reader">Reader</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleSaveRole(user)}
                        disabled={savingId === user.id}
                        className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 ml-auto shadow"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{savingId === user.id ? 'Saving...' : 'Save Role'}</span>
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
