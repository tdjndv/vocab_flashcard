import {useState} from "react"

import {useAsync} from "../hooks/useAsync"

import {getVocabList, type Vocab} from "../api/vocab"

import {useAuth} from "../auth/AuthContext"

export default function VocabPage() {

    const {user} = useAuth()

    const getVocab = useAsync(getVocabList)

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

    return (
        <>
        {user && <h2>You are signed in as {user.email}</h2>}
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