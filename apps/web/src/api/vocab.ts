import {api} from "./client"

export type VocabEntry = {
    id: number;
    definition: string;
    sampleSentence: string;
}

export type Vocab = {
    id: number;
    word: string;
    language: string;
    entries: VocabEntry[];
}

export async function fetchVocab() : Promise<Vocab[]> {
    const res = await api.get("vocab")

    return res.data.data;
}