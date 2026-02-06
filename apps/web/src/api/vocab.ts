import {api} from "./client"

export type Vocab = {
    id: number;
    word: string;
    language: string;
    note: string;
}

export type VocabUpdate = {
    word: string;
    language: string;
    note: string;
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

export async function addVocab(payload: VocabUpdate) : Promise<Vocab> {
    const res = await api.post("/vocab", payload)
    return res.data.data
}

export async function deleteVocabById(id: number) : Promise<void> {
    await api.delete(`/vocab/${id}`)
}