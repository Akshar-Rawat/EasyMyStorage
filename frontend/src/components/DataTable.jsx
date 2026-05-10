import React, { useState, useEffect } from "react";
import UserActionsDropdown from "./UserActionsDropdown";

const ITEMS_PER_PAGE = 10;

const DataTable = ({ users, selectedUsers, setSelectedUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (selectedUsers.some((u) => u.id === userId)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const getRoleBadgeClass = (role) => {
    const roleClasses = {
      Admin: "bg-primary/10 text-primary border border-primary/20",
      Manager: "bg-secondary/10 text-secondary border border-secondary/20",
      Editor: "bg-tertiary/10 text-tertiary border border-tertiary/20",
      User: "bg-on-surface-variant/10 text-on-surface-variant border border-on-surface-variant/20",
    };
    return roleClasses[role] || roleClasses["User"];
  };

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      Active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      Inactive: "bg-outline/10 text-outline border border-outline/20",
      Suspended: "bg-error-container/10 text-error border border-error-container/20",
      Pending: "bg-tertiary-container/10 text-tertiary border border-tertiary-container/20",
    };
    return statusClasses[status] || statusClasses["Inactive"];
  };

  const handleUserAction = (action, userId) => {
    console.log(`Action: ${action} for user: ${userId}`);
    setActiveDropdown(null);
  };

  const toggleDropdown = (userId) => {
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest(".dropdown-menu")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl border border-outline-variant/20 shadow-2xl overflow-hidden mb-12">
      
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
          <thead>
            <tr className="bg-surface-container-highest/30 border-b border-outline-variant/30">
              <th className="w-12 px-6 py-4">
                <input
                  className="checkbox-custom"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-4 text-label-mono text-on-surface-variant uppercase font-semibold text-[11px] w-1/3">User</th>
              <th className="px-6 py-4 text-label-mono text-on-surface-variant uppercase font-semibold text-[11px]">Role</th>
              <th className="px-6 py-4 text-label-mono text-on-surface-variant uppercase font-semibold text-[11px]">Status</th>
              <th className="px-6 py-4 text-label-mono text-on-surface-variant uppercase font-semibold text-[11px]">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-surface-variant/20 transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <input
                    className="checkbox-custom"
                    type="checkbox"
                    checked={selectedUsers.some((u) => u.id === user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      alt={user.name}
                      className="w-9 h-9 rounded-lg object-cover ring-1 ring-primary/20 group-hover:ring-primary/50 transition-all"
                      src={user.avatar}
                    />
                    <div className="truncate">
                      <div className="text-body-base font-bold text-on-surface truncate">{user.name}</div>
                      <div className="text-[11px] text-on-surface-variant opacity-60 truncate">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${getStatusBadgeClass(user.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      user.status === "Active" ? "bg-emerald-400" :
                      user.status === "Inactive" ? "bg-outline" :
                      user.status === "Suspended" ? "bg-error" : "bg-tertiary"
                    }`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-body-sm text-on-surface-variant">{user.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-3 p-4">
        {paginatedUsers.map((user) => (
          <div key={user.id} className="bg-surface-container/40 rounded-xl border border-outline-variant/20 p-4 hover:bg-surface-variant/20 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <input
                  className="checkbox-custom flex-shrink-0"
                  type="checkbox"
                  checked={selectedUsers.some((u) => u.id === user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
                <img
                  alt={user.name}
                  className="w-10 h-10 rounded-lg object-cover ring-1 ring-primary/20 flex-shrink-0"
                  src={user.avatar}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-body-base font-bold text-on-surface truncate">{user.name}</div>
                  <div className="text-[12px] text-on-surface-variant opacity-60 truncate">{user.email}</div>
                </div>
              </div>
              <div className="relative">
                <button
                  className="p-1.5 hover:bg-surface-variant/50 rounded-lg transition-colors flex-shrink-0"
                  onClick={() => toggleDropdown(user.id)}
                >
                  more
                </button>
                <UserActionsDropdown
                  userId={user.id}
                  isActive={activeDropdown === user.id}
                  onToggle={toggleDropdown}
                  onAction={handleUserAction}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getRoleBadgeClass(user.role)}`}>
                {user.role}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${getStatusBadgeClass(user.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  user.status === "Active" ? "bg-emerald-400" :
                  user.status === "Inactive" ? "bg-outline" :
                  user.status === "Suspended" ? "bg-error" : "bg-tertiary"
                }`}></span>
                {user.status}
              </span>
              <span className="text-[11px] text-on-surface-variant">{user.lastActive}</span>
            </div>
          </div>
        ))}
      </div>

  
      <div className="px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-outline-variant/20 bg-surface-container-highest/20">
        <div className="text-body-sm text-on-surface-variant order-2 sm:order-1">
          Showing{" "}
          <span className="font-bold text-on-surface">
            {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, users.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, users.length)}
          </span>{" "}
          of <span className="font-bold text-on-surface">{users.length}</span>
        </div>

        <div className="flex items-center gap-2 order-1 sm:order-2">
          {/* Prev */}
          <button
            className="p-2 rounded-lg border border-outline-variant hover:bg-surface-variant/40 transition-colors disabled:opacity-30"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ←
          </button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={`dots-${index}`} className="px-1 text-on-surface-variant/40 hidden sm:inline">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? "bg-primary text-on-primary font-bold shadow-lg shadow-primary/20"
                    : "hover:bg-surface-variant/40 text-on-surface-variant"
                }`}
              >
                {page}
              </button>
            )
          )}

            <button
            className="p-2 rounded-lg border border-outline-variant hover:bg-surface-variant/40 transition-colors disabled:opacity-30"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;