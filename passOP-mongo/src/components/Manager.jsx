import { useRef, useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


export const Manager = () => {
    const ref = useRef();
    const passRef = useRef();
    const [form, setform] = useState({ site: '', username: '', password: '' })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
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

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
            let res = await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            setform({ site: '', username: '', password: '' })
            toast("password saved");
        } else {
            toast("Error : fill all fields");
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Are you sure?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-type": "application/json" }, body: JSON.stringify({ id }) })
            toast("password deleted!")
        }
    }

    const editPassword = (id) => {
        setform({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
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
        <div className="min-h-[82.2vh]">
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
            <div className="myContainer w-auto md:w-[60vw] flex flex-col gap-4 pb-4 pt-2 mt-2 rounded-lg">
                <div className="flex flex-col justify-center items-center p-5">
                    <div className="logo text-3xl font-extrabold">
                        &lt;
                        <span className="text-orange-500 font-serif">Pass</span><span className="font-mono">Manager/</span>
                        &gt;
                    </div>
                    <p className="font-semibold text-slate-800 text-xs text-center">Your Personal Password Manager</p>
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
                <label htmlFor="" className="text-xs font-mono text-gray-600">*All fields required with minimum length 3!</label>
                <button onClick={savePassword} className="inputField self-center w-fit bg-orange-500 text-white font-bold hover:bg-orange-600 hover:font-semibold">
                    <span className="flex gsp-2 items-center justify-center">
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#000000"
                            className="size-10">
                        </lord-icon>
                        <span>Save Password</span>
                    </span>
                </button>
            </div>
            <div className="myContainer w-full p-4 md:w-[70vw]">
                <h1 className="font-bold text-xl p-5 pt-0">Saved Passwords</h1>
                {passwordArray.length === 0 && <div className="text-center border-2 rounded-2xl bg-white p-5 py-10">No Passwords to show</div>}
                {passwordArray.length != 0 && <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-gray-500 text-center">
                        <thead className="text-xs text-gray-700 uppercase bg-orange-300">
                            <tr>
                                <th scope="col" className="px-2 md:px-6 py-3">Website</th>
                                <th scope="col" className="px-2 md:px-6 py-3">username</th>
                                <th scope="col" className="px-2 md:px-6 py-3">password</th>
                                <th scope="col" className="px-2 md:px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((pass) => {
                                return <tr key={pass.id} className="bg-white border-b hover:bg-orange-100">
                                    <td className="px-2 md:px-6 py-4 cursor-pointer"><a href={pass.site} target="_blank">{pass.site}</a></td>
                                    <td className="px-2 md:px-6 py-4"><span className="copyIcon" onClick={() => copyText(pass.username)}>{pass.username}<IoCopyOutline className="cursor-pointer" /></span></td>
                                    <td className="px-2 md:px-6 py-4"><span className="copyIcon" onClick={() => copyText(pass.password)}>{"*".repeat(pass.password.length)}<IoCopyOutline className="cursor-pointer" /></span></td>
                                    <td className="px-2 md:px-6 pl-0 py-4 flex justify-center items-center gap-2">
                                        <span className="edit" onClick={() => editPassword(pass.id)}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/fikcyfpp.json"
                                                alt="edit"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#e86830,secondary:#e86830"
                                                style={{ "width": "20px", "height": "20px" }}
                                            >
                                            </lord-icon>
                                        </span>
                                        <span className="delete" onClick={() => deletePassword(pass.id)}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                                alt="edit"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#e86830,secondary:#e86830"
                                                style={{ "width": "20px", "height": "20px" }}
                                            >
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>}

            </div>
        </div>
    )
}
