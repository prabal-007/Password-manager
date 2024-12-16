import { useRef, useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Manager = () => {
    const ref = useRef();
    const passRef = useRef();
    const [form, setform] = useState({ site: '', username: '', password: '' })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem('passwords');
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        if (ref.current.src.includes('/icons/eye.png')) {
            ref.current.src = '/icons/hide.png';
            passRef.current.type = 'password';
        } else {
            ref.current.src = '/icons/eye.png';
            passRef.current.type = 'text'
        }
    }

    const savePassword = () => {
        setpasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])
        alert("passware saved");
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('copied', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: "Bounce",
        });
        navigator.clipboard.writeText(text)
    }
    return (
        <>
            <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[900px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgb(255,219,73)] opacity-50 blur-[280px]"></div></div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="myContainer flex flex-col gap-4 pb-4 mt-2 rounded-lg">
                <div className="flex flex-col justify-center items-center p-5">
                    <div className="logo text-3xl font-extrabold">
                        &lt;
                        <span className="text-orange-500">Pass</span><span>OP/</span>
                        &gt;
                    </div>
                    <p className="font-bold">Your onw password manager.</p>
                </div>
                <input name="site" value={form.site} onChange={handleChange} type="text" placeholder="Enter website URL" className="inputField" />
                <div className="flex gap-5">
                    <input name="username" value={form.username} onChange={handleChange} type="text" placeholder="usernemr" className="inputField" />
                    <div className="relative w-full">
                        <input name="password" value={form.password} onChange={handleChange} ref={passRef} type="password" placeholder="password" className="inputField" />
                        <span className="absolute right-0 top-1 p-1 pr-2" onClick={showPassword}>
                            <img src="/icons/hide.png" ref={ref} className="size-4" alt="show" />
                        </span>
                    </div>
                </div>
                <button onClick={savePassword} className="inputField self-center w-fit bg-orange-500 text-white font-bold hover:bg-orange-600 hover:font-semibold">
                    <span className="flex gsp-2 items-center justify-center">
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#000000"
                            className="size-44">
                        </lord-icon>
                        Add Password
                    </span>
                </button>
            </div>
            <div className="myContainer w-[70vw]">
                <h1 className="font-bold text-xl p-5 pt-0">Saved Passwords</h1>
                {passwordArray.length === 0 && <div className="text-center border-2 rounded-2xl bg-white p-5 py-10">No Passwords to show</div>}
                {passwordArray.length != 0 && <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-gray-500 text-center">
                        <thead className="text-xs text-gray-700 uppercase bg-orange-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">Website</th>
                                <th scope="col" className="px-6 py-3">username</th>
                                <th scope="col" className="px-6 py-3">password</th>
                                <th scope="col" className="px-6 pl-0 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((pass) => {
                                return <tr key={pass.username} className="bg-white border-b hover:bg-orange-100">
                                    <td className="px-6 py-4 cursor-pointer"><a href={pass.site} target="_blank">{pass.site}</a></td>
                                    <td className="px-6 py-4"><span className="copyIcon" onClick={() => copyText(pass.username)}>{pass.username}<IoCopyOutline className="cursor-pointer" /></span></td>
                                    <td className="px-6 py-4"><span className="copyIcon" onClick={() => copyText(pass.password)}>{pass.password}<IoCopyOutline className="cursor-pointer" /></span></td>
                                    <td className="px-6 pl-0 py-4 text-right">
                                        <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>}

            </div>
        </>
    )
}
