export interface Note {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tag: string
};

export type Tags = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";