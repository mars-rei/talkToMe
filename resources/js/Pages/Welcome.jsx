// last updated on 03/04 by mars

import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome() {

    return (
        <>
            <Head title="TalkToMe" />
            <Layout>
                <div className="flex h-[calc(100vh-4rem)] w-full justify-center flex-col items-center gap-y-8">
                    <div className="text-3xl leading-12 text-center">
                        <p>Welcome to <span>TalkToMe</span></p>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <i className="fa fa-4x fa-book-bookmark"></i>

                        {/*TalkToMe logo */}
                        <div className="text-5xl">
                            TalkToMe
                        </div>
                    </div>
                    <footer className="py-16 text-center text-sm">
                        Group 30 - Last updated 03/04/26 by Mars
                    </footer>
                </div>
            </Layout> 
        </>
    );
}
