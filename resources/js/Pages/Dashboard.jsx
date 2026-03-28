// last updated on 28/03 by valeria

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
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

                            <Link
                                href={route('dashboard')}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200"
                            >
                                <img src="/imgs/journal.png" alt="Journals" className="w-7 h-7"/>
                                Journals
                            </Link>

                            <Link
                                href="#" //# need to add route for positive wall
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200"
                            >
                                <img src="/imgs/add.png" alt="Positive Wall" className="w-7 h-7"/>
                                Positive Wall
                            </Link>

                            <Link
                                href="#" // need to add route for growth notes
                                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200"
                            >
                                <img src="/imgs/sticky-note.png" alt="Growth Notes" className="w-7 h-7"/>
                                Growth Notes
                            </Link>
                        </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                         <div>
                            <h1 className="text-3xl font-bold">Welcome Back, Name</h1> {/* need to add user name */}
                            <p className='mb-2 text-xl mt-2 text-gray-600'>
                                How are you feeling today?
                            </p>
                        </div>
                        <div className="overflow-hidden bg-gray-100 shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                You're logged in! This is the dashboard!! :3
                            </div>
                        </div>
                    </div>
                </main>
                
            </div>
        </AuthenticatedLayout>
    );
}
