import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  SuperscriptIcon,
  SubscriptIcon,
  Save,
  Clock,
} from "lucide-react";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image";
import { cn } from "../../lib/utils";

export function TextEditor({
  content,
  onChange,
  placeholder = "Start writing your article...",
  onAutoSave,
  showWordCount = true,
}) {
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800 cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: [
          "heading",
          "paragraph",
          "code",
          "table",
          "list",
          "image",
          "quote",
        ],
      }),
      Underline,
      Superscript,
      Subscript,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg shadow-sm",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);

      // Update word count and stats
      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const chars = text.length;
      const reading = Math.ceil(words / 200); // Average reading speed: 200 words per minute

      setWordCount(words);
      setCharCount(chars);
      setReadingTime(reading);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-6",
      },
    },
  });

  // Auto-save functionality
  useEffect(() => {
    if (!editor || !onAutoSave) return;

    const autoSaveInterval = setInterval(() => {
      const currentContent = editor.getHTML();
      if (currentContent !== content) {
        onAutoSave(currentContent);
        setLastSaved(new Date());
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [editor, content, onAutoSave]);

  const handleManualSave = useCallback(() => {
    if (editor && onAutoSave) {
      onAutoSave(editor.getHTML());
      setLastSaved(new Date());
      toast("Content saved", {
        description: "Your article has been saved successfully.",
      });
    }
  }, [editor, onAutoSave, setLastSaved]);

  // Image upload handler
  const handleImageUpload = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      // Create a URL for the uploaded file (in a real app, upload to your server/cloud)
      const url = URL.createObjectURL(file);

      if (editor) {
        editor.chain().focus().setImage({ src: url }).run();
        setIsImagePopoverOpen(false);
        toast("Image uploaded", {
          description: "Image has been added to your article.",
        });
      }
    },
    [editor]
  );

  const addLink = useCallback(() => {
    if (!linkUrl) return;

    if (editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setIsLinkPopoverOpen(false);
    }
  }, [editor, linkUrl]);

  const addImageFromUrl = useCallback(() => {
    if (!imageUrl) return;

    if (editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setIsImagePopoverOpen(false);
    }
  }, [editor, imageUrl]);

  const insertTemplate = useCallback(
    (template) => {
      if (!editor) return;

      const templates = {
        blank: `<p></p>`, // Add this blank template option
        news: `<h1>Breaking News: [Title]</h1>
<p><strong>Location, Date</strong> - [Lead paragraph with the most important information]</p>
<h2>Key Details</h2>
<ul>
<li>Important point 1</li>
<li>Important point 2</li>
<li>Important point 3</li>
</ul>
<h2>Background</h2>
<p>[Provide context and background information]</p>
<h2>What's Next</h2>
<p>[Future implications and next steps]</p>`,

        review: `<h1>[Product/Service] Review: [Rating]/5 Stars</h1>
<h2>Overview</h2>
<p>[Brief summary of what you're reviewing]</p>
<h2>Pros</h2>
<ul>
<li>Positive aspect 1</li>
<li>Positive aspect 2</li>
<li>Positive aspect 3</li>
</ul>
<h2>Cons</h2>
<ul>
<li>Negative aspect 1</li>
<li>Negative aspect 2</li>
</ul>
<h2>Final Verdict</h2>
<p>[Your final thoughts and recommendation]</p>`,

        howto: `<h1>How to [Task]: A Step-by-Step Guide</h1>
<p>[Introduction explaining what readers will learn]</p>
<h2>What You'll Need</h2>
<ul>
<li>Requirement 1</li>
<li>Requirement 2</li>
<li>Requirement 3</li>
</ul>
<h2>Step-by-Step Instructions</h2>
<h3>Step 1: [First Step]</h3>
<p>[Detailed explanation]</p>
<h3>Step 2: [Second Step]</h3>
<p>[Detailed explanation]</p>
<h3>Step 3: [Third Step]</h3>
<p>[Detailed explanation]</p>
<h2>Conclusion</h2>
<p>[Wrap up and final tips]</p>`,

        interview: `<h1>Interview with [Name]: [Topic]</h1>
<p><em>[Brief introduction about the interviewee and topic]</em></p>
<h2>Background</h2>
<p>[Information about the person being interviewed]</p>
<h2>The Interview</h2>
<p><strong>Q: [Question 1]</strong></p>
<p>A: [Answer 1]</p>
<p><strong>Q: [Question 2]</strong></p>
<p>A: [Answer 2]</p>
<p><strong>Q: [Question 3]</strong></p>
<p>A: [Answer 3]</p>
<h2>Key Takeaways</h2>
<ul>
<li>Insight 1</li>
<li>Insight 2</li>
<li>Insight 3</li>
</ul>`,
      };

      editor.commands.setContent(templates[template]);

      // Update the toast message to handle the blank template
      const templateName =
        template === "blank"
          ? "Blank document"
          : `${template.charAt(0).toUpperCase() + template.slice(1)} template`;
      toast("Template applied", {
        description: `${templateName} has been loaded.`,
      });
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
    disabled = false,
  }) => (
    <Button
      type="button"
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        "h-8 w-8 p-0 transition-all duration-200",
        isActive && "bg-primary text-primary-foreground shadow-sm",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </Button>
  );

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
      {/* Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-3">
        <div className="flex flex-wrap items-center gap-1">
          {/* History */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Headings */}
          <div className="flex items-center gap-1">
            <Select
              value={
                editor.isActive("heading", { level: 1 })
                  ? "h1"
                  : editor.isActive("heading", { level: 2 })
                  ? "h2"
                  : editor.isActive("heading", { level: 3 })
                  ? "h3"
                  : "paragraph"
              }
              onValueChange={(value) => {
                if (value === "paragraph") {
                  editor.chain().focus().setParagraph().run();
                } else {
                  const level = Number.parseInt(value.replace("h", ""));
                  editor.chain().focus().setHeading({ level }).run(); // <-- changed here
                }
              }}
            >
              <SelectTrigger className="w-20 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraph">P</SelectItem>
                <SelectItem value="h1">H1</SelectItem>
                <SelectItem value="h2">H2</SelectItem>
                <SelectItem value="h3">H3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive("underline")}
              title="Underline"
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive("strike")}
              title="Strikethrough"
            >
              <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive("code")}
              title="Code"
            >
              <Code className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Superscript/Subscript */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              isActive={editor.isActive("superscript")}
              title="Superscript"
            >
              <SuperscriptIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              isActive={editor.isActive("subscript")}
              title="Subscript"
            >
              <SubscriptIcon className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Alignment */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              isActive={editor.isActive({ textAlign: "left" })}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              isActive={editor.isActive({ textAlign: "center" })}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              isActive={editor.isActive({ textAlign: "right" })}
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              isActive={editor.isActive({ textAlign: "justify" })}
              title="Justify"
            >
              <AlignJustify className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Link */}
          <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={editor.isActive("link") ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Add Link"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <Label htmlFor="link-url">Link URL</Label>
                <Input
                  id="link-url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addLink();
                    }
                  }}
                />
                <div className="flex gap-2">
                  <Button onClick={addLink} size="sm">
                    Add Link
                  </Button>
                  <Button
                    onClick={() => {
                      editor.chain().focus().unsetLink().run();
                      setIsLinkPopoverOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Remove Link
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Image */}
          <Popover
            open={isImagePopoverOpen}
            onOpenChange={setIsImagePopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Add Image"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="image-upload">Upload Image</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1"
                  />
                </div>
                <div className="text-center text-sm text-gray-500">or</div>
                <div>
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addImageFromUrl();
                      }
                    }}
                  />
                </div>
                <Button onClick={addImageFromUrl} size="sm" className="w-full">
                  Add Image
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Templates */}
          <Select onValueChange={insertTemplate}>
            <SelectTrigger className="w-28 h-8 text-xs">
              <SelectValue placeholder="Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blank">Blank</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="howto">How-to</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
            </SelectContent>
          </Select>

          {/* Save Button */}
          {onAutoSave && (
            <>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleManualSave}
                className="h-8 px-3 text-xs"
                title="Save Now"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        <EditorContent editor={editor} className="prose-editor" />
        {editor.isEmpty && (
          <div className="absolute top-6 left-6 text-gray-400 pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>

      {/* Footer with Stats */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            {showWordCount && (
              <>
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
                <span>{readingTime} min read</span>
              </>
            )}
          </div>
          {lastSaved && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Saved {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
