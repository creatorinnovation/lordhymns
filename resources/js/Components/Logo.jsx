import {
    Music
} from 'lucide-react';

const Logo = ({color}) => {
    return (
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Music className="w-6 h-6" />
            </div>
            <div>
                <h1 className={`text-xl font-bold ${color} dark:text-white leading-none tracking-tight`}>LORD HYMNS</h1>
                <p className="text-[0.84rem] font-medium tracking-widest text-zinc-500 uppercase">Music Acadamy</p>
            </div>
        </div>
    )
}

export default Logo