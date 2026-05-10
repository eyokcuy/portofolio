import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../../lib/api";
import { confirmAction } from "../../lib/confirm";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { FiUser, FiMail, FiShield, FiTrash2, FiEdit2, FiPlus, FiX, FiCheck } from "react-icons/fi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form State
  const [isAdding, setIsAdding] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [submitting, setSubmitting] = useState(false);

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editRole, setEditRole] = useState("user");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (e) {
      toast.error("Failed to load users");
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setSubmitting(true);
    try {
      await createUser({ username, password, role });
      toast.success("User created successfully");
      setIsAdding(false);
      setUsername("");
      setPassword("");
      setRole("user");
      fetchUsers();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      await updateUser(id, { username: editUsername, role: editRole });
      toast.success("User updated successfully");
      setEditingId(null);
      fetchUsers();
    } catch (e) {
      toast.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (name === "rahmat") {
      toast.error("Cannot delete main admin!");
      return;
    }

    const confirmed = await confirmAction({
      title: "Delete User?",
      description: `Are you sure you want to delete ${name}?`,
      confirmLabel: "Delete",
    });

    if (confirmed) {
      try {
        await deleteUser(id);
        toast.success("User deleted");
        fetchUsers();
      } catch (e) {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black">User Management</h1>
          <p className="font-bold text-black/40 uppercase text-xs tracking-widest mt-1">Manage admin and public accounts</p>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          variant={isAdding ? "white" : "black"}
          className="flex items-center gap-2"
        >
          {isAdding ? <FiX /> : <FiPlus />}
          {isAdding ? "Cancel" : "Add New User"}
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-yellow-50" isStatic shadowSize="8px">
          <form onSubmit={handleAddUser} className="grid md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-black/40">Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="Username"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-black/40">Password</label>
              <div className="relative">
                <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-1 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-black/40">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] appearance-none"
                >
                  <option value="user">User (Public)</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <Button type="submit" disabled={submitting} variant="black" className="py-3.5 px-6">
                {submitting ? "..." : "Create"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {loading ? (
          <div className="p-10 text-center font-black uppercase animate-pulse">Loading Users...</div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center border-4 border-dashed border-black/10 font-bold opacity-30 italic">No users found</div>
        ) : (
          users.map((u) => (
            <Card key={u.id} className="bg-white" shadowSize="4px">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 border-4 border-black flex items-center justify-center text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${u.role === 'admin' ? 'bg-yellow-300' : 'bg-cyan-300'}`}>
                    <FiUser />
                  </div>
                  {editingId === u.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                        className="px-2 py-1 border-2 border-black font-bold text-sm"
                      />
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="px-2 py-1 border-2 border-black font-bold text-sm"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-black uppercase text-lg leading-none">{u.username}</h3>
                      <span className={`inline-block mt-1 px-2 py-0.5 border-2 border-black text-[10px] font-black uppercase tracking-tighter ${u.role === 'admin' ? 'bg-yellow-300' : 'bg-cyan-300'}`}>
                        {u.role}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingId === u.id ? (
                    <>
                      <button onClick={() => handleUpdateUser(u.id)} className="p-2 border-2 border-black bg-green-400 hover:bg-green-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
                        <FiCheck className="font-bold" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-2 border-2 border-black bg-red-400 hover:bg-red-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
                        <FiX />
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => {
                          setEditingId(u.id);
                          setEditUsername(u.username);
                          setEditRole(u.role);
                        }}
                        className="p-2 border-2 border-black bg-white hover:bg-neutral-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                      >
                        <FiEdit2 />
                      </button>
                      {u.username !== "rahmat" && (
                        <button 
                          onClick={() => handleDeleteUser(u.id, u.username)}
                          className="p-2 border-2 border-black bg-white text-red-500 hover:bg-red-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
