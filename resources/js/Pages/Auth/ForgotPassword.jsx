// last updated on 26/03 by mars

import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
                <div className="flex flex-col items-center justify-center w-2/5 space-y-12">
                    <div className="mb-4 w-1/2 space-y-4">
                        <p className="text-md">Forgot your password? No problem.</p> 
                        <p className="text-gray-600 text-sm">Just let us know your email
                        address and we will email you a password reset link that will
                        allow you to choose a new one.</p>
                    </div>

                    <form onSubmit={submit} className="flex flex-col w-1/2 items-center">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="mt-4 flex justify-center w-full">
                            <PrimaryButton className="w-full justify-center" disabled={processing}>
                                Email Password Reset Link
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
                <div className="h-[calc(100vh-4rem)] w-3/5 overflow-hidden">
                    <img src="\imgs\register.jpg" className="object-cover w-full h-full"></img>
                </div>
            </div>
        </GuestLayout>
    );
}
