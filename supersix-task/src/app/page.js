"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(
            "supersix-user",
            JSON.stringify({
                name: name,
                email: email,
            })
        );
        router.push("/upload");
    };
    return (
        <div>
            <header className="bg-white">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <a className="block text-blue-600 font-semibold text-2xl" href="/">
                        Super Six Assignment
                    </a>
                </div>
            </header>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">Enter your name and email to start!</p>

                    <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>

                            <div className="relative">
                                <input
                                    type="name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Name"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>

                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Email"
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="block  w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;
