// TipTapEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useRef } from 'react'

export default function TipTapEditor({ onSubmit }) {
  const [title, setTitle] = useState("")
  const fileInputRef = useRef(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your article...</p>',
  })

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEHOSTING}`, {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    const imageUrl = data.data.url
    console.log("form imageBB", imageUrl);
    

    // Insert image into editor content
    editor.chain().focus().insertContent(`<img src="${imageUrl}" alt="uploaded image" />`).run()
  }

  const handleSubmit = () => {
    const content = editor?.getHTML() || ""
    onSubmit({ title, content })
  }

  return (
    <div className="space-y-4">
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} className="border p-2 w-full" />
      <button
        className="bg-gray-200 px-3 py-1"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Image
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      <div className="border p-2">
        <EditorContent editor={editor} />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}
