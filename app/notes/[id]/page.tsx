import NoteDetailsClient from "./NoteDetails.client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

type NoteDetailsProps = {
    params: Promise<{ id: string }>
};

export default async function NoteDetails({ params }: NoteDetailsProps) {
    const queryClient = new QueryClient();
    const { id } = await params;
    
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    }
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
            </HydrationBoundary>
    )
};