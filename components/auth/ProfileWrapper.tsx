import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import { UserProfile } from "./UserProfile";
import { AuthPage } from "./AuthPage";

export function ProfileWrapper() {
  const { isAuthenticated } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className="h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isAuthenticated ? (
        <UserProfile />
      ) : (
        <div className="flex flex-col h-full p-6">
          <motion.div 
            className="mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-2">Profile Access</h1>
            <p className="text-muted-foreground">
              Please log in or create an account to access your profile
            </p>
          </motion.div>
          
          <div className="flex-1 flex items-center justify-center">
            <AuthPage isEmbedded={true} />
          </div>
        </div>
      )}
    </motion.div>
  );
}