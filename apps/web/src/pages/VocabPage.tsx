import {useState} from "react"

import {useAsync} from "../hooks/useAsync"

import {fetchVocab, type Vocab} from "../api/vocab"

export default function VocabPage() {
    const getVocab = useAsync(fetchVocab)

    const [vocab, setVocab] = useState<Vocab[]>([])

    async function onClick() {
        try {
            const vocabs = await getVocab.run()
            setVocab(vocabs)
        } catch(e) {}
    }

    if (getVocab.error !== "") {
        return (
            <>
                <div>Error: {getVocab.error}</div>
                <button onClick={onClick}>click me</button>
            </>
        )
    }

    if (vocab.length === 0) {
        return (
            <div>
                you have no vocabs yet
                <button onClick={onClick}>click me</button>
            </div>
        )
    }

    return (
        <>
        <div>Hello World</div>
        <button onClick={onClick}>click me</button>
        <div>
            {vocab.map((v) => (
                <div key={v.id}>
                    <div>
                        {v.word} + {v.language}
                    </div>


                    {v.entries.length === 0 ? (<div>No entries</div>) : 
                        (
                            <ul>
                                {v.entries.map((e) => (
                                    <li key={e.id}>
                                        <div>Definiton: {e.definition}</div>
                                        <div>Sample: {e.sampleSentence}</div>
                                    </li>
                                ))}
                            </ul>
                        )
                    
                    
                    }
                </div>
            ))}

        </div>
        </>
    )
}