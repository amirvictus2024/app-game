import { createContext, ReactNode, useContext, useState, useEffect } from "react";

type Language = "en" | "fa";
type Translations = Record<Language, Record<string, string>>;

const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.login": "Login",
    "nav.logout": "Logout",
    "nav.cart": "Cart",
    "nav.profile": "Profile",
    "hero.title": "Secure Your Digital Infrastructure",
    "hero.subtitle": "Professional DNS services and WireGuard configurations for individuals and enterprises",
    "products.dns": "DNS Services",
    "products.wireguard": "WireGuard Configurations",
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.welcome": "Welcome back",
    "auth.create": "Create an account",
    "auth.username": "Username",
    "auth.password": "Password",
    "auth.email": "Email",
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.checkout": "Proceed to Checkout",
    "cart.total": "Total",
    "profile.title": "User Profile",
    "profile.orders": "My Orders",
    "profile.settings": "Settings",
    "checkout.title": "Checkout",
    "checkout.payment": "Payment",
    "checkout.complete": "Complete Order",
    "checkout.processing": "Processing...",
    "checkout.success": "Order Completed",
    "checkout.features": "Product Features",
    "notification.error": "Error",
    "notification.success": "Success",
    "form.required": "This field is required",
    "form.invalid_email": "Invalid email address",
    "form.min_length": "Must be at least {0} characters",
    "form.error": "An error occurred"
  },
  fa: {
    "nav.home": "خانه",
    "nav.login": "ورود",
    "nav.logout": "خروج",
    "nav.cart": "سبد خرید",
    "nav.profile": "حساب کاربری",
    "hero.title": "زیرساخت دیجیتال خود را ایمن کنید",
    "hero.subtitle": "خدمات حرفه‌ای DNS و پیکربندی WireGuard برای افراد و سازمان‌ها",
    "products.dns": "خدمات DNS",
    "products.wireguard": "پیکربندی‌های WireGuard",
    "auth.login": "ورود",
    "auth.register": "ثبت نام",
    "auth.welcome": "خوش آمدید",
    "auth.create": "ایجاد حساب کاربری",
    "auth.username": "نام کاربری",
    "auth.password": "رمز عبور",
    "auth.email": "ایمیل",
    "cart.title": "سبد خرید",
    "cart.empty": "سبد خرید شما خالی است",
    "cart.checkout": "تکمیل خرید",
    "cart.total": "مجموع",
    "profile.title": "پروفایل کاربری",
    "profile.orders": "سفارش‌های من",
    "profile.settings": "تنظیمات",
    "checkout.title": "تکمیل خرید",
    "checkout.payment": "پرداخت",
    "checkout.complete": "تکمیل سفارش",
    "checkout.processing": "در حال پردازش...",
    "checkout.success": "سفارش تکمیل شد",
    "checkout.features": "ویژگی‌های محصول",
    "notification.error": "خطا",
    "notification.success": "موفقیت",
    "form.required": "این فیلد الزامی است",
    "form.invalid_email": "ایمیل نامعتبر است",
    "form.min_length": "حداقل {0} کاراکتر باید باشد",
    "form.error": "خطایی رخ داده است"
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, ...args: any[]) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.classList.remove("lang-en", "lang-fa");
    document.documentElement.classList.add(`lang-${language}`);
  }, [language]);

  const t = (key: string, ...args: any[]) => {
    const text = translations[language][key] || key;
    return args.reduce((str, arg, i) => str.replace(`{${i}}`, arg), text);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}