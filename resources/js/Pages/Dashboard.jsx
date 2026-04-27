// last updated on 09/04 by mars

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// journal
import Journals from '@/Layouts/Journals/Index';
import JournalShow from '@/Layouts/Journals/Show';
import CreateJournalModal from '@/Components/Journals/CreateJournalModal';
import EditJournalModal from '@/Components/Journals/EditJournalModal';
import DeleteJournalModal from '@/Components/Journals/DeleteJournalModal';

// entry
import CreateEntryModal from '@/Components/Entries/CreateEntryModal';
import ShowEntryModal from '@/Components/Entries/ShowEntryModal';
import DeleteEntryModal from '@/Components/Entries/DeleteEntryModal';

// affirmation
import Affirmations from '@/Layouts/Affirmations/Index';
import ShowAffirmationModal from '@/Components/Affirmations/ShowAffirmationModal';
import CreateAffirmationModal from '@/Components/Affirmations/CreateAffirmationModal';
import DeleteAffirmationModal from '@/Components/Affirmations/DeleteAffirmationModal';

// development
import Developments from '@/Layouts/Developments/Index';
import ShowDevelopmentModal from '@/Components/Developments/ShowDevelopmentModal';
import CreateDevelopmentModal from '@/Components/Developments/CreateDevelopmentModal';
import DeleteDevelopmentModal from '@/Components/Developments/DeleteDevelopmentModal';

