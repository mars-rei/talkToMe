// last updated on 25/03 by mars

import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen">
            <nav>
                <div className="flex justify-between items-center px-4 h-16">
                    <Link href="/" className="text-3xl">
                        TalkToMe
                    </Link>

                    <div className="flex items-center space-x-4 text-xl">
                        <Link href="/login">Log in</Link>
                        <Link href="/register">Register</Link>
                    </div>
                </div>
            </nav>

            <main>
                {children}
            </main>
        </div>
    );
}
