import { Button } from "@/components/ui/button";
import ThemeToggle from "./theme-toggle";
import LanguageToggle from "./language-toggle";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { Shield, ShoppingCart, User } from "lucide-react";

export default function NavHeader() {
  const { user, logoutMutation } = useAuth();
  const { t } = useLanguage();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 font-semibold text-lg">
            <Shield className="h-6 w-6" />
            SecureNet
          </a>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageToggle />
          {user ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">{t("nav.cart")}</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/profile">
                  <User className="h-5 w-5" />
                  <span className="sr-only">{t("nav.profile")}</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                {t("nav.logout")}
              </Button>
            </>
          ) : (
            <Button variant="default" asChild>
              <Link href="/auth">{t("nav.login")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}