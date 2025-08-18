import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Separator } from "../../components/ui/separator";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import { toast } from "sonner";

const NewsDetails = () => {
  const { id } = useParams();

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await fetch(`https://deji-baterryserver-1.onrender.com/news/${id}`);
      if (!res.ok) throw new Error("Failed to fetch article");
      return res.json();
    },
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard!", {
        description: "You can share it with your friends.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600 dark:text-gray-300">Loading article...</p>
      </div>
    );
  }

  if (isError || !article?._id) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-4">
            The article you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Link to="/news">
            <Button>Back to News</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Link to="/news">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <Clock className="h-3 w-3" />
                {article?.readTime || "5"} min read
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {article?.title}
            </h1>

            {article?.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full max-h-72 object-cover rounded-lg mb-4"
              />
            )}

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {article?.excerpt}
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>By {article?.author || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(article?.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </header>

          <Separator className="mb-8" />

          <Card>
            <CardContent className="p-8">
              <div
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{
                  __html: article?.content || "Article Content",
                }}
              />
            </CardContent>
          </Card>
        </article>

        <div className="mt-12 text-center">
          <Link to="/news">
            <Button>Read More Articles</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
