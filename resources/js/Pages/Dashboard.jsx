// last updated on 26/03 by mars

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-gray-100 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in! This is the dashboard!! :3
                        </div>
                    </div>
                </div>
            </div>

            {/* 
            you need to add a navbar on the right,, containing the following sections 
            - journals
            - positive wall
            - growth notes
            */}

        </AuthenticatedLayout>
    );
}