import { router } from '@inertiajs/react';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    // all the user's journals and entries
    const { 
        journals: journals, 
        entries: entries, 
        affirmations: affirmations,
        developments: developments 
    } = usePage().props;

    // to get user's name
    const user = usePage().props.auth.user;
    
    // for changing states - default state is journals
    const handleViewChange = (view) => {
        setActiveView(view);
    };
    const [activeView, setActiveView] = useState('journals');
    

    // for single journal views
    const [selectedJournal, setSelectedJournal] = useState(null);

    // for viewing entries for each journal
    const [journalEntryId, setJournalEntryId] = useState(null);


    // for single entry views
    const [selectedEntry, setSelectedEntry] = useState(null);


    // journal modal states 
    const [showCreateJournalModal, setShowCreateJournalModal] = useState(false);
    const [showEditJournalModal, setShowEditJournalModal] = useState(false);
    const [showDeleteJournalModal, setShowDeleteJournalModal] = useState(false);
    const [journalToEdit, setJournalToEdit] = useState(null);
    const [journalToDelete, setJournalToDelete] = useState(null);

    // entry modal states
    const [showCreateEntryModal, setShowCreateEntryModal] = useState(false);
    const [showShowEntryModal, setShowShowEntryModal] = useState(false);
    const [showDeleteEntryModal, setShowDeleteEntryModal] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState(null);

    // affirmation modal states
    const [showCreateAffirmationModal, setShowCreateAffirmationModal] = useState(false);
    const [showShowAffirmationModal, setShowShowAffirmationModal] = useState(false);
    const [showDeleteAffirmationModal, setShowDeleteAffirmationModal] = useState(false);
    const [selectedAffirmation, setSelectedAffirmation] = useState(null);
    const [affirmationToDelete, setAffirmationToDelete] = useState(null);

    // development modal states
    const [showCreateDevelopmentModal, setShowCreateDevelopmentModal] = useState(false);
    const [showShowDevelopmentModal, setShowShowDevelopmentModal] = useState(false);
    const [showDeleteDevelopmentModal, setShowDeleteDevelopmentModal] = useState(false);
    const [selectedDevelopment, setSelectedDevelopment] = useState(null);
    const [developmentToDelete, setDevelopmentToDelete] = useState(null);


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

    const handleDeleteEntryClick = (entry) => {
        setEntryToDelete(entry); 
        setShowDeleteEntryModal(true);
        setShowShowEntryModal(false);
    };

    // affirmation handlers
    const handleAffirmationClick = (affirmation) => {
        setSelectedAffirmation(affirmation);
        setShowShowAffirmationModal(true);
    };

    const handleDeleteAffirmationClick = (affirmation) => {
        setAffirmationToDelete(affirmation);
        setShowDeleteAffirmationModal(true);
        setShowShowAffirmationModal(false);
    };

    // development handlers
    const handleDevelopmentClick = (development) => {
        setSelectedDevelopment(development);
        setShowShowDevelopmentModal(true);
    };

    const handleDeleteDevelopmentClick = (development) => {
        setDevelopmentToDelete(development);
        setShowDeleteDevelopmentModal(true);
        setShowShowDevelopmentModal(false);
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
        setShowShowEntryModal(false);
        setShowDeleteEntryModal(false);
        setSelectedEntry(null);
        setJournalEntryId(null);

        // affirmation modals
        setShowCreateAffirmationModal(false);
        setShowDeleteAffirmationModal(false);
        setAffirmationToDelete(null);
        setSelectedAffirmation(null);

        // development modals
        setShowCreateDevelopmentModal(false);
        setShowDeleteDevelopmentModal(false);
        setDevelopmentToDelete(null);
        setSelectedDevelopment(null);
    };

    // success handlers 
    const handleJournalCreated = () => { router.reload(); };
    const handleJournalUpdated = () => { router.reload(); handleCloseModals(); };
    const handleJournalDeleted = () => { router.reload(); handleCloseModals(); };

    const handleEntryCreated = () => { router.reload(); };
    const handleEntryDeleted = () => { router.reload(); handleCloseModals(); };

    const handleAffirmationCreated = () => { router.reload(); };
    const handleAffirmationDeleted = () => { router.reload(); handleCloseModals(); };

    const handleDevelopmentCreated = () => { router.reload(); };
    const handleDevelopmentDeleted = () => { router.reload(); handleCloseModals(); };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex h-full">

                {/*Side Navbar*/}
                <aside className="w-60 flex-shrink-0">
                    <nav className="p-4 space-y-3">
                        <p 
                            onClick={() => handleViewChange('journals')}
                            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white ${activeView === 'journals' ? 'text-black bg-white font-bold shadow-md' : ''}`}
                        >
                            <img src="https://group30-s3publicbucket.s3.us-east-1.amazonaws.com/journal.png" alt="Journals" className="w-7 h-7"/>
                            Journals
                        </p>
                        <p 
                            onClick={() => handleViewChange('positiveWall')}
                            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white ${activeView === 'positiveWall' ? 'text-black bg-white font-bold shadow-md' : ''}`}
                        >
                            <img src="https://group30-s3publicbucket.s3.us-east-1.amazonaws.com/add.png" alt="Positive Wall" className="w-7 h-7"/>
                            Positive Wall
                        </p>
                        <p 
                            onClick={() => handleViewChange('growthNotes')}
                            className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white ${activeView === 'growthNotes' ? 'text-black bg-white font-bold shadow-md' : ''}`}
                        >
                            <img src="https://group30-s3publicbucket.s3.us-east-1.amazonaws.com/sticky-note.png" alt="Growth Notes" className="w-7 h-7"/>
                            Growth Notes
                        </p>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 pt-4 bg-white rounded-tl-3xl overflow-y-auto">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {/* Journals  */}
                        {activeView === 'journals' && (
                            <>
                                {selectedJournal ? (
                                    <JournalShow 
                                        journal={selectedJournal}
                                        entries={entries.filter(entry => entry.journal_id === selectedJournal?.id)} // now displaying entries for their own journals
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
                                    <>
                                        <div>
                                            <h1 className="text-3xl font-bold pt-8">Welcome Back, {user.name}</h1>
                                            <p className='mb-10 text-xl mt-2 text-black-600'>
                                                How are you feeling today?
                                            </p>
                                        </div>
                                        <Journals
                                            journals={journals}
                                            onJournalClick={handleJournalClick}
                                            onCreateClick={() => setShowCreateJournalModal(true)}
                                        />
                                    </>
                                )}
                            </>
                        )}

                        {/* Positive Wall  */}
                        {activeView === 'positiveWall' && (
                            <>
                                <div>
                                    <h1 className="pt-8 text-2xl font-bold">Affirmations</h1>
                                </div>
                                <Affirmations
                                    affirmations={affirmations}
                                    onAffirmationClick={handleAffirmationClick}
                                    onCreateClick={() => setShowCreateAffirmationModal(true)}
                                />
                            </>
                        )}

                        {/* Growth Notes  */}
                        {activeView === 'growthNotes' && (
                            <>
                                <div>
                                    <h1 className="pt-8 text-2xl font-bold">Notes</h1>
                                </div>
                                <Developments
                                    developments={developments}
                                    onDevelopmentClick={handleDevelopmentClick}
                                    onCreateClick={() => setShowCreateDevelopmentModal(true)}
                                />
                            </>
                        )}
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

                    {/* entry modals */}
                    <CreateEntryModal
                        isOpen={showCreateEntryModal}
                        onClose={handleCloseModals}
                        onSuccess={handleEntryCreated}
                        selectedJournalId={journalEntryId}
                    />
                    <ShowEntryModal
                        isOpen={showShowEntryModal}
                        onClose={handleCloseModals}
                        entry={selectedEntry}
                        onDelete={handleDeleteEntryClick}  
                    />
                    <DeleteEntryModal
                        isOpen={showDeleteEntryModal}
                        onClose={handleCloseModals}
                        entry={entryToDelete}
                        onSuccess={handleEntryDeleted}
                    />

                    {/* affirmation modals */}
                    <CreateAffirmationModal
                        isOpen={showCreateAffirmationModal}
                        onClose={handleCloseModals}
                        onSuccess={handleAffirmationCreated}
                    />
                    <ShowAffirmationModal
                        isOpen={showShowAffirmationModal}
                        onClose={handleCloseModals}
                        affirmation={selectedAffirmation}
                        onDelete={handleDeleteAffirmationClick}  
                    />
                    <DeleteAffirmationModal
                        isOpen={showDeleteAffirmationModal}
                        onClose={handleCloseModals}
                        affirmation={affirmationToDelete} 
                        onSuccess={handleAffirmationDeleted}
                    />

                    {/* development modals */}
                    <CreateDevelopmentModal
                        isOpen={showCreateDevelopmentModal}
                        onClose={handleCloseModals}
                        onSuccess={handleDevelopmentCreated}
                    />
                    <ShowDevelopmentModal
                        isOpen={showShowDevelopmentModal}
                        onClose={handleCloseModals}
                        development={selectedDevelopment}
                        onDelete={handleDeleteDevelopmentClick}  
                    />
                    <DeleteDevelopmentModal
                        isOpen={showDeleteDevelopmentModal}
                        onClose={handleCloseModals}
                        development={developmentToDelete} 
                        onSuccess={handleDevelopmentDeleted}
                    />
                </main>
            </div>
        </AuthenticatedLayout>
    );
}