import { motion } from "framer-motion";
import { mockProducts } from "@shared/schema";
import ProductCard from "@/components/product-card";
import { useLanguage } from "@/hooks/use-language";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const { t, language } = useLanguage();
  const dnsProducts = mockProducts.filter(p => p.type === 'dns');
  const wireguardProducts = mockProducts.filter(p => p.type === 'wireguard');

  return (
    <div className="space-y-12" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">
          {t('hero.title')}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
      </motion.section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">{t('products.dns')}</h2>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {dnsProducts.map(product => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">{t('products.wireguard')}</h2>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {wireguardProducts.map(product => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}