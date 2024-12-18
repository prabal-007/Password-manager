
export const Footer = () => {
    return (
        <div className="bottom-0 w-full bg-slate-800 p-4 text-white flex flex-col items-center">
            <a href="/">
                <div className="logo text-xl font-bold">
                    &lt;
                    <span className="text-orange-500 font-serif">Pass</span><span className="font-mono">Manager/</span>
                    &gt;
                </div>
            </a>
            <span className="flex">
                <p>Made with</p>
                <img src="/icons/heart.png" className="size-6" alt="love" />
                <p>by <a href="https://imstark.xyz/" target="_blank" rel="noopener noreferrer" className="hover:underline text-orange-400">Prabal</a></p>
            </span>
        </div>
    )
}
