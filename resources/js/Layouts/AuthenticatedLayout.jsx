// last updated on 26/03 by mars

import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen">
            <nav>
                <div className="flex justify-between items-center px-4 h-16">
                    <Link href="/dashboard" className="text-3xl">
                        TalkToMe
                    </Link>

                    <div className="flex items-center space-x-4 text-xl">

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                            >
                                                <i className="fa fa-circle-user fa-xl mr-2"></i>
                                                {user.name}
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
