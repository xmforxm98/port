import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  featured: boolean;
  content?: string;
}

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export function BlogPostDetail({ post, onBack }: BlogPostDetailProps) {
  const blogContent = post.content || `
Today we are opening a new Principal Product Designer role at Medium — our most senior design level and an IC leadership position at the company.

Adding new leadership to a team involves both risk and reward. That's why I'm writing this: I want to outline my hopes and expectations for this role as well as illustrate the immense, rare opportunity to shape the future of Medium. We know success for this role depends on finding someone whose experience and interests align perfectly. Somewhere out there is a person reading this who's nodding along, maybe even saying aloud, "That sounds exactly like me. I can help with that. I want that!"

That's who I want to find: someone who knows Medium, appreciates our mission, and has the skills to deepen our design work. Is that you? By all means, apply, and tell us in your cover letter why you're the perfect fit for this role. Yes, a human being will be reading your cover letter.

## Why now?

During my six months at Medium so far, what has become clear to me are two things: 1) how much writers and readers get out of Medium, and 2) how many opportunities we have to improve the product.

## The role

We're looking for a Principal Product Designer who can help us realize Medium's potential. This person will work closely with engineering, product, and other cross-functional partners to craft experiences that serve our community of writers and readers.

This role offers the opportunity to:
• Shape the design direction of a platform used by millions
• Work on challenging problems around content discovery and creation
• Collaborate with a talented team of designers and engineers
• Make a real impact on how people consume and create content online

## What we're looking for

The ideal candidate has:
• 8+ years of product design experience
• Experience designing for large-scale platforms
• Strong systems thinking and design leadership skills
• A passion for content and publishing
• Experience working with engineering teams

If this sounds like you, we'd love to hear from you. Apply through our careers page and tell us why you're excited about this opportunity.
  `;

  return (
    <div className="flex flex-col h-full overflow-auto">
      <motion.div 
        className="max-w-4xl mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="gap-2 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </motion.div>

        {/* Article header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Badge className="mb-4">{post.category}</Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {post.excerpt}
          </p>

          {/* Article meta without profile */}
          <div className="flex items-center justify-between border-b border-muted pb-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Featured image */}
        <motion.div 
          className="mb-8 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full aspect-video object-cover"
          />
        </motion.div>

        {/* Article content */}
        <motion.div 
          className="max-w-none mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground space-y-4">
            {blogContent.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('• ')) {
                const listItems = paragraph.split('\n').filter(item => item.startsWith('• '));
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                    {listItems.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.replace('• ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </motion.div>

        {/* Article footer */}
        <motion.div 
          className="border-t border-muted pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-center">
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share this article
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 