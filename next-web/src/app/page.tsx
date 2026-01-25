"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

type Contact = {
  id: number;
  name: string;
  mobile: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
};

// Resolve the API base URL from the public env variable.
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

// Mobile numbers must start with 01 and contain digits only.
const isValidMobile = (value: string) => /^01[0-9]*$/.test(value);

/**
 * Contacts page with create, edit, and delete flows.
 */
export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    contactNumber: "",
  });
  const [editForm, setEditForm] = useState({
    name: "",
    mobile: "",
    contactNumber: "",
  });

  // Total count for the dashboard pill.
  const total = useMemo(() => contacts.length, [contacts]);

  // Fetch the contact list from the API.
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${apiBaseUrl}/contacts`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to load contacts.");
      }
      const data = (await response.json()) as Contact[];
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load on first render.
  useEffect(() => {
    fetchContacts();
  }, []);

  // Create a new contact from the form.
  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidMobile(form.mobile)) {
      setError("Mobile must start with 01 and contain digits only.");
      return;
    }
    try {
      setCreating(true);
      setError(null);
      const response = await fetch(`${apiBaseUrl}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Failed to create contact.");
      }
      const created = (await response.json()) as Contact;
      setContacts((prev) => [created, ...prev]);
      setForm({ name: "", mobile: "", contactNumber: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setCreating(false);
    }
  };

  // Hydrate the edit form and open edit mode.
  const startEditing = (contact: Contact) => {
    setEditingId(contact.id);
    setEditForm({
      name: contact.name,
      mobile: contact.mobile,
      contactNumber: contact.contactNumber,
    });
  };

  // Persist edits for the selected contact.
  const handleUpdate = async (id: number) => {
    if (!isValidMobile(editForm.mobile)) {
      setError("Mobile must start with 01 and contain digits only.");
      return;
    }
    try {
      setBusyId(id);
      setError(null);
      const response = await fetch(`${apiBaseUrl}/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!response.ok) {
        throw new Error("Failed to update contact.");
      }
      const updated = (await response.json()) as Contact;
      setContacts((prev) => prev.map((item) => (item.id === id ? updated : item)));
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setBusyId(null);
    }
  };

  // Delete a contact and update the list locally.
  const handleDelete = async (id: number) => {
    try {
      setBusyId(id);
      setError(null);
      const response = await fetch(`${apiBaseUrl}/contacts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete contact.");
      }
      setContacts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-12">
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[rgba(244,162,89,0.35)] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-56 h-72 w-72 rounded-full bg-[rgba(123,159,134,0.25)] blur-[120px]" />

      <header className="mx-auto mb-10 flex max-w-6xl flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[rgba(27,26,23,0.6)]">
          Contacts Desk
        </span>
        <h1 className="text-3xl font-semibold leading-tight text-[color:var(--ink)] md:text-5xl">
          Manage names, mobile numbers, and contact numbers in one bright panel.
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-white/70 px-4 py-1 shadow-[0_12px_28px_var(--shadow)]">
            Total contacts: {total}
          </span>
          <span className="rounded-full border border-black/10 bg-white/60 px-4 py-1">
            API: {apiBaseUrl}/contacts
          </span>
        </div>
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_1.5fr]">
        <section className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-[0_25px_60px_var(--shadow)] backdrop-blur">
          <h2 className="text-xl font-semibold">New contact</h2>
          <p className="mt-2 text-sm text-black/60">
            Add a name, mobile number, and a secondary contact number.
          </p>
          <form onSubmit={handleCreate} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-black/70">
              Name
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base shadow-sm focus:border-black/30 focus:outline-none"
                placeholder="Momin"
              />
            </label>
            <label className="block text-sm font-medium text-black/70">
              Mobile
              <input
                required
                value={form.mobile}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    mobile: event.target.value.replace(/[^0-9]/g, ""),
                  }))
                }
                inputMode="numeric"
                pattern="^01[0-9]*$"
                title="Must start with 01 and contain digits only."
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base shadow-sm focus:border-black/30 focus:outline-none"
                placeholder="01700000000"
              />
            </label>
            <label className="block text-sm font-medium text-black/70">
              Contact number
              <input
                required
                value={form.contactNumber}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    contactNumber: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base shadow-sm focus:border-black/30 focus:outline-none"
                placeholder="01800000000"
              />
            </label>
            <button
              type="submit"
              disabled={creating}
              className="w-full rounded-2xl bg-[color:var(--gold)] px-5 py-3 text-base font-semibold text-[color:var(--ink)] shadow-[0_16px_30px_rgba(244,162,89,0.45)] transition hover:translate-y-[-1px] disabled:opacity-60"
            >
              {creating ? "Saving..." : "Save contact"}
            </button>
          </form>
          <button
            type="button"
            onClick={fetchContacts}
            className="mt-5 w-full rounded-2xl border border-black/10 bg-transparent px-5 py-3 text-sm font-semibold text-black/70 transition hover:border-black/30"
          >
            Refresh list
          </button>
        </section>

        <section className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_25px_60px_var(--shadow)] backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Contacts</h2>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-black/50">
              Live
            </span>
          </div>
          {loading ? (
            <p className="mt-6 text-sm text-black/60">Loading...</p>
          ) : contacts.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-black/20 p-6 text-center text-sm text-black/50">
              No contacts yet. Add the first one on the left.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {contacts.map((contact) => {
                const isEditing = editingId === contact.id;
                return (
                  <div
                    key={contact.id}
                    className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm"
                  >
                    {isEditing ? (
                      <div className="space-y-3">
                        <input
                          value={editForm.name}
                          onChange={(event) =>
                            setEditForm((prev) => ({
                              ...prev,
                              name: event.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
                        />
                        <input
                          value={editForm.mobile}
                          onChange={(event) =>
                            setEditForm((prev) => ({
                              ...prev,
                              mobile: event.target.value.replace(/[^0-9]/g, ""),
                            }))
                          }
                          inputMode="numeric"
                          pattern="^01[0-9]*$"
                          title="Must start with 01 and contain digits only."
                          className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
                        />
                        <input
                          value={editForm.contactNumber}
                          onChange={(event) =>
                            setEditForm((prev) => ({
                              ...prev,
                              contactNumber: event.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdate(contact.id)}
                            disabled={busyId === contact.id}
                            className="rounded-full bg-[color:var(--sage)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                          >
                            {busyId === contact.id ? "Saving" : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/60"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-black">
                            {contact.name}
                          </p>
                          <p className="text-sm text-black/60">
                            Mobile: {contact.mobile}
                          </p>
                          <p className="text-sm text-black/60">
                            Contact: {contact.contactNumber}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => startEditing(contact)}
                            className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 transition hover:border-black/30"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(contact.id)}
                            disabled={busyId === contact.id}
                            className="rounded-full border border-black/10 bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 disabled:opacity-60"
                          >
                            {busyId === contact.id ? "Deleting" : "Delete"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
