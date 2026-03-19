import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Welcome() {

    return (
        <>
            <Head title="TalkToMe" />
            <Layout>
                <div className="flex h-[calc(100vh-4rem)] w-full justify-center flex-col items-center gap-y-8">
                    <div className="text-3xl font-fustat-bold leading-12 text-center">
                        <p>Welcome to <span className="text-[#003c66]">TalkToMe</span></p>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <i className="fa fa-4x fa-book-bookmark text-[#003c66]"></i>

                        {/*TalkToMe logo */}
                        <div className="text-[#003c66] font-fustat-extrabold text-5xl">
                            TalkToMe
                        </div>
                    </div>
                    <footer className="py-16 text-center text-sm text-black">
                        Group 30 - Last updated 19/03/26
                    </footer>
                </div>
            </Layout> 
        </>
    );
}
