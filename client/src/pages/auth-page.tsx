import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { Redirect } from "wouter";
import { Loader2, Shield, LockKeyhole, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { motion, AnimatePresence } from "framer-motion";

const formFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const iconAnimation = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const staggeredContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggeredItem = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const { t, language } = useLanguage();

  const loginForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
  });

  const registerForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex min-h-[80vh] gap-8 items-center" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <motion.div 
        className="flex-1"
        initial="hidden"
        animate="visible"
        variants={formFadeIn}
      >
        <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t("auth.login")}</TabsTrigger>
            <TabsTrigger value="register">{t("auth.register")}</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <motion.div variants={iconAnimation} initial="initial" animate="animate">
                    <LockKeyhole className="h-8 w-8 mb-2 text-primary mx-auto" />
                  </motion.div>
                  <CardTitle className="text-center">{t("auth.welcome")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.form
                    variants={staggeredContainer}
                    initial="hidden"
                    animate="show"
                    onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))}
                    className="space-y-4"
                  >
                    <motion.div variants={staggeredItem} className="space-y-2">
                      <Label htmlFor="username">{t("auth.username")}</Label>
                      <Input
                        id="username"
                        {...loginForm.register("username")}
                        required
                        className="transition-all duration-200 focus:scale-[1.01]"
                      />
                    </motion.div>
                    <motion.div variants={staggeredItem} className="space-y-2">
                      <Label htmlFor="password">{t("auth.password")}</Label>
                      <Input
                        id="password"
                        type="password"
                        {...loginForm.register("password")}
                        required
                        className="transition-all duration-200 focus:scale-[1.01]"
                      />
                    </motion.div>
                    <motion.div variants={staggeredItem}>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          t("auth.login")
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <motion.div variants={iconAnimation} initial="initial" animate="animate">
                    <Mail className="h-8 w-8 mb-2 text-primary mx-auto" />
                  </motion.div>
                  <CardTitle className="text-center">{t("auth.create")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.form
                    variants={staggeredContainer}
                    initial="hidden"
                    animate="show"
                    onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data))}
                    className="space-y-4"
                  >
                    <motion.div variants={staggeredItem} className="space-y-2">
                      <Label htmlFor="reg-email">{t("auth.email")}</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        {...registerForm.register("email")}
                        required
                        className="transition-all duration-200 focus:scale-[1.01]"
                      />
                    </motion.div>
                    <motion.div variants={staggeredItem} className="space-y-2">
                      <Label htmlFor="reg-username">{t("auth.username")}</Label>
                      <Input
                        id="reg-username"
                        {...registerForm.register("username")}
                        required
                        className="transition-all duration-200 focus:scale-[1.01]"
                      />
                    </motion.div>
                    <motion.div variants={staggeredItem} className="space-y-2">
                      <Label htmlFor="reg-password">{t("auth.password")}</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        {...registerForm.register("password")}
                        required
                        className="transition-all duration-200 focus:scale-[1.01]"
                      />
                    </motion.div>
                    <motion.div variants={staggeredItem}>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={registerForm.formState.isSubmitting}
                      >
                        {registerForm.formState.isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          t("auth.register")
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                </CardContent>
              </Card>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>

      <motion.div 
        className="flex-1 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5 
            }}
          >
            <Shield className="h-32 w-32 mx-auto text-primary" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p 
            className="text-muted-foreground max-w-md mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}