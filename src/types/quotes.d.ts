export type Quote = {
    id: number;
    createdAt?: string;
    creator: string;
    game: string;
    originator: string;
    text: string;
};

export type NewQuote = Omit<Quote, "id">;

export type QuoteUpdate = Partial<Omit<Quote, "id">>;

export type WebsocketQuote = { quote: Partial<Omit<Quote, "id"> & { _id: number }> };