import { useState } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Calendar, ChevronRight } from "lucide-react";
import { BlogPostDetail } from "./BlogPostDetail";

// Sample blog post data
const blogPosts = [
  {
    id: "9",
    title: "Design Proposals: Why Always Three?",
    excerpt: "Throughout my design studies and various projects, I've had numerous opportunities to present my work. One of the most crucial principles I learned is the rule of three proposals.",
    image: "/images/arrow.png",
    category: "UX Design",
    date: "August 10, 2024",
    readTime: "6 min read",
    featured: false,
    content: `Design Proposals: Why Always Three?

Throughout my design studies and various projects, I've had numerous opportunities to present my work. Honestly, I'd say about 50% of my presentations were successful, 30% were just okay, and the remaining 20% were, well, a bit embarrassing. Through these experiences, one of the most crucial principles I learned, and found truly effective, is the rule of three proposals.

When I first started studying design, my professors always taught that designers should offer clients several different design directions. We'd set out distinct approaches, varying in functionality, design details, or even subtle differences.

One day, Professor Mike from Strate School of Design gathered us students and said, "It's a rule here to always present three options. One should be what you consider the best, one should be normal, and the last one should be what you believe is the worst."

His logic was this: the 'worst' option strategically guides the client to choose the 'best' one. And the 'normal' option serves to present another direction or possibility, just in case.

This method not only gives clients the satisfaction of 'choosing' but also significantly increases the likelihood of guiding their decision towards the designer's preferred direction.

That's why I always try to present three options when making design proposals. It's not just about showing multiple ideas; it's about embedding clear intent and strategy into each proposal. This approach clarifies communication with clients, reduces unnecessary trial and error, and ultimately leads to better design decisions.

I believe this 'rule of three proposals' is a powerful communication strategy that can be effectively applied not only in design but also in various decision-making scenarios.`
  },
  {
    id: "8",
    title: "Data Visualization Design",
    excerpt: "In dashboard design projects, data visualization often becomes a key requirement from clients. I engage with users through a series of questions to determine their objectives and select the appropriate design from various chart types.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Data Design",
    date: "June 20, 2024",
    readTime: "10 min read",
    featured: false,
    content: `Data Visualization Design

In dashboard design projects, data visualization often becomes a key requirement from clients. I engage with users through a series of questions to determine their objectives and select the appropriate design from various chart types.

• Question 1: What do you want to see?
• Question 2: What data do you have?
• Question 3: How is the data being updated?

## Chart Types

While many articles explain a wide range of chart types, from 18 to as many as 80, they often present a challenge in terms of providing a clear, at-a-glance understanding.

## Question 1: What are you looking to visualize or see in the data?

To effectively convey information through visualization, it's crucial to clearly understand what you want to communicate—in other words, the purpose. The answer to this question goes beyond simply "I want to see sales"; it demands a deep understanding of what insights users want to gain and what decisions they aim to make through the data.

User objectives can broadly be classified into several categories:

### Comparison: 

When users want to identify similarities and differences between various items, periods, or groups. This includes comparing current year's sales to last year's, or the performance of one product line against another.

• Key Questions: "What do you want to compare (and with what)?", "What differences are you looking to find?"
• Suitable Charts: Bar charts, grouped bar charts, line charts (for comparison over time), radar charts, etc.

### Distribution: 

When users want to know how data is spread across a certain range or value, or how frequently specific values appear. This is used to understand, for instance, the age distribution of customers or the concentration of test scores within certain ranges.

• Key Questions: "How is the data distributed?", "Which values appear most frequently?"
• Suitable Charts: Histograms, scatter plots, box plots.

### Composition: 

When users want to understand how a whole is made up of its parts, and what proportion each part contributes to the total. This is useful for illustrating, for example, the percentage contribution of each product to total sales, or the distribution of opinions from a survey.

• Key Questions: "What percentage does each part contribute to the whole?", "Do you want to see changes in composition over time?"
• Suitable Charts: Pie charts (for a single point in time), stacked bar/area charts (for compositional changes over time).

### Relationship: 

When users want to identify correlations or associations between two or more variables. This is used to analyze, for instance, the relationship between advertising expenditure and sales, or temperature and ice cream sales.

• Key Questions: "Do these two data sets influence each other?", "Are you looking for any patterns or correlations?"
• Suitable Charts: Scatter plots, bubble charts.

### Trend: 

When users want to see how data changes over time and predict future variations. This is crucial for understanding monthly user growth trends or stock price fluctuations.

• Key Questions: "Do you want to see changes over time?", "Are you looking to predict the future?"
• Suitable Charts: Line charts, area charts, sparkline charts.

### Location/Geographic: 

When data is associated with specific geographical locations, users want to visualize it on a map to identify regional patterns.

• Key Questions: "Where is the data concentrated?", "Do you want to see regional differences?"
• Suitable Charts: Maps, heatmaps.

By categorizing objectives in this way, designers can delve deeper into what clients and users truly want. It's about eliciting specific goals, such as "I want to gain this insight through that data," rather than just a request for "a chart." This is the first step in selecting the correct chart type and is crucial for making visualizations powerful decision-making tools, not just pretty pictures.

## Question 2: What data do you have?

Once the visualization's purpose is clearly defined, the next step is to understand the characteristics of the available data. Even with a great visualization objective, if the data doesn't support it or if the data type isn't suitable, you won't achieve the desired outcome. It's crucial to understand the 'shape' of your data.

The main characteristics of data can be classified as follows:

### Data Type:

#### Quantitative Data: 
Measurable numerical values, divided into discrete (countable) or continuous (measurable) types. (e.g., sales revenue, number of users, temperature, time)
• Characteristics: Suitable for comparison, trend, and distribution analysis; applicable to most chart types.

#### Qualitative Data: 
Non-numerical data expressed as categories, descriptions, or text. (e.g., product categories, customer feedback, region names, gender)
• Characteristics: Primarily used for frequency analysis and identifying relationships; becomes even more powerful when combined with quantitative data.

#### Time-Series Data: 
Data recorded in a specific chronological order. (e.g., daily/monthly sales, annual population changes)
• Characteristics: Essential for trend and change analysis; suitable for charts with a time axis (line charts, area charts, etc.).

### Data Volume and Range:

The appropriate chart type varies depending on whether there are few or many data points, and whether the value range is wide or narrow. Too many data points can make a chart complex, while too few might not reveal meaningful patterns.

• Key Questions: "What is the total volume of data?", "What is the range of values?", "Are there any outliers?"

### Data Structure:

It's also important whether the data is organized in a structured table format or is unstructured (text, images, etc.). For visualization, generally structured data is required.

• Key Questions: "How is the data organized?", "What columns (variables) exist?", "Are there any missing values?"

The answers to these questions are critical for determining the feasibility of visualization and whether data preprocessing (cleaning and transformation) is necessary.

## Question 3: How is the data being updated?

The vitality of a data visualization dashboard depends on the freshness and consistency of its data. Understanding how data is updated is essential for determining the visualization's real-time requirements and technical implementation methods.

Considerations based on the update method include:

### Update Frequency:

#### Real-time: 
When data continuously flows in and must be immediately reflected in the visualization (e.g., stock prices, server monitoring).
• Considerations: Crucial to have the technical capability to process and render large volumes of data quickly. Requires chart libraries and infrastructure that can reflect updates without performance degradation.

#### Scheduled Updates: 
When data is refreshed at predefined intervals (e.g., hourly, daily, weekly, monthly sales reports, weekly performance dashboards).
• Considerations: Ensure that regular Extract, Transform, Load (ETL) processes are stable. Managing load during update times is also important.

#### Manual Updates: 
When users directly upload or manually refresh data (e.g., quarterly survey results, annual reports).
• Considerations: Since update frequency is low, focus more on data integrity validation and clearly guide users through the update process.

### Data Stability and Reliability:

You need to confirm that the data pipeline operates stably, updating without missing values or errors. Unstable data diminishes the reliability of visualizations.

• Key Questions: "Is the data source stable?", "Is there a possibility of data loss or errors?"

### Historical Data Management:

How historical data is stored and managed is also important. Trend analysis requires historical data for a sufficient period, and an efficient structure for retrieving it is crucial.

• Key Questions: "How far back is the historical data stored?", "What level of performance is needed to visualize historical data?"

By answering these questions, designers can identify the technical requirements for visualization and establish a robust foundation for the dashboard to continuously provide users with meaningful information.`
  },
  {
    id: "7",
    title: "Search Bar: Beyond the Basic Experience",
    excerpt: "Recently, I had the opportunity to deep dive into search bar design. As I explored numerous websites and apps, I constantly pondered how to deliver a better search experience for users.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "UX Design",
    date: "July 15, 2024",
    readTime: "12 min read",
    featured: true,
    content: `Search Bar: Beyond the Basic Experience

Recently, I had the opportunity to deep dive into search bar design. As I explored numerous websites and apps, I constantly pondered how to deliver a better search experience for users. This process was personally very intriguing.

As a UX/UI designer, I've explored various ideas on how to create a more effective and intuitive search experience, integrating these concepts with AI. The search bar has been a common element since the inception of the internet, yet it has seen little real change.

However, with the advancement of AI technology, new questions are emerging about the act of searching itself. Therefore, in this article, I want to share my thoughts on a UX-focused search bar enhanced with AI.

## Reflecting on User Goal Achievement Speed

Before beginning my research, I asked myself an important question:
'How quickly can users achieve their search goals?'
To answer this, I focused on the speed and efficiency of users during my research. Of course, the objective of a search bar varies depending on the user's intent and context.

The key factor I considered in understanding this search bar was 'User Clarity.' Sometimes, design needs to present new information or features that users haven't thought of, but most of the time, it's essential to design according to user needs.

I considered user clarity in two scenarios. The first is when a user knows exactly what they want and uses the search bar to find precise and quick information. The second is when a user has a goal but isn't sure what they're looking for, so they use the search to explore options.

For example, let's take a user who wants to buy vitamins. If they already know the specific product and are looking for the best price, that requires a different search UX than if they don't know the specific product and are exploring various options. The former needs quick and accurate results, while the latter requires various filters and recommendations to help the user explore and decide.

## Search Bar UI/UX Design Based on User Goals

Let's examine how the UI/UX design of the search bar can be structured differently from these two perspectives, based on the user's search goal.

### Search Bar UI for Users with Clear Goals: Simplicity is Key

When users know exactly what they're looking for, the search bar UI should focus on efficiency and accuracy. In such cases, the search bar needs to be designed in a straightforward and intuitive way, allowing users to quickly reach the desired results. Unnecessary steps are eliminated, and only essential elements are included to make the search bar noticeable and easy to use.

Example Flow (Clear Goal):

• User Input: The user starts typing 'iPhone 16 case' into the search bar.
• Instant Autocomplete/Suggestions: As they type, exact search terms like 'iPhone 16 case' or 'iPhone 16 clear case' appear in a dropdown.
• Immediate Results Display: When the user clicks a suggested term or presses Enter, a list of relevant cases appears instantly, with no loading time.
• Minimal Filters/Sorting: Only essential sorting options like 'Newest' or 'Price' are provided to help users quickly find what they need.

### Search Bar UI for Users in Need of Exploration: Providing Diversity

On the other hand, when users start their search without a clear goal, the search bar UI should adopt a more exploratory and suggestive approach. In this scenario, the design shouldn't just focus on the search bar itself but also incorporate additional elements and classifications to inspire users and help them explore more options.

Example Flow (Needs Exploration):

• User Input: The user starts typing 'coffee' into the search bar.
• Related Searches and Category Suggestions: The dropdown displays various related searches and categories like 'coffee shops near me,' 'coffee bean recommendations,' 'home barista recipes,' or 'coffee accessories.'
• AI-powered Recommendations/Curation: AI recommendation messages like "Having trouble choosing? Let us recommend coffee based on your taste!" appear, or personalized recommendations based on user search history (e.g., "Ethiopian beans you might like, OOO") are presented.
• Search Results Page: The search results page features various curated sections like 'Bestsellers,' 'New Arrivals,' and 'Discounted Items,' along with detailed filter options such as 'Bean Type,' 'Brewing Method,' 'Price Range,' and 'Flavor Profile.'
• Visual Exploration Prompts: Relevant images or popular product previews are prominently displayed to encourage visual exploration.

## Core Search Bar Features

The search bar has become a pivotal axis in the user experience, transcending mere searching. Especially, the dropdown feature has gradually improved the way users find and navigate information, with the advent of various search services and the advancement of personalized data technology.

Here are some essential features that designers and planners should consider when building a Search Bar now.

### Autocomplete Feature:

Description: As the user begins to type a few letters, autocomplete predicts the rest, aiding in quick completion.
Example: When a user intends to type "apple," entering just "a" could bring up words like "apple," "application," etc., in the dropdown. This significantly reduces the typing burden, especially for mobile users.

### Search Suggestions:

Description: It offers real-time related search terms or popular searches to assist the user's search.
Example: If a user searches for "coffee," suggestions such as "coffee near me," "coffee recipes," "coffee shops" might appear. These suggestions can lead users to new coffee-related information they were unaware of.

### Spelling and Grammar Correction:

Description: It recognizes typos or grammatical errors made by the user and suggests the correct form.
Example: If a user types "restrant," the dropdown might suggest, "Did you mean: restaurant?" This helps prevent failed searches due to typos and allows users to reach their desired results faster.

### Personalized Search Results:

Description: It provides personalized search suggestions based on the user's past searches, location, preferences, etc.
Example: When searching for travel destinations, the user may receive suggestions for cities or tourist spots related to places they have visited in the past or their preferred travel style. This offers a tailored search experience, enhancing user satisfaction.

## AI Era: New Insights in Search Bar Design

As an AI Product designer, a key insight I've recently observed is that general AI search still has clear limitations for users with specific search goals. No matter how powerful the AI, it's difficult for it to precisely grasp a user's subtle intentions or complex conditions. Rather, many users tend to prefer directly adjusting filter settings and viewing granular results over the abstract outcomes presented by AI.

This suggests that we should move away from the illusion that AI will 'magically' solve everything. Instead, we should view AI as a tool to support and expand the user's search experience. In essence, AI can provide excellent initial suggestions and context, but the ultimate 'power of choice' should remain with the user. For this, intuitive filtering and sorting UIs are essential.

Therefore, future search bar design must integrate powerful interaction elements that allow users to freely adjust and explore search results to fit their needs, alongside AI's intelligent suggestions. 'AI-Human collaborative search', where users can control even the minute details within the broader information provided by AI, will be key.

## Additional Suggestions & Future Vision for AI Features

### Refining Complex Queries via Natural Language Processing (NLP) with User Control:

Even if AI understands complex queries like "restaurants near Gangnam that are kid-friendly, pet-friendly, and good for dinner," users should still be able to add or remove filters directly to adjust the results if AI's initial output doesn't perfectly match all their conditions.

Example: When AI recommends a list of restaurants, always display detailed filters like "Cuisine Type," "Price Range," "Parking Availability," and "Kids' Play Area" at the bottom, allowing users to apply them immediately.

### Integrating Visual Search with User Command:

Adding image or voice input icons to the search bar alongside text input would allow users to search for information and even make purchases using photos (e.g., of clothing, plants). Even if AI recommends 'similar' products, users should be able to apply filters like 'price range,' 'brand,' or 'material' directly to find exactly what they're looking for.

### 'Adjustment' Features for Personalized Conversational AI Agents:

AI assistants could learn user search patterns to proactively suggest relevant information or engage in a dialogue during the search process. However, if the information provided by the assistant isn't perfect, users need the ability to add or modify filters conversationally, for instance, by saying, "No, I want this specific condition."

## Challenges and Considerations

### AI Bias and Error Mitigation with User Feedback:

It's crucial to acknowledge the potential for AI to provide inaccurate or biased information. Design approaches should aim to mitigate this. It's essential to create mechanisms where users can easily provide feedback (e.g., 'accurate,' 'inaccurate') on AI search results to help AI learn and improve its reliability.

### Implementation Complexity and Iterative Approaches:

Consider the technical complexity and cost involved in developing such advanced search features. Instead of implementing all features at once, an agile approach is crucial—gradually expanding and enhancing functionalities based on user feedback.

Ultimately, AI-powered search bars will not just change how users find information; they will revolutionize how we interact with the world. As designers, we must continuously ponder how to make this powerful tool more ethical, inclusive, and efficient.`
  },
  {
    id: "6",
    title: "Behind 30,000 Users",
    excerpt: "The title of a startup co-founder sounded pretty grand, but for me, that year was about bridging the gap between expectation and reality.",
    image: "/images/startup-1.png",
    category: "Startup",
    date: "Feb 11, 2025",
    readTime: "7 min read",
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
                      <CardFooter className="flex justify-start pt-2">
                        <div className="text-sm text-muted-foreground">
                          {post.readTime}
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
                <TabsTrigger value="Data Design">Data Design</TabsTrigger>
                <TabsTrigger value="UX Design">UX Design</TabsTrigger>
                <TabsTrigger value="Startup">Startup</TabsTrigger>
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