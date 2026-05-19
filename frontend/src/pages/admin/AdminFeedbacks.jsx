import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  createFeedback,
  deleteFeedback,
  getFeedbacks,
  patchFeedback,
} from "../../lib/api";
import { confirmAction } from "../../lib/confirm";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

const DEFAULT_ACCENT = "bg-cyan-300";
const ACCENT_OPTIONS = [
  "bg-cyan-300",
  "bg-yellow-300",
  "bg-pink-300",
  "bg-green-300",
  "bg-purple-300",
  "bg-blue-400",
  "bg-red-300",
  "bg-neutral-100",
];

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [accent, setAccent] = useState(DEFAULT_ACCENT);
  const [submitting, setSubmitting] = useState(false);

  // Edit
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editAccent, setEditAccent] = useState(DEFAULT_ACCENT);
  const [patching, setPatching] = useState(false);

  // Delete
  const [deletingId, setDeletingId] = useState(null);

  const canSubmit = useMemo(
    () =>
      isNonEmptyString(name) &&
      isNonEmptyString(role) &&
      isNonEmptyString(text),
    [name, role, text],
  );

  const canPatch = useMemo(
    () =>
      isNonEmptyString(editName) &&
      isNonEmptyString(editRole) &&
      isNonEmptyString(editText),
    [editName, editRole, editText],
  );

  const fetchFeedbacks = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const res = await getFeedbacks();
      setFeedbacks(res.data);
    } catch (e) {
      console.error(e);
      setError("Failed to load feedbacks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const addFeedback = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");
    try {
      await createFeedback({
        name: name.trim(),
        role: role.trim(),
        text: text.trim(),
        rating: Number(rating),
        accent: accent.trim(),
      });

      toast.success("Feedback added", {
        description: `"${name.trim()}"'s feedback has been added.`,
      });

      setName("");
      setRole("");
      setText("");
      setRating(5);
      setAccent(DEFAULT_ACCENT);

      await fetchFeedbacks();
    } catch (e) {
      console.error(e);
      setError("Failed to add feedback.");
      toast.error("Failed to add feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (f) => {
    setEditingId(f.id);
    setEditName(f.name || "");
    setEditRole(f.role || "");
    setEditText(f.text || "");
    setEditRating(f.rating || 5);
    setEditAccent(f.accent || DEFAULT_ACCENT);
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditRole("");
    setEditText("");
    setEditRating(5);
    setEditAccent(DEFAULT_ACCENT);
    setError("");
  };

  const savePatch = async () => {
    if (!canPatch || editingId == null) return;

    setPatching(true);
    setError("");
    try {
      await patchFeedback(editingId, {
        name: editName.trim(),
        role: editRole.trim(),
        text: editText.trim(),
        rating: Number(editRating),
        accent: editAccent.trim(),
      });

      toast.success("Feedback updated");
      cancelEdit();
      await fetchFeedbacks();
    } catch (e) {
      console.error(e);
      setError("Failed to update feedback.");
      toast.error("Failed to update feedback");
    } finally {
      setPatching(false);
    }
  };

  const removeFeedback = async (id) => {
    const confirmed = await confirmAction({
      title: "Delete Feedback?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
    });
    if (!confirmed) return;

    setError("");
    setDeletingId(id);
    try {
      await deleteFeedback(id);
      toast.success("Feedback deleted");
      await fetchFeedbacks();
    } catch (e) {
      console.error(e);
      setError("Failed to delete feedback.");
      toast.error("Failed to delete feedback");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black uppercase mb-6">Feedbacks</h1>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700 font-bold">
          {error}
        </div>
      )}

      {/* ADD */}
      <Card className="mb-6" shadowSize="6px" isStatic>
        <h2 className="font-black uppercase mb-4">Add Feedback</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border-2 border-black p-2 font-bold"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border-2 border-black p-2 font-bold"
            placeholder="Role (e.g. Founder, StartupX)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <div className="md:col-span-2">
            <textarea
              className="border-2 border-black p-2 w-full font-bold"
              placeholder="Feedback text"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div>
            <p className="font-bold text-sm mb-1">Rating (1-5)</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRating(r)}
                  className={`w-10 h-10 border-2 border-black text-lg font-black transition-all ${
                    rating >= r ? "bg-yellow-300" : "bg-white"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold text-sm mb-1">Accent Color</p>
            <div className="flex gap-1 flex-wrap">
              {ACCENT_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setAccent(c)}
                  className={`w-8 h-8 border-2 border-black ${c} ${
                    accent === c ? "ring-2 ring-black scale-110" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={addFeedback}
          disabled={!canSubmit || submitting}
          variant="black"
          className="mt-4 px-6 py-3"
          isStatic
        >
          {submitting ? "Adding..." : "Add Feedback"}
        </Button>
      </Card>

      {/* LIST */}
      {loading ? (
        <div className="font-bold text-lg">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {feedbacks.map((f) => {
            const isEditing = editingId === f.id;

            if (!isEditing) {
              return (
                <Card key={f.id} className={`${f.accent}`} shadowSize="6px">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-sm font-black">
                            {i < f.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <p className="font-bold text-lg leading-relaxed">
                        "{f.text}"
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center text-white font-black text-xs">
                          {f.name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-black uppercase text-sm">
                            {f.name}
                          </p>
                          <p className="text-xs font-bold opacity-70">
                            {f.role}
                          </p>
                          {f.createdAt ? (
                            <p className="text-[10px] font-bold opacity-60">
                              {new Date(f.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                },
                              )}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      <Button
                        onClick={() => startEdit(f)}
                        disabled={submitting || patching || deletingId != null}
                        variant="white"
                        className="px-3 py-1 text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => removeFeedback(f.id)}
                        disabled={deletingId === f.id || deletingId != null}
                        variant="white"
                        className="px-3 py-1 text-xs border-red-300 text-red-700"
                      >
                        {deletingId === f.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            }

            return (
              <Card key={f.id} shadowSize="6px" isStatic>
                <h3 className="font-black uppercase mb-4">Edit Feedback</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="border-2 border-black p-2 font-bold"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    className="border-2 border-black p-2 font-bold"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                  />
                  <textarea
                    className="border-2 border-black p-2 w-full font-bold md:col-span-2"
                    rows={3}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />

                  <div>
                    <p className="font-bold text-sm mb-1">Rating</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setEditRating(r)}
                          className={`w-10 h-10 border-2 border-black text-lg font-black transition-all ${
                            editRating >= r ? "bg-yellow-300" : "bg-white"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-sm mb-1">Accent</p>
                    <div className="flex gap-1 flex-wrap">
                      {ACCENT_OPTIONS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setEditAccent(c)}
                          className={`w-8 h-8 border-2 border-black ${c} ${
                            editAccent === c
                              ? "ring-2 ring-black scale-110"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={savePatch}
                    disabled={!canPatch || patching}
                    variant="black"
                    className="px-6 py-3"
                    isStatic
                  >
                    {patching ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    onClick={cancelEdit}
                    variant="white"
                    className="px-6 py-3"
                    isStatic
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
