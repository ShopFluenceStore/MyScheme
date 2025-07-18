"use client";

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

interface Scheme {
  title: string;
  description: string;
  category: string;
  subCategory: string;
  launchDate: string;
  deadline: string;
  state: string;
  logo: string;
  isNew: boolean;
  lastUpdated: string;
  bookmarks: number;
  tags: string[];
  benefits: string[];
  eligibility?: string[];
  documentsRequired?: string[];
}

const AddSchemeForm = () => {
  const [form, setForm] = useState<Scheme>({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    launchDate: "",
    deadline: "",
    state: "",
    logo: "",
    isNew: true,
    lastUpdated: new Date().toISOString().split("T")[0],
    bookmarks: 0,
    tags: [],
    benefits: [],
    eligibility: [],
    documentsRequired: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [eligibilityInput, setEligibilityInput] = useState("");
  const [documentInput, setDocumentInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/schemes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        alert("✅ Scheme added successfully!");
        console.log("Saved Scheme:", result.scheme);
      } else {
        alert("❌ Failed to add scheme.");
      }
    } catch (err) {
      console.error("Error adding scheme:", err);
      alert("⚠️ Something went wrong");
    }
  };

  const renderArrayField = (
    label: string,
    key: keyof Scheme,
    input: string,
    setInput: (val: string) => void
  ) => {
    const predefinedOptions = [
      "Education",
      "Healthcare",
      "Finance",
      "Youth",
      "Pension",
      "Women",
      "Startup",
    ];

    const addItem = () => {
      if (input.trim()) {
        setForm({
          ...form,
          [key]: [...(form[key] as string[]), input.trim()],
        });
        setInput("");
      }
    };

    const removeItem = (index: number) => {
      setForm({
        ...form,
        [key]: (form[key] as string[]).filter((_, i) => i !== index),
      });
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--text)]">
          {label}
        </label>

        <div className="relative flex gap-2">
          <input
            type="text"
            value={input}
            placeholder={`Enter ${label.toLowerCase()}...`}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === ",") && input.trim()) {
                e.preventDefault();
                addItem();
              }
              if (e.key === "Backspace" && input === "") {
                removeItem((form[key] as string[]).length - 1);
              }
            }}
            className="flex-1 px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            list={`${key}-suggestions`}
          />

          <datalist id={`${key}-suggestions`}>
            {predefinedOptions.map((option) => (
              <option value={option} key={option} />
            ))}
          </datalist>

          <Button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 transition"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {(form[key] as string[]).map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)] text-[var(--white)] text-sm animate-fade-in"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="hover:text-gray-300 transition text-[var(--white)] text-xs cursor-pointer"
              >
                <IoMdClose size={16} />
              </button>
            </span>
          ))}
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.2s ease-in-out;
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto my-10 mb-16 p-6 bg-[var(--bg-primary)] border border-[var(--border)] shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-[var(--primary)]">
        Add New Scheme
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Enter Scheme Title (Required)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full mt-4 mb-8 text-3xl font-bold bg-transparent border-none outline-none text-[var(--text)] placeholder:text-[var(--sub-text)]"
        />

        <div>
          <label className="block mb-2 text-sm text-[var(--text)]">
            Description
          </label>
          <RichTextEditor
            value={form.description}
            onChange={(val) => setForm({ ...form, description: val })}
          />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)]"
            >
              <option value="">Select Category</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">
              Sub Category
            </label>
            <input
              type="text"
              value={form.subCategory}
              onChange={(e) =>
                setForm({ ...form, subCategory: e.target.value })
              }
              className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            value={form.launchDate}
            onChange={(e) => setForm({ ...form, launchDate: e.target.value })}
            className="p-3 rounded-lg border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)]"
          />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="p-3 rounded-lg border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">
            State
          </label>
          <input
            type="text"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1">
            Logo (Image URL or Upload)
          </label>
          <input
            type="text"
            placeholder="Paste image link here"
            value={form.logo}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
            className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)]"
          />
          {form.logo && (
            <Image
              src={form.logo}
              alt="Logo Preview"
              width={100}
              height={100}
              className="mt-2 w-20 h-20 object-contain"
            />
          )}
        </div>

        {renderArrayField("Tags", "tags", tagInput, setTagInput)}
        {renderArrayField(
          "Benefits",
          "benefits",
          benefitInput,
          setBenefitInput
        )}
        {renderArrayField(
          "Eligibility",
          "eligibility",
          eligibilityInput,
          setEligibilityInput
        )}
        {renderArrayField(
          "Documents Required",
          "documentsRequired",
          documentInput,
          setDocumentInput
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isNew}
            onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
            id="isNew"
            className="rounded border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)]"
          />
          <label htmlFor="isNew" className="text-sm text-[var(--text)]">
            Mark as New Scheme
          </label>
        </div> */}

        <div className="space-y-6">
          {/* Category & Sub-Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">Select Category</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Sub Category
              </label>
              <input
                type="text"
                value={form.subCategory}
                onChange={(e) =>
                  setForm({ ...form, subCategory: e.target.value })
                }
                placeholder="e.g. Scholarships"
                className="w-full px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          {/* Launch Date & Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Launch Date
              </label>
              <input
                type="date"
                value={form.launchDate}
                onChange={(e) =>
                  setForm({ ...form, launchDate: e.target.value })
                }
                className="w-full px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Deadline
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              State
            </label>
            <input
              type="text"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              placeholder="e.g. Punjab"
              className="w-full px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Logo Input */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Logo (Image URL)
            </label>
            <input
              type="text"
              placeholder="Paste image link here"
              value={form.logo}
              onChange={(e) => setForm({ ...form, logo: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-[var(--border)] bg-[var(--white)]/10 text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {form.logo && (
              <Image
                src={form.logo}
                alt="Logo Preview"
                width={100}
                height={100}
                className="mt-3 w-20 h-20 object-contain border border-[var(--border)] rounded-md"
              />
            )}
          </div>

          {/* Tags, Benefits, Eligibility, Documents */}
          {renderArrayField("Tags", "tags", tagInput, setTagInput)}
          {renderArrayField(
            "Benefits",
            "benefits",
            benefitInput,
            setBenefitInput
          )}
          {renderArrayField(
            "Eligibility",
            "eligibility",
            eligibilityInput,
            setEligibilityInput
          )}
          {renderArrayField(
            "Documents Required",
            "documentsRequired",
            documentInput,
            setDocumentInput
          )}

          {/* Is New Scheme */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={form.isNew}
              onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
              id="isNew"
              className="h-5 w-5 rounded border border-[var(--border)] bg-[var(--white)]/10 text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <label htmlFor="isNew" className="text-sm text-[var(--text)]">
              Mark as New Scheme
            </label>
          </div>
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-full py-3 px-6 text-lg"
        >
          Submit Scheme
        </Button>
      </form>
    </div>
  );
};

export default AddSchemeForm;
