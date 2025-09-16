import NotesClient from "./Notes.client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Tags } from "@/types/note";

interface AppProps {
    params: Promise<{ slug: string[] }>;
};

export default async function App({params}: AppProps) {
    const queryClient = new QueryClient();
    const { slug } = await params;
    const tag: Tags | string | undefined = slug[0] === "All" ? undefined : slug[0];
    

    await queryClient.prefetchQuery({
        queryKey: ["notes", "", 1],
        queryFn: () => fetchNotes("", 1, tag),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={ tag} />
        </HydrationBoundary>
    );
};