import { useQuery } from "@tanstack/react-query";
import { Calendar, Search, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import { Helmet } from "react-helmet";

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // get all News articles from database
  const { data: allNewsArticles = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await fetch("https://deji-baterryserver-1.onrender.com/news");
      return res.json();
    },
  });

  const filteredArticles = allNewsArticles?.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && article.status === "published";
  });

  isLoading && console.log("Loading...");
  return (
    <>
     <Helmet>
        <title>NEWS | Deji Battery</title>
        <meta name="description" content="Get in touch with us for any inquiries about our batteries, bulk orders, or technical support." />
      </Helmet>
 <div className="container mx-auto px-2 ">
      {/* Search and Filter */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">News Articles</h1>
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredArticles.map((article) => (
          <Link key={article.id} to={`/news/${article?._id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                {/* 🖼️ Article Image */}
                <div className="w-full h-full">
                  <img
                    src={article?.image}
                    alt={article?.title}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                </div>

                {/* <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">
                    {article?.readTime || "5" } min read
                  </span>
                </div> */}
                <CardTitle className="line-clamp-2">{article?.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {article?.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-3 flex flex-col justify-end h-full">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {article?.author || "Unknown"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article?.publishDate).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No articles found matching your criteria.
          </p>
        </div>
      )}
    </div>
    </>
   
  );
};

export default NewsPage;
