import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ songs, filters }) {

    const [search, setSearch] = useState(filters.search || '');
    const sort = filters.sort || 'english_title';
    const direction = filters.direction || 'asc';

    const toggleSort = () => {
        router.get(
            route('songs.index'),
            {
                search,
                sort: 'english_title',
                direction: direction === 'asc' ? 'desc' : 'asc',
            },
            { preserveState: true, replace: true }
        );
    };

    const submitSearch = (e) => {
        e.preventDefault();

        router.get(
            route('songs.index'),
            { search },
            { preserveState: true, replace: true }
        );
    };

    // useEffect(() => {
    //     const delay = setTimeout(() => {
    //         router.get(route('songs.index'), { search }, {
    //             preserveState: true,
    //             replace: true,
    //         });
    //     }, 400);

    //     return () => clearTimeout(delay);
    // }, [search]);

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-4">
                <div className="flex justify-between mb-4">
                    <h1 className="text-xl font-semibold">Songs</h1>
                    <Link href={route('songs.create')} className="py-2 px-6 rounded-sm shadow-sm bg-blue-600 hover:bg-blue-500 text-white">Add</Link>
                </div>

                <div class="container mx-auto p-4">

                    {/* Search + Sort */}
                    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">

                        <form onSubmit={submitSearch} className="flex gap-2 w-full md:w-auto">
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search title / artist..."
                                className="border rounded-lg px-4 py-2 w-full md:w-64"
                            />
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                                Search
                            </button>
                        </form>

                        {/* Sort Button */}
                        <button
                            onClick={toggleSort}
                            className="px-4 py-2 border rounded-lg flex items-center gap-2"
                        >
                            Sort A–Z
                            <span className="text-sm text-gray-500">
                                {direction === 'asc' ? '↑' : '↓'}
                            </span>
                        </button>

                    </div>

                    {/* <!-- Desktop / Tablet Table --> */}
                    <div class="hidden md:block overflow-x-auto">
                        <table class="min-w-full border border-gray-200 rounded-lg">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-4 py-2 text-left">Title</th>
                                    <th class="px-4 py-2 text-left">Artist</th>
                                    <th class="px-4 py-2 text-left">Role</th>
                                    <th class="px-4 py-2 text-left">Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.data.map(song => (
                                    <tr class="border-t" key={song.id}>
                                        <td class="px-4 py-2">{song.english_title} <br /> <span className='text-gray-500'>{song.hindi_title}</span></td>
                                        <td class="px-4 py-2">{song.artist}</td>
                                        <td class="px-4 py-2">Admin</td>
                                        <td class="px-4 py-2 text-green-600">
                                            <button
                                                onClick={() => router.patch(route('songs.status', song.id))}
                                                className={`px-3 py-1 rounded text-white ${song.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                                                    }`}
                                            >
                                                {song.status}
                                            </button>
                                        </td>
                                        <td className='flex justify-between items-center'>

                                            <Link href={route('songs.edit', song.id)} className="py-2 px-3 rounded bg-green-700 text-white">
                                                Edit
                                            </Link>

                                            {/* <button
                                                onClick={() => router.delete(route('songs.destroy', song.id))}
                                                className="py-2 px-3 rounded bg-red-700 text-white"
                                            >
                                                Delete
                                            </button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* <!-- Mobile List View --> */}
                    {songs.data.map(song => (
                        <div class="md:hidden space-y-4">
                            <div class="border rounded-lg p-4 shadow-sm">
                                <div class="flex justify-between">
                                    <div>
                                        <p class="font-semibold">{song.english_title}</p>
                                        <p>{song.hindi_title}</p>

                                    </div>
                                    <div className='flex-row'>
                                        <Link href={route('songs.edit', song.id)} className="py-2 px-3 rounded bg-green-700 text-white">
                                            Edit
                                        </Link>
                                        <br />
                                        {/* <button
                                            onClick={() => router.delete(route('songs.destroy', song.id))}
                                            className="py-2 px-3 rounded bg-red-700 text-white"
                                        >
                                            Delete
                                        </button> */}
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>

                {/* Pagination */}
                <div className="flex gap-2">
                    {songs.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || ''}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-600 text-white' : ''
                                }`}
                        />
                    ))}
                </div>




                {/* {songs.data.map(song => (
                    <div key={song.id} className="border p-4 mb-3 rounded">
                        <h2 className="font-semibold">{song.english_title}</h2>
                        <p>{song.artist}</p>

                        <div className="flex gap-3 mt-2">
                            <button
                                onClick={() => router.patch(route('songs.status', song.id))}
                                className={`px-3 py-1 rounded text-white ${song.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                                    }`}
                            >
                                {song.status}
                            </button>

                            <Link href={route('songs.edit', song.id)} className="text-blue-600">
                                Edit
                            </Link>

                            <button
                                onClick={() => router.delete(route('songs.destroy', song.id))}
                                className="text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))} */}
            </div>
        </AuthenticatedLayout>
    );
}
