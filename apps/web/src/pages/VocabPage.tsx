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


import {signOut} from "../api/auth"
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VocabPage() {
  const { user, setUser} = useAuth();

  const navigate = useNavigate()

  const listReq = useAsync(getVocabList);
  const updateReq = useAsync(updateVocabById);
  const deleteReq = useAsync(deleteVocabById);
  const getByIdReq = useAsync(getVocabById);
  const addReq = useAsync(addVocab)
  const signOutReq = useAsync(signOut)

  const [vocabs, setVocabs] = useState<Vocab[]>([]);

  const [wordQuery, setWordQuery] = useState("");
  const [languageQuery, setLanguageQuery] = useState("")

  const [selectedId, setSelectedId] = useState<number | null>(null);

  
  const [editWord, setEditWord] = useState("");
  const [editLanguage, setEditLanguage] = useState("");
  const [editNote, setEditNote] = useState("")

  
  const [newWord, setNewWord] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newNote, setNewNote] = useState("")

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
    setEditNote(v.note)
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

    const payload: VocabUpdate = { word: editWord, language: editLanguage, note: editNote};
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
    setEditNote("")
  }

  async function onAdd() {
    const created = await addReq.run({word: newWord, language: newLanguage, note: newNote})
    setVocabs((prev) => [created,...prev])
    setNewWord("")
    setNewLanguage("")
    setNewNote("")
  }

  async function logOut() {
    try{
      await signOutReq.run()
    } catch(e) {

    } finally {
      setUser(null)
      navigate("/signin")
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] py-6 px-4">
      <div className="w-full flex flex-col items-center gap-4">
        <div className="sticky z-50 w-full bg-[var(--bar-bg)] gap-2
          grid grid-cols-[1fr_1fr_auto] items-end px-2">

          <div className="flex flex-col">
            <label className="text-white font-normal text-base">
              Filter Language:
            </label>
            <input
              className="border rounded bg-gray-100 px-2"
              value={languageQuery}
              onChange={(e) => setLanguageQuery(e.target.value)}
              placeholder="e.g. en, fr"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white font-normal text-base">
              Search word:
            </label>
            <input
              className="border rounded bg-gray-100 px-2 h-6"
              value={wordQuery}
              onChange={(e) => setWordQuery(e.target.value)}
              placeholder="type to filter..."
            />
          </div>
          
          <div className="flex flex-col self-end gap-2">
            <button
              className="border rounded bg-gray-100 px-2 h-6"
              type="button"
              onClick={() => {setWordQuery(""); setLanguageQuery("")}}>
                Clear Filters
            </button>

            <button
              className="border rounded bg-gray-100 px-2 h-6"
              type="button" onClick={() => reload().catch(() => {})} disabled={listReq.loading}>
              {listReq.loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>
      {user && <p className="text-white font-bold text-2xl">
        You are signed in as {user.email}
        </p>}

      {listReq.error && <div>Error: {listReq.error}</div>}

      {/* LIST */}
      <div className="w-full flex flex-col mx-auto max-w-[1000px] gap-3 items-center" >
        <h3 className="text-2xl text-white font-bold">Vocabs</h3>
        {filtered.length === 0 ? (
          <div className="text-base text-white font-semibold">No vocab yet, add some to get started</div>
        ) : (
          filtered.map((v) => (
            <div key={v.id} className="text-white font-semibold text-base">
              <button type="button" onClick={() => onSelect(v.id)}>
                {selectedId === v.id ? "=>" : ""}
                Word: {v.word} | note: {v.note} | language: ({v.language})
              </button>
            </div>
          ))
        )}
      </div>

      {/* UPDATE / DELETE (only when selected) */}
      <div className="flex flex-col gap-1 items-center">
        <h3 className="text-white font-bold text-xl">Selected</h3>

        {selectedId == null ? (
          <div className="text-white">No vocab is selected</div>
        ) : (
          <>
            <div className="flex flex-row">
              <label className="text-white font-normal text-base mr-1 ">Word: </label>
              <input className="border bg-gray-100 rounded px-2" value={editWord} onChange={(e) => setEditWord(e.target.value)} />
            </div>

            <div className="flex flex-row">
              <label className="text-white font-normal text-base mr-1">Language: </label>
              <input className="border bg-gray-100 rounded px-2" value={editLanguage} onChange={(e) => setEditLanguage(e.target.value)} />
            </div>

            <div className="flex flex-row">
              <label className="text-white font-normal text-base mr-1">Note: </label>
              <input className="border bg-gray-100 rounded px-2"value={editNote} onChange={(e) => setEditNote(e.target.value)} />
            </div>

            {updateReq.error && <div>Error: {updateReq.error}</div>}
            {deleteReq.error && <div>Error: {deleteReq.error}</div>}
            {getByIdReq.error && <div>Error: {getByIdReq.error}</div>}


            <div className="flex flex-row gap-2">
              <button
                className="border bg-gray-100 rounded px-1"
                type="button"
                onClick={() => onUpdateSelected().catch(() => {})}
                disabled={updateReq.loading}>
                {updateReq.loading ? "Updating..." : "Update"}
              </button>

              <button
                className="border bg-gray-100 rounded px-1"
                type="button"
                onClick={() => onDeleteSelected().catch(() => {})}
                disabled={deleteReq.loading}>
                {deleteReq.loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-1 items-center">
        <h3
          className="text-white font-bold text-xl">
            Add new vocab
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();   // prevent page refresh
            onAdd().catch(() => {});
          }}
        >
          <div>
            <label className="text-white font-normal text-base">Word: </label>
            <input className="border bg-gray-100 rounded px-2"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white font-normal text-base">Language: </label>
            <input className="border bg-gray-100 rounded px-2"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white font-normal text-base">Note: </label>
            <input className="border bg-gray-100 rounded px-2"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
          </div>

          <button className="rounded border bg-gray-100 px-2" type="submit">
            Add
          </button>
        </form>
        <button
          className="rounded border bg-gray-100 px-2 mt-1"
          type="button"
          onClick={() => logOut().catch(() => {})}
          disabled={signOutReq.loading}>
          Sign out
        </button>
      </div>
      </div>
    </div>
  );
}