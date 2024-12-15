import { FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="flex justify-around items-center text-white bg-slate-800 p-4">
            <a href="/">
                <div className="logo text-xl font-bold">
                    &lt;
                    <span className="text-orange-500"> Pass</span><span>OP /</span>
                    &gt;
                </div>
            </a>
            <a
                href="https://github.com/prabal-007/Password-manager.git"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-300">
                <span className="flex gap-2 justify-center items-center">
                    <FaGithub size={28} />
                    <p>Source Code</p>
                </span>
            </a>
        </nav>
    )
}
