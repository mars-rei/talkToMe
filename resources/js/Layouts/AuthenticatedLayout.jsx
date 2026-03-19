import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen">
            <nav>
                <div className="bg-[#ebfff2] flex justify-between items-center px-4 border-b border-[#c6c6c6] h-16">
                    <Link href="/dashboard" className="text-[#003c66] hover:text-[#B5446E] font-fustat-extrabold text-3xl">
                        TalkToMe
                    </Link>

                    <div className="flex items-center text-[#1f1f1f] space-x-4 font-fustat-bold text-xl">

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="hover:text-[#B5446E]"
                                            >
                                                <i className="fa fa-circle-user text-[#B5446E] fa-xl mr-2"></i>
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
