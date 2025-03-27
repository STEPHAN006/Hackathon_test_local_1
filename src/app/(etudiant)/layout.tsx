import Image from "next/image";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full h-screen">
            <div className="w-1/3 bg-cyan-700 flex items-center flex-col pt-64">
                <div className="mb-10 uppercase w-56 h-56 flex items-center text-9xl font-bold justify-center rounded-full bg-amber-50 text-cyan-700">
                    C
                </div>

                <h1 className="text-amber-50 font-semibold text-7xl">Campus cash</h1>
            </div>
            <main className="flex items-center justify-center w-2/3">
                {children}
            </main>
        </div>
    );
}
