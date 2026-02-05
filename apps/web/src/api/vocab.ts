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

export type VocabUpdate = {
    word: string;
    language: string;
}

export async function getVocabList() : Promise<Vocab[]> {
    const res = await api.get("/vocab")

    return res.data.data;
}

export async function getVocabById(id: number) : Promise<Vocab> {
    const res = await api.get(`/vocab/${id}`)

    return res.data.data;
}

export async function updateVocabById(id: number, payload: VocabUpdate) : Promise<Vocab> {
    const res = await api.put(`/vocab/${id}`, payload)

    return res.data.data
}

export async function deleteVocabById(id: number) : Promise<void> {
    await api.delete(`/vocab/${id}`)
}