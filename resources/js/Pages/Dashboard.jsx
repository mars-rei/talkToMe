// last updated on 30/03 by mars

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// journal
import Journals from '@/Layouts/Journals/Index';
import JournalShow from '@/Layouts/Journals/Show';
import CreateJournalModal from '@/Components/Journals/CreateJournalModal';
import EditJournalModal from '@/Components/Journals/EditJournalModal';
import DeleteJournalModal from '@/Components/Journals/DeleteJournalModal';

import { router } from '@inertiajs/react';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    // all the user's journals and entries
    const { journals: journals, entries: entries } = usePage().props;

    // to get user's name
    const user = usePage().props.auth.user;
    
    // default state is journals
    const [activeView, setActiveView] = useState('journals');
    
    // for single journal views
    const [selectedJournal, setSelectedJournal] = useState(null);

    // for viewing entries for each journal
    const [journalEntryId, setJournalEntryId] = useState(null);

    // journal modal states 
    const [showCreateJournalModal, setShowCreateJournalModal] = useState(false);
    const [showEditJournalModal, setShowEditJournalModal] = useState(false);
    const [showDeleteJournalModal, setShowDeleteJournalModal] = useState(false);
    const [journalToEdit, setJournalToEdit] = useState(null);
    const [journalToDelete, setJournalToDelete] = useState(null);

    // entry modal states
    const [showCreateEntryModal, setShowCreateEntryModal] = useState(false);
    const [showEditEntryModal, setShowEditEntryModal] = useState(false);
    const [showShowEntryModal, setShowShowEntryModal] = useState(false);
    const [showDeleteEntryModal, setShowDeleteEntryModal] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);

    // journal handlers
    const handleJournalClick = (journal) => {
        setSelectedJournal(journal); 
    };

    const handleBackToJournals = () => {
        setSelectedJournal(null); 
    };

    const handleEditJournal = (journal) => {
        setJournalToEdit(journal);
        setShowEditJournalModal(true);
    };

    const handleDeleteJournal = (journal) => {
        setJournalToDelete(journal);
        setShowDeleteJournalModal(true);
    };

    // entry handlers
    const handleEntryClick = (entry) => {
        setSelectedEntry(entry);
        setShowShowEntryModal(true);
    };

    const handleEditEntryClick = (entry) => {
        setSelectedEntry(entry);
        setShowEditEntryModal(true);
        setShowShowEntryModal(false);
    };

    const handleDeleteEntryClick = (entry) => {
        setSelectedEntry(media);
        setShowDeleteEntryModal(true);
        setShowShowEntryModal(false);
    };


    const handleCloseModals = () => {
        // journal modals
        setShowCreateJournalModal(false);
        setShowEditJournalModal(false);
        setShowDeleteJournalModal(false);
        setJournalToEdit(null);
        setJournalToDelete(null);

        // entry modals
        setShowCreateEntryModal(false);
        setShowEditEntryModal(false);
        setShowShowEntryModal(false);
        setShowDeleteEntryModal(false);
        setSelectedEntry(null);
        setJournalEntryId(null);
    };

    

    /*
    // single views
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    
    // handlers
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

    // success handlers 
    const handleJournalCreated = () => { router.reload(); };
    const handleJournalUpdated = () => { router.reload(); handleCloseModals(); };
    const handleJournalDeleted = () => { router.reload(); handleCloseModals(); };

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

                                {selectedJournal ? (
                                    <JournalShow 
                                        journal={selectedJournal}
                                        allEntries={entries}
                                        onBack={handleBackToJournals}
                                        onEdit={handleEditJournal}
                                        onDelete={handleDeleteJournal}
                                        onEntryClick={handleEntryClick}
                                        onAddEntryClick={(journalId) => {
                                            setJournalEntryId(journalId);
                                            setShowCreateEntryModal(true);
                                        }}
                                    />
                                ) : (
                                    <Journals
                                        journals={journals}
                                        onJournalClick={handleJournalClick}
                                        onCreateClick={() => setShowCreateJournalModal(true)}
                                    />
                                )}
                            </>
                        )}


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

                    {/* journal modals */}
                    <CreateJournalModal
                        isOpen={showCreateJournalModal}
                        onClose={handleCloseModals}
                        onSuccess={handleJournalCreated}
                    />
                    <EditJournalModal
                        isOpen={showEditJournalModal}
                        onClose={handleCloseModals}
                        journal={journalToEdit}
                        onSuccess={handleJournalUpdated}
                    />
                    <DeleteJournalModal
                        isOpen={showDeleteJournalModal}
                        onClose={handleCloseModals}
                        journal={journalToDelete}
                        onSuccess={handleJournalDeleted}
                    />
                </main>
            </div>
        </AuthenticatedLayout>
    );
}