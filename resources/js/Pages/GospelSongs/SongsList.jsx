import MainLayout from '@/Layouts/MainLayout'
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
    Search,
    Heart,
} from 'lucide-react';

const SongsList = ({ songs, filters }) => {

    const [search, setSearch] = useState(filters.search || '');
    const sort = filters.sort || 'english_title';
    const direction = filters.direction || 'asc';

    const toggleSort = () => {
        router.get(
            route('gospel-songs'),
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
        router.get(route('gospel-songs'), { search, sort, direction }, {
            preserveState: true,
            replace: true,
        });
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(route('gospel-songs'), { search }, {
                preserveState: true,
                replace: true,
            });
        }, 100);

        return () => clearTimeout(delay);
    }, [search]);

    const [items, setItems] = useState(songs.data);
    const [nextPageUrl, setNextPageUrl] = useState(songs.next_page_url);
    const loaderRef = useRef(null);
    const loadingRef = useRef(false);

    // 🔄 Reset list on search/sort change
    useEffect(() => {
        setItems(songs.data);
        setNextPageUrl(songs.next_page_url);
    }, [songs]);

    // 👀 Infinite scroll
    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(async ([entry]) => {
            if (
                entry.isIntersecting &&
                nextPageUrl &&
                !loadingRef.current
            ) {
                loadingRef.current = true;

                const response = await axios.get(nextPageUrl, {
                    headers: { Accept: 'application/json' },
                });

                setItems(prev => [...prev, ...response.data.data]);
                setNextPageUrl(response.data.next_page_url);

                loadingRef.current = false;
            }
        });

        observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [nextPageUrl]);


    return (
        <MainLayout>
            <Head title="Gospel Songs" />
            <div className='container mx-auto mt-5 mb-5'>
                <Link href={route('about')} className='py-2 px-3 bg-green-200 rounded-md shadow-md'>Bookmark</Link>
            </div>
            {/* <div className='container mx-auto pt-42 pb-5'>
                <p><Link href="" className='py-2 px-3 border rounded cursor-pointer'>Songs</Link> | <Link to="/bookmark" className='py-2 px-3 border rounded cursor-pointer'>Bookmark</Link></p>
            </div> */}

            <div className='container mx-auto mb-5'>
                {/* Search + Sort */}
                <div className="flex flex-col justify-between md:flex-row gap-3 items-start md:items-center">

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
            </div>
            <div className='container mx-auto'>
                {
                    items.map(song => (
                        <Link href={route('gospelsong.detail', song.id)}>
                            <div className='py-5 px-2 mb-2 shadow-md border hover:bg-gray-100'>{song.english_title}</div>
                        </Link>
                    ))
                }
            </div>

            {/* LOADER */}
            {nextPageUrl && (
                <div
                    ref={loaderRef}
                    className="text-center py-6 text-gray-500"
                >
                    Loading more...
                </div>
            )}

            {!nextPageUrl && (
                <p className="text-center text-gray-400 py-4">
                    No more records
                </p>
            )}

        </MainLayout>
    )
}

export default SongsList