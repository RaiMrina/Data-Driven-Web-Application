"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Page = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [csvDataList, setCsvDataList] = useState([]); // Add csvDataList state
    const router = useRouter();
    const subscrptionPrice = (CreditLines, CreditScore) => {
        const BasePrice = 100;
        const PricePerCreditLine = 10;
        const PricePerCreditScorePoint = 10;
        const SubscriptionPrice = BasePrice + PricePerCreditLine * CreditLines + PricePerCreditScorePoint * CreditScore;
        return SubscriptionPrice;
    };
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const userJson = localStorage.getItem("supersix-user");
            if (!userJson) {
                router.push("/");
                setLoading(false);
            } else {
                const parsedUser = JSON.parse(userJson);
                setUser(parsedUser);
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    useEffect(() => {
        setLoading(true);
        if (!user) return; // Wait until user is set

        const fetchAllFiles = async () => {
            const data = localStorage.getItem("supersix-data");
            const parsedData = JSON.parse(data); // Parse the data from local storage
            await setCsvDataList(parsedData); // Set csvDataList state with parsed data
            setLoading(false);
        };
        fetchAllFiles();
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <ul role="list" className="divide-y divide-gray-100 w-[80%] mx-auto">
                {csvDataList?.map((item) => (
                    <li key={item.Email} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{item.Name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.Email}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{"Subscription Price:" + subscrptionPrice(item.CreditLines, item.CreditScore)}</p>

                            <p className="mt-1 text-xs leading-5 text-gray-500">{item.MaskedPhoneNumber}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Page;
