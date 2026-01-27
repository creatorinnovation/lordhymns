import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function RegisterModal({ show, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} title="Register">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <input
                        className="w-full border rounded p-2"
                        placeholder="Name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <input
                        type="email"
                        className="w-full border rounded p-2"
                        placeholder="Email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        className="w-full border rounded p-2"
                        placeholder="Password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        className="w-full border rounded p-2"
                        placeholder="Confirm Password"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                    />
                </div>

                <button
                    disabled={processing}
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    {processing ? 'Registering...' : 'Register'}
                </button>
            </form>
        </Modal>
    );
}
