import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  patchTestimonial,
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
  "bg-blue-300",
  "bg-red-300",
  "bg-neutral-100",
];

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
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

  const fetchTestimonials = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const res = await getTestimonials();
      setTestimonials(res.data);
    } catch (e) {
      console.error(e);
      setError("Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const addTestimonial = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");
    try {
      await createTestimonial({
        name: name.trim(),
        role: role.trim(),
        text: text.trim(),
        rating: Number(rating),
        accent: accent.trim(),
      });

      toast.success("Testimonial added", {
        description: `"${name.trim()}"'s testimonial has been added.`,
      });

      setName("");
      setRole("");
      setText("");
      setRating(5);
      setAccent(DEFAULT_ACCENT);

      await fetchTestimonials();
    } catch (e) {
      console.error(e);
      setError("Failed to add testimonial.");
      toast.error("Failed to add testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditName(t.name || "");
    setEditRole(t.role || "");
    setEditText(t.text || "");
    setEditRating(t.rating || 5);
    setEditAccent(t.accent || DEFAULT_ACCENT);
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
      await patchTestimonial(editingId, {
        name: editName.trim(),
        role: editRole.trim(),
        text: editText.trim(),
        rating: Number(editRating),
        accent: editAccent.trim(),
      });

      toast.success("Testimonial updated");
      cancelEdit();
      await fetchTestimonials();
    } catch (e) {
      console.error(e);
      setError("Failed to update testimonial.");
      toast.error("Failed to update testimonial");
    } finally {
      setPatching(false);
    }
  };

  const removeTestimonial = async (id) => {
    const confirmed = await confirmAction({
      title: "Delete Testimonial?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
    });
    if (!confirmed) return;

    setError("");
    setDeletingId(id);
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted");
      await fetchTestimonials();
    } catch (e) {
      console.error(e);
      setError("Failed to delete testimonial.");
      toast.error("Failed to delete testimonial");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black uppercase mb-6">Testimonials</h1>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700 font-bold">
          {error}
        </div>
      )}

      {/* ADD */}
      <Card className="mb-6" shadowSize="6px" isStatic>
        <h2 className="font-black uppercase mb-4">Add Testimonial</h2>

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
              placeholder="Testimonial text"
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
          onClick={addTestimonial}
          disabled={!canSubmit || submitting}
          variant="black"
          className="mt-4 px-6 py-3"
          isStatic
        >
          {submitting ? "Adding..." : "Add Testimonial"}
        </Button>
      </Card>

      {/* LIST */}
      {loading ? (
        <div className="font-bold text-lg">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((t) => {
            const isEditing = editingId === t.id;

            if (!isEditing) {
              return (
                <Card
                  key={t.id}
                  className={`${t.accent}`}
                  shadowSize="6px"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-sm font-black">
                            {i < t.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <p className="font-bold text-lg leading-relaxed">
                        "{t.text}"
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center text-white font-black text-xs">
                          {t.name?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-black uppercase text-sm">
                            {t.name}
                          </p>
                          <p className="text-xs font-bold opacity-70">
                            {t.role}
                          </p>
                          {t.createdAt ? (
                            <p className="text-[10px] font-bold opacity-60">
                              {new Date(t.createdAt).toLocaleDateString(
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
                        onClick={() => startEdit(t)}
                        disabled={submitting || patching || deletingId != null}
                        variant="white"
                        className="px-3 py-1 text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => removeTestimonial(t.id)}
                        disabled={deletingId === t.id || deletingId != null}
                        variant="white"
                        className="px-3 py-1 text-xs border-red-600 text-red-600"
                      >
                        {deletingId === t.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            }

            return (
              <Card key={t.id} shadowSize="6px" isStatic>
                <h3 className="font-black uppercase mb-4">Edit Testimonial</h3>

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
