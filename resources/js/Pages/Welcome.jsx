// last updated on 09/04 by mars

import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome() {

    return (
        <>
            <Head title="TalkToMe" />
            <Layout>
                <div className="flex h-[calc(100vh-4rem)] w-full justify-center flex-col items-center gap-y-8">
                    <div className="text-3xl leading-12 text-center">
                        <p>Welcome to</p>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <i className="fa fa-4x fa-book-bookmark"></i>

                        {/*TalkToMe logo */}
                        <div className="text-5xl">
                            TalkToMe
                        </div>
                    </div>
                    <footer className="py-16 text-center">
                        <p className="text-2xl font-semibold pb-4">Group 30</p>

                        <p className="text-md">Valeria Bassan • Imogen Dicen • Serina Hunjan</p>
                        <p className="text-md">Jasmine Kaur • Seehem Mosaid • Disha Sharma</p>
                    </footer>
                </div>
            </Layout> 
        </>
    );
}
