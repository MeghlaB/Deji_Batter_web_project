import { useState, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Calendar,
  User,
  FileText,
  Sparkles,
  X,
  Clock,
  TrendingUp,
  Image,
  Pencil,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Label } from "../../../../components/ui/label";
import { TextEditor } from "../../../../components/TipTap-Editor/TextEditor";

// Mock data - in a real app, this would come from a database

export default function NewsArticles() {
  // get all news articles
  const {
    data: allNewsArticles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allNewsArticles"],
    queryFn: async () => {
      const res = await fetch("https://deji-server.vercel.app/news");
      return res.json();
    },
  });

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    excerpt: "",
    content: "",
    status: "draft",
  });

  // console.log("form data", formData);

  const handleImageUpload = async (e) => {
    
    const file = e.target.files[0];
    if (!file) return;

    // only for preview on frontend
    const previewImage = URL.createObjectURL(file);
    setPreviewImage(previewImage);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEHOSTING}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    const imageUrl = data.data.url;
    setUploadUrl(imageUrl);
  };

  // Auto-save functionality
  const handleAutoSave = useCallback(
    (content: string) => {
      // In a real app, this would save to your backend
      localStorage.setItem(
        `article-draft-${editingId || "new"}`,
        JSON.stringify({
          ...formData,
          content,
          lastSaved: new Date().toISOString(),
        })
      );
    },
    [formData, editingId]
  );

  // Load draft from localStorage
  const loadDraft = useCallback(() => {
    const draftKey = `article-draft-${editingId || "new"}`;
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      const draft = JSON.parse(saved);
      setFormData(draft);
      toast("Draft loaded", {
        description: "Your previously saved draft has been restored.",
      });
    }
  }, [editingId, toast]);

  const handleSubmit = async (editingId) => {

    if (!formData.title || !formData.excerpt || !formData.content) {
      toast("Required fields missing", {
        description: "Please fill in all required fields",
      });
      return;
    }

    try {
      if (editingId) {
        // Update existing article
        const response = await fetch(
          `https://deji-server.vercel.app/news/${editingId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              image: uploadUrl,
              publishDate: new Date().toISOString().split("T")[0],
            }),
          }
        );

        if (response.ok) {
          refetch();
          setIsCreating(false);
          localStorage.removeItem(`article-draft-new`);
          setFormData({
            title: "",
            image: "",
            excerpt: "",
            content: "",
            status: "draft",
          });
          toast("News article updated successfully", {
            description: "The news article has been updated.",
          });
        } else {
          toast("Failed to update news article", {
            description: "An error occurred while updating the news article.",
          });
        }
      } else {
        // Create new article
        const response = await fetch("https://deji-server.vercel.app/add-news", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            image: uploadUrl,
            publishDate: new Date().toISOString().split("T")[0],
          }),
        });

        if (response.ok) {
          refetch();
          // Clear draft and reset form
          toast("News article created successfully", {
            description: "The news article has been created.",
            duration: 5000,
          });
          setIsCreating(false);
          localStorage.removeItem(`article-draft-new`);
          setFormData({
            title: "",
            image: "",
            excerpt: "",
            content: "",
            status: "draft",
          });
        } else {
          toast("Failed to create news article", {
            description: "An error occurred while creating the news article.",
          });
        }
      }
    } catch (error) {
      toast("Failed to create news article", {
        description: error.message,
      });
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article?.title,
      image: article?.image,
      excerpt: article?.excerpt,
      content: article?.content,
      status: article?.status,
    });
    setPreviewImage(article?.image);
    setEditingId(article?._id);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  };

  // Delete a single news article
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://deji-server.vercel.app/news/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        refetch();
        toast("News article deleted successfully", {
          description: "The news article has been deleted.",
        });
      } else {
        toast("Failed to delete news article", {
          description: "An error occurred while deleting the news article.",
        });
      }
    } catch (error) {
      toast("Failed to delete news article", {
        description: error.message,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      status: "draft",
    });
    setIsCreating(false);
    setEditingId(null);
    setIsPreviewMode(false);
    // Clear draft
    localStorage.removeItem(`article-draft-${editingId || "new"}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="">
            <Link to={"/dashboard/adminhome"}>
              <Button variant="outline" size="sm" className="shadow-sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="flex gap-2">
            <Link to="/news">
              <Button size="sm" variant="outline" className="shadow-sm">
                <Eye className="h-4 w-4 mr-2" />
                View News Page
              </Button>
            </Link>
            <Button
              size="sm"
              variant=""
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
          </div>
        </div>

        {/* Article Form */}
        {isCreating && (
          <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50  border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      {editingId ? "Edit Article" : "Create New Article"}
                    </CardTitle>
                    <CardDescription className="">
                      {editingId
                        ? "Update the article details below"
                        : "Fill in the details to create a new article"}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    className=""
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {isPreviewMode ? "Edit" : "Preview"}
                  </Button>
                  {/* load draft button */}
                  <Button
                    className=""
                    variant="ghost"
                    size="sm"
                    onClick={loadDraft}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Load Draft
                  </Button>
                  {/* close button */}
                  <Button
                    className=""
                    variant="ghost"
                    size="sm"
                    onClick={resetForm}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* show article preview */}
              {isPreviewMode ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">
                      {formData.title || "Article Title"}
                    </h1>
                    {/* select article image */}
                    <div className="max-w-2xl mx-auto h-64">
                      <img
                        src={previewImage || ""}
                        alt="article image"
                        className="w-full h-full mb-4"
                      />
                    </div>
                    <p className="text-lg text-gray-600 my-4">
                      {formData.excerpt || "Article excerpt"}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
                      <span>By {"Admin"}</span>
                      <span>•</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{
                      __html:
                        formData?.content ||
                        "<p>Article content will appear here...</p>",
                    }}
                  />
                </div>
              ) : (
                // create a article form
                <form
                  onSubmit={() => {handleSubmit(editingId)}}
                  className="space-y-8"
                >
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="title"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Article Title *
                      </Label>
                      <input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Enter a compelling title..."
                        className="h-12 text-lg border-2 focus:border-blue-600 focus:border-2 transition-colors rounded-md px-3 w-full"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium">
                        <Globe className="h-4 w-4" />
                        Status
                      </Label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full h-12 px-3 border-2 border-gray-200 rounded-md focus:border-blue-500 transition-colors "
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  {/* Article Image */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                    <div className="flex justify-between gap-4 max-h-40">
                      <div className="space-y-2 flex-1">
                        <Label
                          htmlFor="image"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          <Image className="h-4 w-4" />
                          Article Image *
                        </Label>
                        <button
                          type="button"
                          className="bg-gray-200 px-3 py-1 w-full h-full rounded-md hover:bg-gray-300 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Upload Image
                        </button>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                      />

                      {/* show preview image */}
                      {previewImage && (
                        <div className="flex-1 space-y-2">
                          <Label
                            htmlFor="image"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Image className="h-4 w-4" />
                            Article Image *
                          </Label>
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full rounded-md shadow-md"
                          />
                        </div>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                      <Label htmlFor="excerpt" className="text-sm font-medium">
                        <Pencil className="h-4 w-4" />
                        Article Excerpt *
                      </Label>
                      <textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) =>
                          setFormData({ ...formData, excerpt: e.target.value })
                        }
                        placeholder="Brief description of the article..."
                        className="text-lg border-2 focus:border-blue-600 focus:border-2 transition-colors rounded-md px-3 w-full h-full"
                        required
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Rich Text Editor with all features */}
                  <div className="space-y-2 pt-6">
                    <Label className="text-sm font-medium">
                      <Pencil className="h-4 w-4" />
                      Article Content *
                    </Label>
                    {/* Rich Text Editor component */}
                    <TextEditor
                      content={formData?.content}
                      onChange={(content) =>
                        setFormData({ ...formData, content })
                      }
                      onAutoSave={handleAutoSave}
                      placeholder="Start writing your article content here..."
                      showWordCount={true}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      size=""
                      type="submit"
                      className="bg-primary text-primary-foreground shadow-lg px-8 cursor-pointer"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingId ? "Update Article" : "Create Article"}
                    </Button>
                    <Button
                      size=""
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="bg-primary text-primary-foreground px-8 cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {/* Enhanced Articles List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Manage Articles</h2>
            <div className="text-sm text-gray-500">
              {allNewsArticles?.length} total articles
            </div>
          </div>

          <div className="grid gap-4">
            {allNewsArticles?.map((article) => (
              <Card
                key={article._id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80  backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">
                          {article.title}
                        </h3>
                        <Badge
                          variant={
                            article.status === "published"
                              ? "default"
                              : "secondary"
                          }
                          className={`shadow-sm ${
                            article.status === "published"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                          }`}
                        >
                          {article.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {article.likes} likes
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(article)}
                        className="shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(article?._id)}
                        className="shadow-sm hover:shadow-md transition-shadow text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
