import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function LoginModal({ show, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} title="Login">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <input
                        type="email"
                        className="w-full border rounded p-2"
                        placeholder="Email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        className="w-full border rounded p-2"
                        placeholder="Password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                </div>

                <button
                    disabled={processing}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    {processing ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </Modal>
    );
}
