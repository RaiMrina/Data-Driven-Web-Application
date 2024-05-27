"use client";
import { useState } from "react";
import { FileText, RefreshCw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { storage } from "../../../firebase";
import { toast } from "@/components/ui/use-toast";
import { ref, uploadBytesResumable } from "firebase/storage";
import Papa from "papaparse";
const acceptedFileTypes = ["text/csv"];
export default function Home() {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);
    const fileSize = file ? (file.size / 1024).toFixed(2) + " KB" : "";
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const router = useRouter();
    const getUserData = () => {
        const user = localStorage.getItem("supersix-user");
        return user ? JSON.parse(user) : null;
    };
    const handleButtonClick = async (file) => {
        try {
            setLoading(true);
            const user = getUserData();
            const metadata = {
                contentType: file.type,
            };
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async function (results) {
                    await localStorage.setItem("supersix-data", JSON.stringify(results.data));
                },
            });
            const storageRef = ref(storage, `${user.email}/` + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            uploadTask.on("state_changed", async (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                await setProgress(progress);
                if (progress === 100) {
                    console.log("File uploaded successfully");
                    await toast({
                        title: "Success",
                        description: "File uploaded successfully",
                        variant: "success",
                    });
                    setProgress(100);
                    setIsFileUploaded(true);
                    setLoading(false);
                    setTimeout(() => {
                        router.push("/list");
                    }, 2000);
                }
            });
        } catch (error) {
            console.error("Error uploading file: ", error);
            toast({
                title: "Error",
                description: "Error uploading file",
                variant: "destructive",
            });
            setLoading(false);
        }
    };

    return (
        <main>
            <header className="bg-white">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <a className="block text-blue-600 font-semibold text-2xl" href="/">
                        Super Six Assignment
                    </a>
                </div>
            </header>

            <div className="text-center w-[80%] mx-auto">
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        {loading ? (
                            <RefreshCw className="animate-spin h-12 w-12 text-primary" />
                        ) : isFileUploaded ? (
                            <div className="flex items-center justify-center flex-col">
                                <svg
                                    className="animate-bounce h-20 w-20 border-4 border-primary rounded-full text-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-primary font-semibold text-lg">File Uploaded</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-10 h-10 mb-4 text-primary dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or <strong className="text-primary"> drag</strong> and
                                        <strong className="text-primary"> drop</strong>
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">CSV File Only</p>
                                </div>
                                <input
                                    onChange={(e) => setFile(e.target.files[0])}
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    accept={acceptedFileTypes}
                                />
                            </>
                        )}
                    </label>
                </div>
                {file && (
                    <div className="flex items-center justify-between border-gray-400 border p-2 rounded-lg  mx-auto mt-5 ">
                        <div className="flex gap-2 items-center justify-center">
                            <FileText className="h-12 w-12 text-blue-600" />
                            <div className="text-left">
                                <h2 className="font-semibold">{file.name}</h2>
                                <h2 className="text-gray-400 text-[12px]">
                                    {fileSize} / {file.type}
                                </h2>
                            </div>
                        </div>
                        <X
                            className="h-6 w-6 text-red-600 hover:cursor-pointer hover:rounded-full hover:border-2 hover:border-red-600 "
                            onClick={() => setFile(null)}
                        />
                    </div>
                )}

                {loading && file ? (
                    <div className="bg-gray-400 w-full h-4 mt-3 rounded-full">
                        <div className="bg-primary text-white rounded-full h-4 text-[10px] font-semibold" style={{ width: `${progress}%` }}>
                            {Number(progress).toFixed(0)}%
                        </div>
                    </div>
                ) : (
                    <button
                        disabled={!file}
                        className="p-2 bg-primary text-white w-full sm:w-1/2 md:w-1/4 rounded-full mt-5  disabled:bg-gray-500 disabled:cursor-not-allowed"
                        onClick={() => handleButtonClick(file)}
                    >
                        Upload
                    </button>
                )}
            </div>
        </main>
    );
}
