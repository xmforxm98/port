import { useState } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Calendar, MessageCircle, Heart, BookmarkIcon, ChevronRight } from "lucide-react";
import { BlogPostDetail } from "./BlogPostDetail";

// Sample blog post data
const blogPosts = [
  {
    id: "6",
    title: "Behind 30,000 Users",
    excerpt: "The title of a startup co-founder sounded pretty grand, but for me, that year was about bridging the gap between expectation and reality.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Startup",
    date: "Feb 11, 2025",
    readTime: "7 min read",
    likes: 89,
    comments: 12,
    featured: true,
    content: `Behind 30,000 Users:

The title of a startup co-founder sounded pretty grand, but for me, that year was about bridging the gap between expectation and reality. Working with a close friend made our relationship more complex than just 'business partners.'

Every start has a catalyst. For me, it was gaining confidence from working at a startup, which sparked new desires. The idea of taking on everything from design to development grew, as did my drive for new challenges.

My friend always had brilliant ideas and unwavering determination. He'd already proven his incredible execution by single-handedly building, marketing, and launching an app that gathered 30,000 users. His vision was to create a new ticket purchasing service to solve current booking problems.

Honestly, his vision didn't fully resonate with me. The small market size in particular left me with deep doubts. Sometimes, I wondered, 'Is this even possible?'

Still, I decided to join him because of my firm belief in his abilities. I knew his innate business sense and his tenacity to overcome any obstacle better than anyone. Given his track record of attracting 30,000 users on his own, I was convinced that even if I didn't fully grasp his vision or felt anxious about the market, he could still make it a reality. I also wanted to create something new, seeing it as a chance to test my own skills by leveraging his strengths.

My friend had clear expectations. From the start, he wanted me to be someone who could point out when he was heading down the wrong path without hesitation. I thought I could do that. I believed I could always be there to offer a clear perspective and keep him from getting carried away.

We divided our roles based on our strengths. I focused on external areas like presentations, sales, and design. These were areas I enjoyed and felt I could excel at. I was confident I could handle them if given the chance. We quickly refined our ideas and even met with investors, achieving some small successes. We trusted each other's strengths and were optimistic about our journey. But reality proved far more challenging.`
  },
  {
    id: "1",
    title: "Principles of Effective UI Design in 2025",
    excerpt: "Exploring the latest trends in UI design and how to implement them in your projects.",
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "UI Design",
    date: "May 25, 2025",
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
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

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

  if (selectedPost) {
    return <BlogPostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

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
                    onClick={() => setSelectedPost(post)}
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
                        <div className="flex items-center justify-end">
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
                <TabsTrigger value="Startup">Startup</TabsTrigger>
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
                  onClick={() => setSelectedPost(post)}
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
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date} · {post.readTime}
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