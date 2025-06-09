import { useState } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Search, Calendar, MessageCircle, Heart, BookmarkIcon, ChevronRight } from "lucide-react";

// Sample blog post data
const blogPosts = [
  {
    id: "1",
    title: "Principles of Effective UI Design in 2025",
    excerpt: "Exploring the latest trends in UI design and how to implement them in your projects.",
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "UI Design",
    date: "May 25, 2025",
    author: {
      name: "YONGWOO.KIM",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    readTime: "8 min read",
    likes: 142,
    comments: 38,
    featured: true,
  },
  {
    id: "2",
    title: "Creating Accessible Interfaces: A Comprehensive Guide",
    excerpt: "Learn how to make your designs accessible to all users regardless of their abilities.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Accessibility",
    date: "May 18, 2025",
    author: {
      name: "YONGWOO.KIM",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    readTime: "12 min read",
    likes: 98,
    comments: 24,
    featured: false,
  },
  {
    id: "3",
    title: "The Psychology of Color in Digital Products",
    excerpt: "Understand how color choices influence user perception and behavior in your designs.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Design Theory",
    date: "May 10, 2025",
    author: {
      name: "YONGWOO.KIM",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    readTime: "10 min read",
    likes: 176,
    comments: 52,
    featured: false,
  },
  {
    id: "4",
    title: "Design Systems: Build Once, Use Everywhere",
    excerpt: "How to create and maintain effective design systems that scale with your projects.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Design Systems",
    date: "May 05, 2025",
    author: {
      name: "YONGWOO.KIM",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    readTime: "15 min read",
    likes: 205,
    comments: 47,
    featured: true,
  },
  {
    id: "5",
    title: "Prototyping Techniques That Impress Clients",
    excerpt: "Advanced prototyping methods that help communicate your design vision effectively.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Prototyping",
    date: "April 28, 2025",
    author: {
      name: "YONGWOO.KIM",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    readTime: "7 min read",
    likes: 89,
    comments: 12,
    featured: false,
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const featuredVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      delay: 0.2
    }
  }
};

export function BlogPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPosts = blogPosts.filter(post => post.featured);
  const filteredPosts = searchQuery 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeTab === "all" 
      ? blogPosts 
      : blogPosts.filter(post => post.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="flex flex-col h-full overflow-auto">
      <motion.div 
        className="p-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <motion.h1 
              className="text-2xl md:text-3xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Designer Blog
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Insights and thoughts on design, user experience, and creative processes.
            </motion.p>
          </div>

          {/* Search bar */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </motion.div>

          {/* Featured posts */}
          {!searchQuery && activeTab === "all" && featuredPosts.length > 0 && (
            <motion.div 
              className="space-y-4"
              variants={featuredVariants}
              initial="hidden"
              animate="visible"
            >
              <h2>Featured Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.map(post => (
                  <motion.div 
                    key={post.id}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group cursor-pointer"
                  >
                    <Card className="overflow-hidden h-full">
                      <div className="relative h-48 w-full overflow-hidden">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary/90 hover:bg-primary">{post.category}</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">{post.author.name}</div>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </div>
                        </div>
                        <CardTitle className="mt-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between pt-2">
                        <div className="text-sm text-muted-foreground">
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3.5 w-3.5" />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3.5 w-3.5" />
                            {post.comments}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex overflow-auto pb-2 mb-2">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="UI Design">UI Design</TabsTrigger>
                <TabsTrigger value="Accessibility">Accessibility</TabsTrigger>
                <TabsTrigger value="Design Theory">Design Theory</TabsTrigger>
                <TabsTrigger value="Design Systems">Design Systems</TabsTrigger>
                <TabsTrigger value="Prototyping">Prototyping</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Blog post list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden group cursor-pointer">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary/90 hover:bg-primary">{post.category}</Badge>
                        </div>
                      </div>
                      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="group-hover:text-primary transition-colors">{post.title}</h3>
                          <p className="text-muted-foreground mt-2">{post.excerpt}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm">{post.author.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {post.date} · {post.readTime}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3.5 w-3.5" />
                              {post.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3.5 w-3.5" />
                              {post.comments}
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <BookmarkIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center py-12"
              >
                <h3>No posts found</h3>
                <p className="text-muted-foreground mt-2">Try a different search term or category</p>
              </motion.div>
            )}
          </motion.div>

          {filteredPosts.length > 0 && (
            <motion.div 
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button variant="outline" className="gap-2">
                Load More <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}