import { useEffect, useMemo, useState } from "react";
import { useAsync } from "../hooks/useAsync";
import {
  getVocabList,
  getVocabById,
  updateVocabById,
  deleteVocabById,
  addVocab,
  type Vocab,
  type VocabUpdate,
} from "../api/vocab";
import { useAuth } from "../auth/AuthContext";

export default function VocabPage() {
  const { user } = useAuth();

  const listReq = useAsync(getVocabList);
  const updateReq = useAsync(updateVocabById);
  const deleteReq = useAsync(deleteVocabById);
  const getByIdReq = useAsync(getVocabById);
  const addReq = useAsync(addVocab)


  const [vocabs, setVocabs] = useState<Vocab[]>([]);
  const [wordQuery, setWordQuery] = useState("");
  const [languageQuery, setLanguageQuery] = useState("")


  const [selectedId, setSelectedId] = useState<number | null>(null);

  // form state for update
  const [editWord, setEditWord] = useState("");
  const [editLanguage, setEditLanguage] = useState("");

  // form state for add (placeholder until you add API)
  const [newWord, setNewWord] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  async function reload() {
    const data = await listReq.run();
    setVocabs(data);
  }

  useEffect(() => {
    reload().catch(() => {})
  }, []);

  const filtered = useMemo(() => {
    const a = wordQuery.trim().toLowerCase();
    const b = languageQuery.trim().toLowerCase()
    return vocabs.filter((v) => {
        const matchWord = !a || v.word.toLowerCase().includes(a)
        const matchLanguage = !b || v.language.toLowerCase().includes(b)

        return matchWord && matchLanguage
    })
  }, [vocabs, wordQuery, languageQuery]);

  // when select a vocab, populate edit fields (from list first)
  useEffect(() => {
    if (selectedId == null) return;
    const v = vocabs.find((x) => x.id === selectedId);
    if (!v) return;

    setEditWord(v.word);
    setEditLanguage(v.language);
  }, [selectedId, vocabs]);

  async function onSelect(id: number) {
    setSelectedId(id);

    // Optional: if list is light enough you can skip this.
    // If you want the most up-to-date detail from backend:
    try {
      const full = await getByIdReq.run(id);
      // replace it in list so UI stays consistent
      setVocabs((prev) => prev.map((x) => (x.id === id ? full : x)));
      setEditWord(full.word);
      setEditLanguage(full.language);
    } catch {
      // do nothing; list selection still works
    }
  }

  async function onUpdateSelected() {
    if (selectedId == null) return;

    const payload: VocabUpdate = { word: editWord, language: editLanguage };
    const updated = await updateReq.run(selectedId, payload);

    setVocabs((prev) => prev.map((x) => (x.id === selectedId ? updated : x)));
  }

  async function onDeleteSelected() {
    if (selectedId == null) return;

    await deleteReq.run(selectedId);

    setVocabs((prev) => prev.filter((x) => x.id !== selectedId));
    setSelectedId(null);
    setEditWord("");
    setEditLanguage("");
  }

  async function onAdd() {
    const created = await addReq.run({word: newWord, language: newLanguage})
    setVocabs((prev) => [created,...prev])
    setNewWord("")
    setNewLanguage("")
  }

  return (
    <>
      {user && <h2>You are signed in as {user.email}</h2>}

      {/* SEARCH */}
      <div>
        <label>Filter Language: </label>
        <input
            value={languageQuery}
            onChange={(e) => setLanguageQuery(e.target.value)}
            placeholder="e.g. en, fr"
        />

        <label>Search word: </label>
        <input
          value={wordQuery}
          onChange={(e) => setWordQuery(e.target.value)}
          placeholder="type to filter..."
        />

        <button type="button" onClick={() => {setWordQuery(""); setLanguageQuery("")}
        }> Clear Filters</button>

        <button type="button" onClick={() => reload().catch(() => {})} disabled={listReq.loading}>
          {listReq.loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {listReq.error && <div>Error: {listReq.error}</div>}

      {/* LIST */}
      <div>
        <h3>Vocabs</h3>
        {filtered.length === 0 ? (
          <div>No results</div>
        ) : (
          filtered.map((v) => (
            <div key={v.id}>
              <button type="button" onClick={() => onSelect(v.id)}>
                {selectedId === v.id ? "=>" : ""}
                {v.word} ({v.language})
              </button>
            </div>
          ))
        )}
      </div>

      {/* UPDATE / DELETE (only when selected) */}
      <div>
        <h3>Selected</h3>

        {selectedId == null ? (
          <div>Select a vocab from the list</div>
        ) : (
          <>
            <div>ID: {selectedId}</div>

            <div>
              <label>Word: </label>
              <input value={editWord} onChange={(e) => setEditWord(e.target.value)} />
            </div>

            <div>
              <label>Language: </label>
              <input value={editLanguage} onChange={(e) => setEditLanguage(e.target.value)} />
            </div>

            {updateReq.error && <div>Error: {updateReq.error}</div>}
            {deleteReq.error && <div>Error: {deleteReq.error}</div>}
            {getByIdReq.error && <div>Error: {getByIdReq.error}</div>}

            <button type="button" onClick={() => onUpdateSelected().catch(() => {})} disabled={updateReq.loading}>
              {updateReq.loading ? "Updating..." : "Update"}
            </button>

            <button type="button" onClick={() => onDeleteSelected().catch(() => {})} disabled={deleteReq.loading}>
              {deleteReq.loading ? "Deleting..." : "Delete"}
            </button>
          </>
        )}
      </div>

      {/* ADD */}
      <div>
        <h3>Add new vocab</h3>

        <div>
          <label>Word: </label>
          <input value={newWord} onChange={(e) => setNewWord(e.target.value)} />
        </div>

        <div>
          <label>Language: </label>
          <input value={newLanguage} onChange={(e) => setNewLanguage(e.target.value)} />
        </div>

        <button type="button" onClick={() => onAdd().catch(() => {})}>
          Add
        </button>
      </div>
    </>
  );
}