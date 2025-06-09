import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useAuth } from "./AuthContext";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion } from "framer-motion";

interface AuthPageProps {
  isEmbedded?: boolean;
}

export function AuthPage({ isEmbedded = false }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const { continueAsGuest } = useAuth();
  
  const handleToggleForm = () => {
    setActiveTab(activeTab === "login" ? "signup" : "login");
  };
  
  const handleGuestLogin = () => {
    continueAsGuest();
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
  
  return (
    <motion.div 
      className={`flex flex-col ${isEmbedded ? "h-full w-full" : "h-full overflow-hidden"}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`${isEmbedded ? "flex-1" : "flex-1 overflow-auto"} flex flex-col items-center justify-center p-4`}>
        {!isEmbedded && (
          <motion.div className="w-full max-w-md mb-8 text-center" variants={itemVariants}>
            <div className="flex justify-center mb-4">
              <motion.div 
                className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              >
                AD
              </motion.div>
            </div>
            <motion.h1 
              className="text-2xl font-bold mb-2"
              variants={itemVariants}
            >
              YONGWOO.KIM Portfolio
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              variants={itemVariants}
            >
              Welcome to my interactive design portfolio. Please sign in to explore my projects and chat with me.
            </motion.p>
          </motion.div>
        )}
        
        <motion.div 
          className="w-full max-w-md"
          variants={itemVariants}
        >
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="w-full mb-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {activeTab === "login" ? (
            <LoginForm onToggleForm={handleToggleForm} onGuestLogin={handleGuestLogin} />
          ) : (
            <SignupForm onToggleForm={handleToggleForm} />
          )}
        </motion.div>
      </div>
      
      {!isEmbedded && (
        <motion.div 
          className="p-4 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} YONGWOO.KIM. All rights reserved.</p>
        </motion.div>
      )}
    </motion.div>
  );
}