// last updated on 30/03 by mars

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    // to get user's name
    const user = usePage().props.auth.user;
    
    // default state is journals
    const [activeView, setActiveView] = useState('journals');

    /*
    // single views
    const [selectedJournal, setSelectedJournal] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    
    // handlers
    const handleJournalClick = (journal) => {
        setSelectedJournal(journal);
    };

    const handleBackToJournals = () => {
        setSelectedJournal(null);
    };

    const handleWallPostClick = (post) => {
        setSelectedPost(post);
    };

    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };
    */

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex min-h-screen">

                {/*Side Navbar*/}
                <aside className="w-60 bg-white shadow-md">
                    <nav className="p-1 space-y-3">
                        <p 
                            onClick={() => handleViewChange('journals')}
                            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 ${activeView === 'journals' ? 'text-[#003c66] bg-gray-100' : ''}`}
                        >
                            <img src="/imgs/journal.png" alt="Journals" className="w-7 h-7"/>
                            Journals
                        </p>
                        <p 
                            onClick={() => handleViewChange('positiveWall')}
                            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 ${activeView === 'positiveWall' ? 'text-[#003c66] bg-gray-100' : ''}`}
                        >
                            <img src="/imgs/add.png" alt="Positive Wall" className="w-7 h-7"/>
                            Positive Wall
                        </p>
                        <p 
                            onClick={() => handleViewChange('growthNotes')}
                            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 ${activeView === 'growthNotes' ? 'text-[#003c66] bg-gray-100' : ''}`}
                        >
                            <img src="/imgs/sticky-note.png" alt="Growth Notes" className="w-7 h-7"/>
                            Growth Notes
                        </p>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {/* Journals  */}
                        {activeView === 'journals' && (
                            <>
                                <div>
                                    <h1 className="text-3xl font-bold">Welcome Back, {user.name}</h1> {/* need to add user name */}
                                    <p className='mb-2 text-xl mt-2 text-gray-600'>
                                        How are you feeling today?
                                    </p>
                                </div>
                            </>
                        )}
                        {/*
                        {activeView === 'journals' && (
                            <>
                                {selectedJournal ? (
                                    <JournalShow
                                        journal={selectedJournal}
                                        onBack={handleBackToJournals}
                                        onEdit={handleShowEditJournal}
                                        onDelete={handleDeleteJournal}
                                    />
                                ) : (
                                    <Journals
                                        journals={journals}
                                        onJournalClick={handleJournalClick}
                                    />
                                )}
                            </>
                        )}
                        */}

                        {/* Positive Wall  */}
                        {activeView === 'positiveWall' && (
                            <div>
                                <p className='mb-2 text-xl mt-2 text-gray-600'>
                                    Share your positive thoughts!
                                </p>
                            </div>
                        )}
                        {/*
                        {activeView === 'positiveWall' && (
                            <>
                                {selectedPost ? (
                                    <PositiveWallShow
                                        post={selectedPost}
                                        onEdit={handleShowEditPost}
                                        onDelete={handleDeletePost}
                                    />
                                ) : (
                                    <PositiveWall
                                        posts={wallPosts}
                                        onPostClick={handleWallPostClick}
                                    />
                                )}
                            </>
                        )}
                        */}

                        {/* Growth Notes  */}
                        {activeView === 'growthNotes' && (
                            <div>
                                <h1 className="text-2xl font-bold">Notes</h1>
                            </div>
                        )}
                        {/*{activeView === 'growthNotes' && (
                            <>
                                {selectedNote ? (
                                    <GrowthNotesShow
                                        note={selectedNote}
                                        onEdit={handleShowEditNote}
                                        onDelete={handleDeleteNote}
                                    />
                                ) : (
                                    <GrowthNotes
                                        notes={growthNotes}
                                        onNoteClick={handleNoteClick}
                                    />
                                )}
                            </>
                        )}
                        */}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}