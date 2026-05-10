import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  createProject,
  deleteProject,
  getProjects,
  patchProject,
} from "../../lib/api";

const DEFAULT_COLOR = "bg-cyan-300";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

export default function AdminPanel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [submitting, setSubmitting] = useState(false);

  // Edit (patch)
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editColor, setEditColor] = useState(DEFAULT_COLOR);
  const [patching, setPatching] = useState(false);

  // Delete (loading per item)
  const [deletingId, setDeletingId] = useState(null);

  const canSubmit = useMemo(
    () =>
      isNonEmptyString(title) &&
      isNonEmptyString(desc) &&
      isNonEmptyString(color),
    [title, desc, color],
  );

  const canPatch = useMemo(
    () =>
      isNonEmptyString(editTitle) &&
      isNonEmptyString(editDesc) &&
      isNonEmptyString(editColor),
    [editTitle, editDesc, editColor],
  );

  const fetchProjects = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (e) {
      console.error(e);
      setError("Gagal memuat projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await fetchProjects();
      } catch {
        // fetchProjects already handles error state
        if (!cancelled) return;
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProject = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");
    try {
      await createProject({
        title: title.trim(),
        description: desc.trim(),
        color: color.trim(),
      });

      setTitle("");
      setDesc("");
      setColor(DEFAULT_COLOR);

      await fetchProjects();
    } catch (e) {
      console.error(e);
      setError("Gagal menambahkan project.");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditTitle(p.title || "");
    setEditDesc(p.description || "");
    setEditColor(p.color || DEFAULT_COLOR);
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
    setEditColor(DEFAULT_COLOR);
    setError("");
  };

  const savePatch = async () => {
    if (!canPatch || editingId == null) return;

    setPatching(true);
    setError("");
    try {
      await patchProject(editingId, {
        title: editTitle.trim(),
        description: editDesc.trim(),
        color: editColor.trim(),
      });

      cancelEdit();
      await fetchProjects();
    } catch (e) {
      console.error(e);
      setError("Gagal mengubah project.");
    } finally {
      setPatching(false);
    }
  };

  const removeProject = async (id) => {
    const ok = window.confirm("Hapus project ini?");
    if (!ok) return;

    setError("");
    setDeletingId(id);
    try {
      await deleteProject(id);
      await fetchProjects();
    } catch (e) {
      console.error(e);
      setError("Gagal menghapus project.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="bg-[#f5f5f0] min-h-screen pt-24 overflow-hidden">
      <section className="max-w-[1100px] mx-auto px-4 py-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black">ADMIN PANEL</h1>
            <p className="text-sm mt-1">
              Kelola Projects (Create / Edit / Delete)
            </p>
          </div>

          <Link
            to="/"
            className="border-2 border-black bg-white px-4 py-2 text-sm font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-100"
          >
            Back to Home
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        {/* Add */}
        <div className="border bg-white p-4 mb-6">
          <h2 className="font-black text-lg mb-3">Add Project</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border p-2 block"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border p-2 block"
              placeholder="Color (bg-cyan-300)"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <textarea
              className="border p-2 block md:col-span-2"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={addProject}
              disabled={!canSubmit || submitting}
              className="bg-black disabled:bg-gray-500 text-white px-4 py-2"
            >
              {submitting ? "Adding..." : "Add Project"}
            </button>

            <div className="flex items-center gap-2 text-sm">
              <span>Preview:</span>
              <div className={`w-6 h-6 ${color}`} />
            </div>
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-3">
            {projects.map((p) => {
              const isEditing = editingId === p.id;

              if (!isEditing) {
                return (
                  <div key={p.id} className="border bg-white p-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-bold">{p.title}</h2>
                        <p>{p.description}</p>
                        <div className={`w-6 h-6 mt-2 ${p.color}`} />
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          disabled={
                            submitting || patching || deletingId != null
                          }
                          className="border px-3 py-1 disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => removeProject(p.id)}
                          disabled={deletingId === p.id || deletingId != null}
                          className="border px-3 py-1 text-red-600 disabled:opacity-50"
                        >
                          {deletingId === p.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={p.id} className="border bg-white p-3">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="font-black">Edit Project</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span>Preview:</span>
                      <div className={`w-6 h-6 ${editColor}`} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      className="border p-2"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                      className="border p-2"
                      value={editColor}
                      onChange={(e) => setEditColor(e.target.value)}
                    />
                    <textarea
                      className="border p-2 md:col-span-2"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={savePatch}
                      disabled={!canPatch || patching}
                      className="bg-black disabled:bg-gray-500 text-white px-4 py-2"
                    >
                      {patching ? "Saving..." : "Save"}
                    </button>
                    <button onClick={cancelEdit} className="border px-4 py-2">
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
