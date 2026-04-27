'use client';

import { useState, useEffect, useMemo } from 'react';

interface Contact {
    _id: string;
    name: string;
    email: string;
    message: string;
    subject: string;
    createdAt: string;
}

interface LikeMain {
    _id: string;
    deviceName: string;
    browser: string;
    ip: string;
    city: string;
    location: string;
    date: string;
    time: string;
    createdAt: string;
}

interface LikeProject {
    _id: string;
    projectId: string;
    projectName: string;
    projectCategory: string;
    deviceName: string;
    browser: string;
    ip: string;
    createdAt: string;
}

export default function AdminPanel() {
    const [data, setData] = useState<{ contacts: Contact[]; likesMain: LikeMain[]; likesProject: LikeProject[] }>({
        contacts: [],
        likesMain: [],
        likesProject: [],
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'messages' | 'main-likes' | 'project-likes'>('messages');
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetch('/api/admin/data')
            .then(res => res.json())
            .then(json => {
                if (json.ok) {
                    setData(json.data);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filteredMessages = useMemo(() => {
        return (data.contacts || []).filter(msg => {
            const matchesSearch = [msg.name, msg.email, msg.message, msg.subject]
                .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));

            const msgDate = new Date(msg.createdAt);
            const matchesStart = !startDate || msgDate >= new Date(startDate);
            const matchesEnd = !endDate || msgDate <= new Date(new Date(endDate).setHours(23, 59, 59));

            return matchesSearch && matchesStart && matchesEnd;
        });
    }, [data.contacts, searchTerm, startDate, endDate]);

    const filteredMainLikes = useMemo(() => {
        return (data.likesMain || []).filter(like => {
            const matchesSearch = [like.deviceName, like.browser, like.city, like.location, like.ip]
                .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));

            const likeDate = new Date(like.createdAt);
            const matchesStart = !startDate || likeDate >= new Date(startDate);
            const matchesEnd = !endDate || likeDate <= new Date(new Date(endDate).setHours(23, 59, 59));

            return matchesSearch && matchesStart && matchesEnd;
        });
    }, [data.likesMain, searchTerm, startDate, endDate]);

    const filteredProjectLikes = useMemo(() => {
        return (data.likesProject || []).filter(like => {
            const matchesSearch = [like.projectName, like.projectCategory, like.deviceName, like.browser, like.ip]
                .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));

            const likeDate = new Date(like.createdAt);
            const matchesStart = !startDate || likeDate >= new Date(startDate);
            const matchesEnd = !endDate || likeDate <= new Date(new Date(endDate).setHours(23, 59, 59));

            return matchesSearch && matchesStart && matchesEnd;
        });
    }, [data.likesProject, searchTerm, startDate, endDate]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-8 font-sans selection:bg-pink-500/30">
            {/* Background patterns - Static for Admin to avoid matching main page movement if any */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
                <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <div className="inline-block px-2 py-1 mb-2 text-[10px] font-semibold tracking-wider text-pink-500 uppercase rounded-full bg-pink-500/10 border border-pink-500/20">
                            Secure Admin Dashboard
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-1 tracking-tight">
                            Portfolio <span className="text-pink-500">Analytics</span>
                        </h1>
                        <p className="text-xs text-gray-400 max-w-2xl">
                            Real-time tracking of visitor engagement and correspondence.
                        </p>
                    </div>
                    <a
                        href="/"
                        className="px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-800 text-xs font-medium hover:border-pink-500/50 hover:text-pink-500 transition-all active:scale-95 text-white backdrop-blur-sm"
                    >
                        ← Exit Dashboard
                    </a>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="p-5 rounded-2xl bg-gray-900/40 border border-white/5 backdrop-blur-xl flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Messages</p>
                            <p className="text-xl font-bold mt-0.5">{data.contacts.length}</p>
                        </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-gray-900/40 border border-white/5 backdrop-blur-xl flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500 ring-1 ring-pink-500/20">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Site Likes</p>
                            <p className="text-xl font-bold mt-0.5">{data.likesMain.length}</p>
                        </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-gray-900/40 border border-white/5 backdrop-blur-xl flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Project Likes</p>
                            <p className="text-xl font-bold mt-0.5">{data.likesProject.length}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="p-6 rounded-2xl bg-gray-900/60 border border-white/5 mb-8 backdrop-blur-2xl ring-1 ring-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-pink-500 uppercase tracking-wider ml-1">Live Search</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Filter interactions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/40 text-sm text-white focus:ring-2 focus:ring-pink-500/20 focus:outline-none focus:border-pink-500/50 transition-all placeholder:text-gray-600"
                                />
                                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-pink-500 uppercase tracking-wider ml-1">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-sm text-white focus:ring-2 focus:ring-pink-500/20 focus:outline-none focus:border-pink-500/50 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-pink-500 uppercase tracking-wider ml-1">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-sm text-white focus:ring-2 focus:ring-pink-500/20 focus:outline-none focus:border-pink-500/50 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 p-1 mb-6 rounded-xl bg-gray-900/80 w-fit ring-1 ring-white/10 border border-white/5">
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`px-5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-300 ${activeTab === 'messages'
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Messages ({filteredMessages.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('main-likes')}
                        className={`px-5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-300 ${activeTab === 'main-likes'
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Site Likes ({filteredMainLikes.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('project-likes')}
                        className={`px-5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-300 ${activeTab === 'project-likes'
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Project Likes ({filteredProjectLikes.length})
                    </button>
                </div>

                {/* Content Area */}
                {activeTab === 'messages' ? (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredMessages.length === 0 ? (
                            <div className="text-center py-20 rounded-2xl border border-dashed border-white/10 bg-gray-900/20 text-sm text-gray-500">
                                No messages found.
                            </div>
                        ) : filteredMessages.map((msg) => (
                            <div key={msg._id} className="p-6 rounded-2xl bg-gray-900/40 border border-white/5 hover:border-pink-500/30 transition-all duration-300 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 relative z-10">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-0.5 group-hover:text-pink-500 transition-colors">{msg.name}</h3>
                                        <p className="text-sm text-pink-500/80 select-all">{msg.email}</p>
                                    </div>
                                    <div className="sm:text-right">
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 text-[9px] font-bold uppercase tracking-wider border border-pink-500/20 mb-1">
                                            New Message
                                        </span>
                                        <p className="text-[11px] text-gray-400 font-medium">{new Date(msg.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
                                        <p className="text-[10px] text-gray-600 font-mono">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-black/40 border border-white/5 relative z-10 group-hover:border-white/10 transition-colors">
                                    <p className="text-[9px] font-semibold text-pink-500/60 uppercase tracking-widest mb-2">Subject: {msg.subject}</p>
                                    <p className="text-sm leading-relaxed text-gray-300 select-text whitespace-pre-wrap">{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : activeTab === 'main-likes' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredMainLikes.length === 0 ? (
                            <div className="col-span-full text-center py-20 rounded-2xl border border-dashed border-white/10 bg-gray-900/20 text-sm text-gray-500">
                                No site likes recorded.
                            </div>
                        ) : filteredMainLikes.map((like) => (
                            <div key={like._id} className="p-5 rounded-xl bg-gray-900/40 border border-white/5 hover:border-pink-500/30 transition-all group duration-300 relative overflow-hidden h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform duration-300">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-medium text-gray-500 uppercase tracking-wider">Site Like</p>
                                        <p className="text-xs font-semibold text-gray-100">{new Date(like.createdAt).toLocaleDateString()}</p>
                                        <p className="text-[10px] text-pink-500/60 font-medium">{like.time}</p>
                                    </div>
                                </div>

                                <div className="space-y-2.5 flex-grow">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 border border-white/5">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-gray-300 truncate">{like.city}, {like.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 border border-white/5">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-gray-300 truncate">{like.deviceName} • {like.browser}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-white/5">
                                    <p className="text-[8px] font-medium text-gray-600 uppercase tracking-wider text-center">Visitor IP</p>
                                    <p className="text-[9px] font-mono text-pink-500/40 text-center select-all">{like.ip}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProjectLikes.length === 0 ? (
                            <div className="col-span-full text-center py-20 rounded-2xl border border-dashed border-white/10 bg-gray-900/20 text-sm text-gray-500">
                                No project likes recorded.
                            </div>
                        ) : filteredProjectLikes.map((like) => (
                            <div key={like._id} className="p-5 rounded-xl bg-gray-900/40 border border-white/5 hover:border-pink-500/30 transition-all group duration-300 relative overflow-hidden h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <p className="text-[9px] font-medium text-gray-500 uppercase tracking-wider">Project Like</p>
                                        <p className="text-xs font-bold text-gray-100 truncate">{like.projectName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] text-gray-400 font-medium">{new Date(like.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="space-y-2.5 flex-grow">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-orange-500/70 border border-white/5">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-orange-500/70 font-medium">{like.projectCategory}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 border border-white/5">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-gray-300 truncate">{like.deviceName} • {like.browser}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-white/5">
                                    <p className="text-[8px] font-medium text-gray-600 uppercase tracking-wider text-center">Visitor IP</p>
                                    <p className="text-[9px] font-mono text-orange-500/30 text-center select-all">{like.ip}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}