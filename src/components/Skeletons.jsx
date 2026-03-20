export const VideoGridSkeleton = () => {
    const skeletonCards = Array(10).fill(null);

    return (
        <div className="max-w-600 mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">

            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-48 mb-6" />


            <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 justify-items-center">
                {skeletonCards.map((_, index) => (
                    <div key={index} className="w-full max-w-90">

                        <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl mb-3" />

                        <div className="flex gap-3 px-2">

                            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />

                            <div className="flex-1 space-y-2">

                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />


                                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2 mt-3" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const StreamingSkeleton = () => {
    return (
        <div className="min-h-screen bg-white animate-pulse">

            <div className="h-14 border-b border-gray-100 mb-4" />

            <div className="max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8 p-0 sm:p-4 lg:p-6">

                <div className="lg:col-span-2">

                    <div className="aspect-video bg-gray-200 rounded-xl w-full" />

                    <div className="px-4 sm:px-0 mt-4">

                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-24" />
                                    <div className="h-3 bg-gray-100 rounded w-16" />
                                </div>
                                <div className="ml-2 w-24 h-9 bg-gray-200 rounded-full" />
                            </div>

                            <div className="flex gap-2">
                                <div className="w-20 h-9 bg-gray-100 rounded-full" />
                                <div className="w-20 h-9 bg-gray-100 rounded-full" />
                            </div>
                        </div>


                        <div className="mt-4 p-4 bg-gray-50 rounded-xl h-24" />
                    </div>
                </div>


                <div className="lg:col-span-1 px-4 sm:px-0 hidden lg:block">
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex gap-2">
                                <div className="w-40 h-24 bg-gray-200 rounded-lg shrink-0" />
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
