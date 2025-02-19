import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Product } from "@shared/schema";
import { Check } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";

export default function ProductCard({ product }: { product: Product }) {
  const [, setLocation] = useLocation();
  const { t, language } = useLanguage();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{product.name}</span>
          <span className="text-2xl font-bold">${product.price}</span>
        </CardTitle>
        <p className="text-muted-foreground">{product.description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li 
              key={index} 
              className="flex items-center gap-2 text-muted-foreground"
              dir={language === 'fa' ? 'rtl' : 'ltr'}
            >
              <Check className="h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => setLocation(`/checkout/${product.id}`)}
        >
          {t("cart.checkout")}
        </Button>
      </CardFooter>
    </Card>
  );
}