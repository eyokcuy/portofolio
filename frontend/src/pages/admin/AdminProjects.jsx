import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  createProject,
  deleteProject,
  getProjects,
  patchProject,
  uploadImage,
} from "../../lib/api";
import { confirmAction } from "../../lib/confirm";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

const DEFAULT_COLOR = "bg-cyan-300";
const COLOR_OPTIONS = [
  { name: "Cyan", value: "bg-cyan-300" },
  { name: "Yellow", value: "bg-yellow-300" },
  { name: "Pink", value: "bg-pink-300" },
  { name: "Green", value: "bg-green-300" },
  { name: "Purple", value: "bg-purple-300" },
  { name: "Blue", value: "bg-blue-400" },
  { name: "Red", value: "bg-red-300" },
  { name: "Neutral", value: "bg-neutral-100" },
  { name: "Orange", value: "bg-orange-300" },
  { name: "Lime", value: "bg-lime-300" },
];

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

const STATUS_OPTIONS = ["Live", "WIP", "Archived", "Beta", "In Progress"];

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [status, setStatus] = useState("Live");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Edit
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editColor, setEditColor] = useState(DEFAULT_COLOR);
  const [editLiveUrl, setEditLiveUrl] = useState("");
  const [editGithubUrl, setEditGithubUrl] = useState("");
  const [editTechStackInput, setEditTechStackInput] = useState("");
  const [editStatus, setEditStatus] = useState("Live");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);
  const [editUploading, setEditUploading] = useState(false);
  const [patching, setPatching] = useState(false);
  const editFileInputRef = useRef(null);

  // Delete
  const [deletingId, setDeletingId] = useState(null);

  const canSubmit = useMemo(
    () => isNonEmptyString(title) && isNonEmptyString(desc),
    [title, desc],
  );

  const canPatch = useMemo(
    () => isNonEmptyString(editTitle) && isNonEmptyString(editDesc),
    [editTitle, editDesc],
  );

  const parseTechStack = (input) =>
    input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleImageSelect = (file, setFile, setUrl) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    setFile(file);
    setUrl(URL.createObjectURL(file));
  };

  const fetchProjects = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (e) {
      console.error(e);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");
    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        const res = await uploadImage(imageFile);
        finalImageUrl = res.data.url;
      }

      await createProject({
        title: title.trim(),
        description: desc.trim(),
        color: color.trim(),
        liveUrl: liveUrl.trim() || undefined,
        githubUrl: githubUrl.trim() || undefined,
        techStack: parseTechStack(techStackInput),
        status,
        imageUrl: finalImageUrl || undefined,
      });

      toast.success("Project created", {
        description: `"${title.trim()}" has been added.`,
      });

      setTitle("");
      setDesc("");
      setColor(DEFAULT_COLOR);
      setLiveUrl("");
      setGithubUrl("");
      setTechStackInput("");
      setStatus("Live");
      setImageUrl("");
      setImageFile(null);

      await fetchProjects();
    } catch (e) {
      console.error(e);
      setError("Failed to add project.");
      toast.error("Failed to add project");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditTitle(p.title || "");
    setEditDesc(p.description || "");
    setEditColor(p.color || DEFAULT_COLOR);
    setEditLiveUrl(p.liveUrl || "");
    setEditGithubUrl(p.githubUrl || "");
    setEditTechStackInput((p.techStack || []).join(", "));
    setEditStatus(p.status || "Live");
    setEditImageUrl(p.imageUrl || "");
    setEditImageFile(null);
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
    setEditColor(DEFAULT_COLOR);
    setEditLiveUrl("");
    setEditGithubUrl("");
    setEditTechStackInput("");
    setEditStatus("Live");
    setEditImageUrl("");
    setEditImageFile(null);
    setError("");
  };

  const savePatch = async () => {
    if (!canPatch || editingId == null) return;

    setPatching(true);
    setError("");
    try {
      let finalEditImageUrl = editImageUrl;
      if (editImageFile) {
        const res = await uploadImage(editImageFile);
        finalEditImageUrl = res.data.url;
      }

      await patchProject(editingId, {
        title: editTitle.trim(),
        description: editDesc.trim(),
        color: editColor.trim(),
        liveUrl: editLiveUrl.trim() || undefined,
        githubUrl: editGithubUrl.trim() || undefined,
        techStack: parseTechStack(editTechStackInput),
        status: editStatus,
        imageUrl: finalEditImageUrl || undefined,
      });

      toast.success("Project updated");
      cancelEdit();
      await fetchProjects();
    } catch (e) {
      console.error(e);
      setError("Failed to update project.");
      toast.error("Failed to update project");
    } finally {
      setPatching(false);
    }
  };

  const removeProject = async (id) => {
    const confirmed = await confirmAction({
      title: "Delete Project?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
    });
    if (!confirmed) return;

    setError("");
    setDeletingId(id);
    try {
      await deleteProject(id);
      toast.success("Project deleted");
      await fetchProjects();
    } catch (e) {
      console.error(e);
      setError("Failed to delete project.");
      toast.error("Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  const renderColorPicker = (current, onChange) => (
    <div className="flex gap-1.5 flex-wrap">
      {COLOR_OPTIONS.map((c) => (
        <button
          key={c.value}
          type="button"
          onClick={() => onChange(c.value)}
          className={`w-8 h-8 border-2 border-black ${c.value} ${
            current === c.value ? "ring-2 ring-black scale-110" : ""
          }`}
          title={c.name}
        />
      ))}
    </div>
  );

  const renderImageUploader = (
    currentUrl,
    file,
    setFile,
    setUrl,
    uploadingState,
    fileInputRefVar,
  ) => (
    <div>
      <p className="font-bold text-sm mb-1">Project Image</p>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => fileInputRefVar.current?.click()}
          className="bg-white border-2 border-black px-3 py-1.5 font-bold uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
        >
          {file || currentUrl ? "Change Image" : "Upload Image"}
        </button>

        {uploadingState && (
          <span className="text-xs font-bold">Uploading...</span>
        )}

        {(currentUrl || file) && (
          <span className="text-xs font-bold opacity-60">
            {file ? file.name : "Image ready"}
          </span>
        )}
      </div>

      <input
        ref={fileInputRefVar}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleImageSelect(f, setFile, setUrl);
        }}
      />

      {(currentUrl || file) && (
        <div className="mt-2 w-24 h-16 border-2 border-black overflow-hidden">
          <img
            src={currentUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-black uppercase mb-6">Projects</h1>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700 font-bold">
          {error}
        </div>
      )}

      {/* ADD */}
      <Card className="mb-6" shadowSize="6px" isStatic>
        <h2 className="font-black uppercase mb-4">Add Project</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border-2 border-black p-2 font-bold"
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>
            <p className="font-bold text-sm mb-1">Color</p>
            {renderColorPicker(color, setColor)}
          </div>

          <textarea
            className="border-2 border-black p-2 w-full font-bold md:col-span-2"
            placeholder="Description *"
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <input
            className="border-2 border-black p-2 font-bold"
            placeholder="Live URL (https://...)"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
          />

          <input
            className="border-2 border-black p-2 font-bold"
            placeholder="GitHub URL (https://...)"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />

          <input
            className="border-2 border-black p-2 font-bold"
            placeholder="Tech Stack (React, Tailwind, Node)"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
          />

          <div>
            <p className="font-bold text-sm mb-1">Status</p>
            <div className="flex gap-1 flex-wrap">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1 border-2 border-black text-xs font-black uppercase ${
                    status === s ? "bg-yellow-300" : "bg-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            {renderImageUploader(
              imageUrl,
              imageFile,
              setImageFile,
              setImageUrl,
              uploading,
              fileInputRef,
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <Button
            onClick={addProject}
            disabled={!canSubmit || submitting || uploading}
            variant="black"
            className="px-6 py-3"
            isStatic
          >
            {submitting ? "Adding..." : "Add Project"}
          </Button>

          <div className="flex items-center gap-2 text-sm font-bold">
            <span>Preview:</span>
            <div className={`w-6 h-6 border border-black ${color}`} />
          </div>
        </div>
      </Card>

      {/* LIST */}
      {loading ? (
        <div className="font-bold text-lg">Loading...</div>
      ) : (
        <div className="grid gap-3">
          {projects.map((p) => {
            const isEditing = editingId === p.id;
            const createdDate = p.createdAt
              ? new Date(p.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "";

            if (!isEditing) {
              return (
                <Card key={p.id} shadowSize="6px">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="font-black uppercase">{p.title}</h2>
                        <span className="text-xs font-bold px-2 py-0.5 border-2 border-black bg-yellow-300 uppercase">
                          {p.status || "Live"}
                        </span>
                      </div>
                      <p className="mt-1 font-bold">{p.description}</p>

                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <div
                          className={`w-5 h-5 border border-black ${p.color}`}
                        />
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-black uppercase text-blue-600 underline"
                          >
                            Live ↗
                          </a>
                        )}
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-black uppercase text-blue-600 underline"
                          >
                            GitHub ↗
                          </a>
                        )}
                      </div>

                      {p.techStack && p.techStack.length > 0 && (
                        <div className="flex gap-1 flex-wrap mt-2">
                          {p.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 border border-black text-xs font-bold bg-[#f5f5f0]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-2">
                        {p.imageUrl && (
                          <div className="w-16 h-10 border-2 border-black overflow-hidden">
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        {createdDate && (
                          <p className="text-xs font-bold opacity-50">
                            Created: {createdDate}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      <Button
                        onClick={() => startEdit(p)}
                        disabled={submitting || patching || deletingId != null}
                        variant="white"
                        className="px-3 py-1 text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => removeProject(p.id)}
                        disabled={deletingId === p.id || deletingId != null}
                        className="px-3 py-1 text-xs border-red-600 text-red-600"
                        variant="white"
                      >
                        {deletingId === p.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            }

            return (
              <Card key={p.id} shadowSize="6px" isStatic>
                <h3 className="font-black uppercase mb-4">Edit Project</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="border-2 border-black p-2 font-bold"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <div>
                    <p className="font-bold text-sm mb-1">Color</p>
                    {renderColorPicker(editColor, setEditColor)}
                  </div>
                  <textarea
                    className="border-2 border-black p-2 w-full font-bold md:col-span-2"
                    rows={3}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />

                  <input
                    className="border-2 border-black p-2 font-bold"
                    placeholder="Live URL"
                    value={editLiveUrl}
                    onChange={(e) => setEditLiveUrl(e.target.value)}
                  />
                  <input
                    className="border-2 border-black p-2 font-bold"
                    placeholder="GitHub URL"
                    value={editGithubUrl}
                    onChange={(e) => setEditGithubUrl(e.target.value)}
                  />
                  <input
                    className="border-2 border-black p-2 font-bold"
                    placeholder="Tech Stack (comma separated)"
                    value={editTechStackInput}
                    onChange={(e) => setEditTechStackInput(e.target.value)}
                  />

                  <div>
                    <p className="font-bold text-sm mb-1">Status</p>
                    <div className="flex gap-1 flex-wrap">
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setEditStatus(s)}
                          className={`px-3 py-1 border-2 border-black text-xs font-black uppercase ${
                            editStatus === s ? "bg-yellow-300" : "bg-white"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    {renderImageUploader(
                      editImageUrl,
                      editImageFile,
                      setEditImageFile,
                      setEditImageUrl,
                      editUploading,
                      editFileInputRef,
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={savePatch}
                    disabled={!canPatch || patching || editUploading}
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
