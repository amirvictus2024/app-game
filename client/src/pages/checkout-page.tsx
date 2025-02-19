import { useRoute } from "wouter";
import { mockProducts } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const [, params] = useRoute("/checkout/:productId");
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const product = mockProducts.find(
    (p) => p.id === Number(params?.productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsComplete(true);
    toast({
      title: t("checkout.success"),
      description: `${t("checkout.success")}: ${product.name}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
      dir={language === 'fa' ? 'rtl' : 'ltr'}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("checkout.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            <div className="text-xl font-bold">${product.price}</div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">{t("checkout.features")}</h4>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: language === 'fa' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Check className="h-4 w-4 text-primary" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleCheckout}
            disabled={isProcessing || isComplete}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : isComplete ? (
              <Check className="h-4 w-4 mr-2" />
            ) : null}
            {isProcessing
              ? t("checkout.processing")
              : isComplete
              ? t("checkout.success")
              : t("checkout.complete")}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}