import React from "react";

// Mock project data for EcoTrack
export const ecoTrackProject = {
  name: "EcoTrack",
  tagline: "Sustainability monitoring app for eco-conscious consumers",
  description: "EcoTrack helps users track their carbon footprint and make more sustainable choices in daily life.",
  challenge: "Design an intuitive mobile application that helps users understand their environmental impact and provides actionable suggestions to reduce carbon footprint.",
  duration: "12 weeks",
  role: "Lead Product Designer",
  team: "1 Product Manager, 2 Developers, 1 Designer",
  tools: ["Figma", "Principle", "Miro", "InVision"],
  sections: [
    {
      id: "research",
      title: "User Research",
      description: "Conducted interviews with 15 environmentally conscious consumers to understand their needs and pain points.",
      insights: [
        "Users want to see tangible impact of their sustainability efforts",
        "Simplicity in data visualization is key to continued engagement",
        "Gamification elements increase motivation",
        "Social sharing features important for accountability"
      ],
      artifacts: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
          alt: "User interview session",
          caption: "User interview sessions focused on understanding current habits and motivations"
        }
      ]
    },
    {
      id: "wireframes",
      title: "Wireframes & Information Architecture",
      description: "Created low-fidelity wireframes to establish the core user flow and information hierarchy.",
      artifacts: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
          alt: "Wireframes for EcoTrack app",
          caption: "Early wireframes showing the main dashboard, tracking screen, and achievement system"
        }
      ],
      code: {
        language: "jsx",
        fileName: "DashboardWireframe.jsx",
        snippet: `function DashboardWireframe() {
  return (
    <div className="dashboard-container">
      <header className="app-header">
        <h1>EcoTrack</h1>
        <button className="profile-button">Profile</button>
      </header>
      
      <section className="carbon-footprint-summary">
        <h2>Your Carbon Footprint</h2>
        <div className="metrics-container">
          <div className="metric">
            <span className="metric-value">12.4</span>
            <span className="metric-unit">tons CO2/year</span>
          </div>
          <div className="comparison">
            <span>-18% compared to last month</span>
          </div>
        </div>
      </section>
      
      <section className="category-breakdown">
        <h3>Impact Categories</h3>
        <ul className="categories">
          <li className="category-item">
            <span className="category-name">Transportation</span>
            <div className="category-bar" style={{ width: '75%' }}></div>
            <span className="category-value">4.2 tons</span>
          </li>
          {/* More categories */}
        </ul>
      </section>
    </div>
  );
}`
      }
    },
    {
      id: "ui-design",
      title: "UI Design & Design System",
      description: "Developed a comprehensive design system with an eco-friendly color palette and sustainable-themed components.",
      colorPalette: [
        { name: "Leaf Green", hex: "#4CAF50", usage: "Primary actions, success states" },
        { name: "Ocean Blue", hex: "#2196F3", usage: "Water-related metrics, links" },
        { name: "Sun Yellow", hex: "#FFC107", usage: "Energy usage, warnings" },
        { name: "Earth Brown", hex: "#795548", usage: "Land/food consumption metrics" },
        { name: "Carbon Gray", hex: "#607D8B", usage: "Inactive states, secondary text" }
      ],
      typography: {
        fontFamily: "Montserrat",
        headings: "Montserrat SemiBold",
        body: "Montserrat Regular"
      },
      artifacts: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
          alt: "EcoTrack design system",
          caption: "Design system components showing buttons, cards, and navigation elements"
        }
      ],
      code: {
        language: "css",
        fileName: "design-tokens.css",
        snippet: `:root {
  /* Color Palette */
  --color-leaf-green: #4CAF50;
  --color-ocean-blue: #2196F3;
  --color-sun-yellow: #FFC107;
  --color-earth-brown: #795548;
  --color-carbon-gray: #607D8B;
  
  /* Background Colors */
  --color-background-primary: #FFFFFF;
  --color-background-secondary: #F5F7FA;
  --color-background-tertiary: #E8F5E9;
  
  /* Text Colors */
  --color-text-primary: #263238;
  --color-text-secondary: #546E7A;
  --color-text-tertiary: #78909C;
  
  /* Typography */
  --font-family-primary: 'Montserrat', sans-serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border Radius */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  --border-radius-full: 9999px;
}`
      }
    },
    {
      id: "final-design",
      title: "Final Design & Prototypes",
      description: "Created high-fidelity mockups and interactive prototypes for user testing and development handoff.",
      artifacts: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
          alt: "EcoTrack final design",
          caption: "Final design of the EcoTrack dashboard showing carbon footprint metrics"
        }
      ],
      screens: [
        {
          name: "Dashboard",
          description: "Main dashboard showing user's carbon footprint overview and quick actions",
          imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        },
        {
          name: "Activity Tracking",
          description: "Screen for logging daily activities that impact carbon footprint",
          imageUrl: "https://images.unsplash.com/photo-1576153192396-180ecef2a715?ixlib=rb-1.2.1&auto=format&fit=crop&w=1334&q=80",
        },
        {
          name: "Challenges",
          description: "Gamified challenges to encourage sustainable behaviors",
          imageUrl: "https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        }
      ],
      code: {
        language: "jsx",
        fileName: "DashboardScreen.jsx",
        snippet: `import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { CarbonFootprintCard } from '../components/CarbonFootprintCard';
import { ActivityCard } from '../components/ActivityCard';
import { ChallengesList } from '../components/ChallengesList';

export const DashboardScreen = () => {
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [5.2, 4.8, 5.0, 4.3, 4.5, 3.8, 4.0],
        color: (opacity = 1) => \`rgba(76, 175, 80, \${opacity})\`
      }
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>EcoTrack</Text>
        <Text style={styles.subheading}>Your Sustainability Dashboard</Text>
      </View>

      <CarbonFootprintCard 
        current={12.4} 
        previous={15.1} 
        target={10.0} 
      />
      
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>This Week's Impact</Text>
        <LineChart
          data={weeklyData}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 1,
            color: (opacity = 1) => \`rgba(76, 175, 80, \${opacity})\`,
            labelColor: (opacity = 1) => \`rgba(38, 50, 56, \${opacity})\`,
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <Text style={styles.sectionTitle}>Recent Activities</Text>
      <ActivityCard 
        icon="car" 
        title="Car Trip" 
        impact={2.3} 
        time="Today, 10:15 AM" 
      />
      <ActivityCard 
        icon="shopping-cart" 
        title="Grocery Shopping" 
        impact={0.8} 
        time="Yesterday, 5:30 PM" 
      />
      
      <Text style={styles.sectionTitle}>Challenges</Text>
      <ChallengesList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 24,
    backgroundColor: '#4CAF50',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  subheading: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    color: '#263238',
  },
  chartContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
});`
      }
    },
    {
      id: "testing",
      title: "User Testing & Iteration",
      description: "Conducted usability testing with 8 participants to validate the design and gather feedback for improvements.",
      insights: [
        "Users found the dashboard clear and informative",
        "Some users struggled with activity logging process",
        "Participants wanted more personalized suggestions based on their habits",
        "Achievement system was highly motivating for most users"
      ],
      iterations: [
        "Simplified activity logging with quick templates",
        "Added personalized tip section on dashboard",
        "Enhanced social sharing features",
        "Improved accessibility for color-blind users"
      ],
      artifacts: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
          alt: "User testing session",
          caption: "User testing session with prototype on mobile device"
        }
      ]
    },
    {
      id: "outcomes",
      title: "Outcomes & Impact",
      description: "The EcoTrack app launched successfully with high user engagement and positive feedback.",
      results: [
        "87% user retention after first month",
        "Average 22% reduction in carbon footprint among active users",
        "Featured in GreenTech Magazine as 'App of the Month'",
        "Over 50,000 downloads in first quarter"
      ],
      testimonial: {
        quote: "EcoTrack has completely changed how I think about my daily choices. The visual feedback and challenges make it fun to be more eco-conscious.",
        author: "Sarah T., EcoTrack User"
      },
      artifacts: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
          alt: "App analytics dashboard",
          caption: "Analytics showing user engagement and impact metrics"
        }
      ]
    }
  ]
};