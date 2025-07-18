"use client";

import { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import CodeBlock from "@tiptap/extension-code-block";
import CharacterCount from "@tiptap/extension-character-count";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const RichTextEditor = ({ value, onChange }: Props) => {
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        codeBlock: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({ placeholder: "Write your content here..." }),
      Underline,
      Link,
      Image,
      CodeBlock,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CharacterCount.configure({ limit: 10000 }),
      HorizontalRule,
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 text-[var(--text)] focus:outline-none bg-[var(--white)]/10 rounded-md prose dark:prose-invert",
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !editor) return null;

  const addImageFromUrl = () => {
    const url = prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addImageFromUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      editor
        .chain()
        .focus()
        .setImage({ src: reader.result as string })
        .run();
    };
    reader.readAsDataURL(file);
  };

  const toolbarItems = [
    {
      label: "B",
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      active: () => editor.isActive("bold"),
    },
    {
      label: "I",
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: () => editor.isActive("italic"),
    },
    {
      label: "U",
      title: "Underline",
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: () => editor.isActive("underline"),
    },
    {
      label: "S",
      title: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      active: () => editor.isActive("strike"),
    },
    {
      label: "Link",
      title: "Insert Link",
      action: () => {
        const url = prompt("Enter URL:");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      },
      active: () => editor.isActive("link"),
    },
    {
      label: "Img",
      title: "Insert Image URL",
      action: addImageFromUrl,
      active: () => false,
    },
    {
      label: "📁",
      title: "Upload Image",
      action: () => fileInputRef.current?.click(),
      active: () => false,
    },
    {
      label: "<>",
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      active: () => editor.isActive("codeBlock"),
    },
    {
      label: "H1",
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: () => editor.isActive("heading", { level: 1 }),
    },
    {
      label: "H2",
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: () => editor.isActive("heading", { level: 2 }),
    },
    {
      label: "H3",
      title: "Heading 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: () => editor.isActive("heading", { level: 3 }),
    },
    {
      label: "P",
      title: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      active: () => editor.isActive("paragraph"),
    },
    {
      label: "•",
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: () => editor.isActive("bulletList"),
    },
    {
      label: "1.",
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: () => editor.isActive("orderedList"),
    },
    {
      label: "HR",
      title: "Horizontal Rule",
      action: () => editor.chain().focus().setHorizontalRule().run(),
      active: () => editor.isActive("horizontalRule"),
    },
    {
      label: "⇦",
      title: "Align Left",
      action: () => editor.chain().focus().setTextAlign("left").run(),
      active: () => editor.isActive({ textAlign: "left" }),
    },
    {
      label: "⇧",
      title: "Align Center",
      action: () => editor.chain().focus().setTextAlign("center").run(),
      active: () => editor.isActive({ textAlign: "center" }),
    },
    {
      label: "⇨",
      title: "Align Right",
      action: () => editor.chain().focus().setTextAlign("right").run(),
      active: () => editor.isActive({ textAlign: "right" }),
    },
    {
      label: "C",
      title: "Clear Formatting",
      action: () => editor.chain().focus().unsetAllMarks().clearNodes().run(),
      active: () => false,
    },
  ];

  return (
    <div className="relative border border-[var(--border)] rounded-md shadow-sm overflow-hidden">
      {/* Floating Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 sticky top-0 z-10 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
        {toolbarItems.map(({ label, title, action, active }) => (
          <span
            key={title}
            title={title}
            role="button"
            tabIndex={0}
            onClick={action}
            className={`px-2 py-1 text-sm rounded-md cursor-pointer transition-all ${
              active()
                ? "bg-[var(--primary)] text-white"
                : "bg-transparent text-[var(--text)] hover:bg-[var(--bg-primary)]"
            }`}
          >
            {label}
          </span>
        ))}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={addImageFromUpload}
          className="hidden"
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Character Count */}
      <p className="text-sm p-2 text-center bg-[var(--bg-secondary)] border-t border-[var(--border)] text-[var(--sub-text)]">
        {editor && editor.storage.characterCount.characters()} / 10000
        characters
      </p>
    </div>
  );
};

export default RichTextEditor;
