import BlogGenerator from "./Bloggenetor"



function Blog() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto shadow-lg bg-white rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          📝 AI Blog Generator
        </h1>
        <BlogGenerator />
      </div>
    </div>
    </div>
  )
}

export default Blog
