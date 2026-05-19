import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getStats,
  createStat,
  patchStat,
  deleteStat,
  getProjects,
} from "../../lib/api";
import { confirmAction } from "../../lib/confirm";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { FiLayers, FiDroplet } from "react-icons/fi";

const SUGGESTED_LABELS = [
  "Years Experience",
  "Happy Clients",
  "Satisfaction",
  "Technologies",
  "Awards",
];

const ACCENT_COLORS = [
  { name: "Cyan", hex: "#67e8f9" },
  { name: "Pink", hex: "#f9a8d4" },
  { name: "Yellow", hex: "#fde047" },
  { name: "Green", hex: "#86efac" },
  { name: "Purple", hex: "#d8b4fe" },
  { name: "Orange", hex: "#fdba74" },
  { name: "Lime", hex: "#bef264" },
  { name: "White", hex: "#ffffff" },
];

export default function AdminStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [projectCount, setProjectCount] = useState(null);

  // Add
  const [num, setNum] = useState("");
  const [label, setLabel] = useState("");
  const [order, setOrder] = useState("");
  const [accent, setAccent] = useState("#67e8f9");
  const [submitting, setSubmitting] = useState(false);

  // Edit
  const [editingId, setEditingId] = useState(null);
  const [editNum, setEditNum] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [editOrder, setEditOrder] = useState("");
  const [editAccent, setEditAccent] = useState("#67e8f9");
  const [saving, setSaving] = useState(false);

  // Delete
  const [deletingId, setDeletingId] = useState(null);

  const fetchStats = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const [statsRes, projectsRes] = await Promise.all([
        getStats(),
        getProjects(),
      ]);
      setStats(statsRes.data);
      setProjectCount(projectsRes.data?.length ?? 0);
    } catch (e) {
      console.error(e);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleAdd = async () => {
    if (!num.trim() || !label.trim()) {
      toast.error("Value and Label are required");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await createStat({
        num: num.trim(),
        label: label.trim(),
        order: order !== "" ? Number(order) : stats.length,
        accent,
      });

      toast.success(`"${label}" stat added!`);
      setNum("");
      setLabel("");
      setOrder("");
      setAccent("#67e8f9");

      await fetchStats();
    } catch (e) {
      console.error(e);
      setError("Failed to add stat");
      toast.error("Failed to add stat");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (s) => {
    setEditingId(s.id);
    setEditNum(s.num || "");
    setEditLabel(s.label || "");
    setEditOrder(s.order ?? "");
    setEditAccent(s.accent || "#67e8f9");
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNum("");
    setEditLabel("");
    setEditOrder("");
    setEditAccent("#67e8f9");
    setError("");
  };

  const handleSave = async () => {
    if (!editNum.trim() || !editLabel.trim()) {
      toast.error("Value and Label are required");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const payload = {
        num: editNum.trim(),
        label: editLabel.trim(),
        order: editOrder !== "" ? Number(editOrder) : undefined,
        accent: editAccent,
      };

      if (payload.order === undefined) delete payload.order;

      await patchStat(editingId, payload);

      toast.success("Stat updated");
      cancelEdit();
      await fetchStats();
    } catch (e) {
      console.error(e);
      setError("Failed to update stat");
      toast.error("Failed to update stat");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, labelName) => {
    const confirmed = await confirmAction({
      title: "Delete Stat?",
      description: `Remove "${labelName}" from the stats section?`,
      confirmLabel: "Delete",
    });
    if (!confirmed) return;

    setError("");
    setDeletingId(id);
    try {
      await deleteStat(id);
      toast.success("Stat deleted");
      await fetchStats();
    } catch (e) {
      console.error(e);
      setError("Failed to delete stat");
      toast.error("Failed to delete stat");
    } finally {
      setDeletingId(null);
    }
  };

  const renderColorPicker = (current, onChange) => (
    <div className="flex gap-1.5 flex-wrap">
      {ACCENT_COLORS.map((c) => (
        <button
          key={c.hex}
          type="button"
          onClick={() => onChange(c.hex)}
          className={`w-8 h-8 border-2 border-black transition-transform hover:scale-110 ${
            current === c.hex
              ? "ring-2 ring-offset-1 ring-black scale-110"
              : "opacity-70"
          }`}
          style={{ backgroundColor: c.hex }}
          title={c.name}
        />
      ))}
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-black uppercase mb-2">Stats Management</h1>
      <p className="text-sm font-bold opacity-50 mb-6">
        Manage the statistics shown on the homepage stats section.
      </p>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700 font-bold">
          {error}
        </div>
      )}

      {/* Auto-calculated Projects info */}
      <Card
        className="mb-6 border-4 border-black"
        isStatic
        shadowSize="6px"
        style={{ backgroundColor: "#facc15" }}
      >
        <div className="flex items-start gap-3">
          <FiLayers className="text-2xl shrink-0 mt-0.5" />
          <div>
            <p className="font-black uppercase text-sm">
              Projects Count — Auto Calculated
            </p>
            <p className="text-sm font-bold mt-1 opacity-70">
              The <span className="font-black opacity-100">"Projects"</span>{" "}
              stat card is automatically counted from your Projects database.
              Currently:{" "}
              <span className="font-black opacity-100">
                {projectCount === null
                  ? "Loading..."
                  : `${projectCount} projects`}
              </span>
              .
            </p>
          </div>
        </div>
      </Card>

      {/* Add form */}
      <Card className="mb-8" isStatic shadowSize="8px">
        <h2 className="font-black uppercase mb-4">Add New Stat</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase opacity-50">
              Value
            </label>
            <input
              className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:ring-4 focus:ring-cyan-400"
              placeholder="e.g. 5+"
              value={num}
              onChange={(e) => setNum(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase opacity-50">
              Label
            </label>
            <input
              className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:ring-4 focus:ring-cyan-400"
              placeholder="e.g. Years Experience"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <div className="flex gap-1 flex-wrap mt-1">
              {SUGGESTED_LABELS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setLabel(s)}
                  className="text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black bg-white hover:bg-yellow-300 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase opacity-50">
              Order
            </label>
            <input
              type="number"
              className="w-full border-4 border-black p-2 font-bold focus:outline-none focus:ring-4 focus:ring-cyan-400"
              placeholder="0"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase opacity-50 flex items-center gap-1">
              <FiDroplet /> Accent Color
            </label>
            {renderColorPicker(accent, setAccent)}
          </div>
        </div>
        <Button
          onClick={handleAdd}
          disabled={submitting || !num.trim() || !label.trim()}
          variant="black"
          className="mt-6 px-8"
        >
          {submitting ? "Adding..." : "Add Stat"}
        </Button>
      </Card>

      {/* Stats list */}
      <div className="grid gap-4">
        {loading ? (
          <p className="font-bold opacity-50">Loading stats...</p>
        ) : stats.length === 0 ? (
          <Card isStatic className="border-dashed text-center py-8">
            <p className="font-black uppercase opacity-40">
              No manual stats yet.
            </p>
          </Card>
        ) : (
          stats.map((s) =>
            editingId === s.id ? (
              <Card
                key={s.id}
                shadowSize="4px"
                isStatic
                className="border-4 border-black"
                style={{ backgroundColor: "#f0f9ff" }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <input
                    className="border-4 border-black p-2 font-bold"
                    value={editNum}
                    onChange={(e) => setEditNum(e.target.value)}
                    placeholder="Value"
                  />
                  <input
                    className="border-4 border-black p-2 font-bold"
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    placeholder="Label"
                  />
                  <input
                    type="number"
                    className="border-4 border-black p-2 font-bold"
                    value={editOrder}
                    onChange={(e) => setEditOrder(e.target.value)}
                    placeholder="Order"
                  />
                  <div className="space-y-2">
                    {renderColorPicker(editAccent, setEditAccent)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    variant="black"
                    className="px-6"
                  >
                    {saving ? "Saving..." : "Save"}
                  </Button>
                  <Button onClick={cancelEdit} variant="white" className="px-6">
                    Cancel
                  </Button>
                </div>
              </Card>
            ) : (
              <Card
                key={s.id}
                shadowSize="4px"
                className="border-4 border-black"
                style={{ backgroundColor: s.accent || "#ffffff" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black">{s.num}</span>
                    <span className="font-black uppercase text-sm opacity-60">
                      {s.label}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 bg-black text-white uppercase">
                      Order: {s.order}
                    </span>
                    <span
                      className="w-5 h-5 border-2 border-black inline-block"
                      style={{ backgroundColor: s.accent || "#ffffff" }}
                      title={s.accent}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => startEdit(s)}
                      disabled={submitting || saving || deletingId != null}
                      variant="white"
                      className="px-4 py-2 text-xs"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(s.id, s.label)}
                      disabled={deletingId === s.id || deletingId != null}
                      variant="white"
                      className="px-4 py-2 text-xs text-red-700 border-red-300 bg-red-50"
                    >
                      {deletingId === s.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </Card>
            ),
          )
        )}
      </div>
    </div>
  );
}
