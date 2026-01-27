import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';
import MainLayout from '@/Layouts/MainLayout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const Edit = ({ song }) => {

    const { data, setData, put, processing, errors } = useForm(song);

    const [tagInput, setTagInput] = useState('');

    const addTag = () => {
        if (tagInput.trim() !== '') {
            setData('tags', [...data.tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (index) => {
        setData(
            'tags',
            data.tags.filter((_, i) => i !== index)
        );
    };

    const submit = e => {
        e.preventDefault();
        put(route('songs.update', song.id));
    };

    return (
        <MainLayout>
            <AdminDashboardLayout>


                <form
                    onSubmit={submit}
                    className="container mx-auto bg-white p-6 rounded-xl shadow space-y-6"
                >

                    <h2 className="text-xl font-semibold">Add Song</h2>

                    <div className='grid grid-cols-2 gap-2'>

                        <input
                            className="w-full border rounded-lg px-4 py-2"
                            placeholder="English Title"
                            value={data.english_title}
                            onChange={e => setData('english_title', e.target.value)}
                        />
                        {errors.english_title && <p className="text-red-500 text-sm">{errors.english_title}</p>}

                        <input
                            className="w-full border rounded-lg px-4 py-2"
                            placeholder="Hindi Title"
                            value={data.hindi_title}
                            onChange={e => setData('hindi_title', e.target.value)}
                        />

                    </div>

                    <input
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="Artist"
                        value={data.artist}
                        onChange={e => setData('artist', e.target.value)}
                    />

                    <div className='grid grid-cols-2 gap-2'>

                        <textarea
                            className="w-full border rounded-lg px-4 py-2"
                            rows="10"
                            placeholder="English Lyric"
                            value={data.english_lyric}
                            onChange={e => setData('english_lyric', e.target.value)}
                        />

                        <textarea
                            className="w-full border rounded-lg px-4 py-2"
                            rows="10"
                            placeholder="Hindi Lyric"
                            value={data.hindi_lyric}
                            onChange={e => setData('hindi_lyric', e.target.value)}
                        />

                    </div>

                    <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="YouTube Link"
                        value={data.youtube_link}
                        onChange={e => setData('youtube_link', e.target.value)}
                    />

                    {/* Tags */}
                    <div>
                        <label className="block mb-1 font-medium">Tags</label>

                        <div className="flex gap-2">
                            <input
                                className="flex-1 border rounded-lg px-4 py-2"
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                placeholder="Enter tag"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="bg-gray-700 text-white px-4 rounded-lg"
                            >
                                Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {data.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="text-red-500 font-bold"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <select
                        className="w-full border rounded-lg px-4 py-2"
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Deactive</option>
                    </select>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Update
                    </button>
                </form>
            </AdminDashboardLayout>
        </MainLayout>
    )
}

export default Edit