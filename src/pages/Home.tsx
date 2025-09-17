import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DietPlanCard } from "@/components/DietPlanCard";
import { DietDetailModal } from "@/components/DietDetailModal";
import heroImage from "@/assets/hero-diet-image.jpg";

const dietPlans = [
  {
    id: "balanced",
    title: "Balanced Global Diet",
    description: "Well-rounded nutrition with all food groups adapted to your regional preferences for sustainable lifestyle.",
    benefits: ["Sustainable", "All Nutrients", "Culturally Appropriate"],
    calories: "1500-2200 calories",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
    detailedInfo: {
      overview: "The Balanced Global Diet emphasizes a harmonious combination of macronutrients from diverse food sources, adapted to local and regional food preferences. This approach ensures nutritional completeness while respecting cultural dietary patterns and food availability.",
      mealStructure: ["3 main meals", "2 healthy snacks", "Balanced portions", "Seasonal ingredients"],
      restrictions: ["No major food restrictions", "Adaptable to local cuisines", "Flexible portion sizes"],
      nutritionFocus: ["Complex carbohydrates (45-65%)", "Lean proteins (15-25%)", "Healthy fats (20-35%)", "Rich in vitamins and minerals"],
      sampleMeals: {
        breakfast: ["Oatmeal with fruits and nuts", "Whole grain toast with avocado", "Greek yogurt with berries", "Traditional breakfast options from your region"],
        lunch: ["Quinoa salad with vegetables", "Grilled protein with steamed vegetables", "Lentil soup with whole grain bread", "Regional rice and protein dishes"],
        dinner: ["Baked fish with roasted vegetables", "Stir-fried tofu with brown rice", "Lean meat with sweet potato", "Traditional balanced regional dishes"],
        snacks: ["Mixed nuts and fruits", "Hummus with vegetables", "Greek yogurt", "Local healthy snack options"]
      },
      healthBenefits: ["Supports overall health and longevity", "Maintains stable blood sugar levels", "Promotes healthy weight management", "Reduces risk of chronic diseases", "Supports digestive health"],
      tips: ["Focus on whole, unprocessed foods", "Include variety in your meals", "Adapt portions to your activity level", "Stay hydrated throughout the day", "Listen to your body's hunger cues"]
    }
  },
  {
    id: "mediterranean",
    title: "Mediterranean Diet",
    description: "Traditional eating pattern emphasizing whole foods, healthy fats, and moderate wine consumption.",
    benefits: ["Heart Health", "Brain Function", "Longevity"],
    calories: "1500-2200 calories",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop",
    detailedInfo: {
      overview: "The Mediterranean Diet is inspired by the traditional dietary patterns of countries bordering the Mediterranean Sea. It emphasizes plant-based foods, healthy fats, and moderate amounts of fish and poultry, with limited red meat consumption.",
      mealStructure: ["Olive oil as primary fat", "Daily fruits and vegetables", "Weekly fish and seafood", "Moderate dairy consumption"],
      restrictions: ["Limited red meat", "Minimal processed foods", "Reduced refined sugars", "Optional moderate wine with meals"],
      nutritionFocus: ["High in monounsaturated fats", "Rich in omega-3 fatty acids", "Abundant antioxidants", "High fiber content"],
      sampleMeals: {
        breakfast: ["Greek yogurt with honey and walnuts", "Whole grain bread with olive oil and tomato", "Fresh fruit with nuts", "Mediterranean herb omelet"],
        lunch: ["Greek salad with feta and olives", "Grilled fish with vegetables", "Hummus with pita and vegetables", "Mediterranean lentil soup"],
        dinner: ["Baked salmon with herbs", "Ratatouille with whole grains", "Grilled chicken with olive tapenade", "Seafood paella"],
        snacks: ["Mixed olives and nuts", "Fresh fruits", "Small portion of cheese", "Vegetable crudités with olive oil"]
      },
      healthBenefits: ["Reduces cardiovascular disease risk", "Supports brain health and cognitive function", "May increase longevity", "Anti-inflammatory properties", "Supports healthy weight management"],
      tips: ["Use extra virgin olive oil liberally", "Eat fish at least twice a week", "Choose whole grains over refined", "Enjoy meals with family and friends", "Stay physically active"]
    }
  },
  {
    id: "south_asia",
    title: "South Asian Wellness",
    description: "Ayurvedic principles with traditional spices, lentils, and vegetables for optimal health and digestion.",
    benefits: ["Digestive Health", "Anti-Inflammatory", "Traditional Wisdom"],
    calories: "1400-2000 calories",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
    detailedInfo: {
      overview: "South Asian Wellness diet combines ancient Ayurvedic principles with modern nutritional science. It emphasizes the use of traditional spices, legumes, and vegetables while considering individual constitution (dosha) for optimal health and digestion.",
      mealStructure: ["Turmeric and spices daily", "Legumes and lentils", "Fresh vegetables and fruits", "Mindful eating practices"],
      restrictions: ["Limited processed foods", "Mindful of food combinations", "Seasonal eating", "Avoiding foods that don't suit your dosha"],
      nutritionFocus: ["Anti-inflammatory spices", "Plant-based proteins", "Complex carbohydrates", "Digestive herbs and spices"],
      sampleMeals: {
        breakfast: ["Turmeric golden milk with oats", "Upma with vegetables", "Poha with peanuts and curry leaves", "Dosa with sambar"],
        lunch: ["Dal with rice and ghee", "Vegetable curry with roti", "Khichdi with yogurt", "Mixed vegetable sambar"],
        dinner: ["Light dal soup", "Stir-fried vegetables with quinoa", "Mung bean curry", "Vegetable pulao with raita"],
        snacks: ["Roasted chickpeas with spices", "Fresh fruits with chaat masala", "Herbal teas", "Nuts and seeds mix"]
      },
      healthBenefits: ["Improves digestive health", "Reduces inflammation", "Supports immune system", "Balances metabolism", "Promotes mental clarity"],
      tips: ["Eat according to your dosha", "Include spices like turmeric and ginger daily", "Practice mindful eating", "Drink warm water throughout the day", "Eat your largest meal at midday"]
    }
  },
  {
    id: "east_asia",
    title: "East Asian Balance",
    description: "Traditional Chinese and Japanese nutrition focusing on balance, fresh ingredients, and longevity.",
    benefits: ["Longevity", "Heart Health", "Balanced Energy"],
    calories: "1300-1900 calories",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop",
    detailedInfo: {
      overview: "East Asian Balance diet draws from Traditional Chinese Medicine and Japanese dietary philosophy, emphasizing harmony between flavors, textures, and nutritional balance. It focuses on fresh, seasonal ingredients prepared simply to preserve nutrients.",
      mealStructure: ["Small frequent meals", "Balance of flavors", "Seasonal ingredients", "Minimal processing"],
      restrictions: ["Limited dairy products", "Minimal red meat", "Reduced processed foods", "No excessive portions"],
      nutritionFocus: ["High omega-3 from fish", "Antioxidant-rich vegetables", "Fermented foods", "Green tea benefits"],
      sampleMeals: {
        breakfast: ["Miso soup with tofu", "Rice porridge with vegetables", "Green tea and steamed buns", "Congee with preserved eggs"],
        lunch: ["Steamed fish with ginger", "Stir-fried vegetables with brown rice", "Ramen with vegetables and lean protein", "Bento box with variety"],
        dinner: ["Grilled salmon teriyaki", "Vegetable and tofu hot pot", "Soba noodles with tempura", "Steamed dumplings with soup"],
        snacks: ["Edamame beans", "Seaweed snacks", "Green tea", "Fresh fruits like persimmons"]
      },
      healthBenefits: ["Promotes longevity and healthy aging", "Supports cardiovascular health", "Maintains stable energy levels", "Rich in antioxidants", "Supports digestive health"],
      tips: ["Eat until 80% full (hara hachi bu)", "Include fermented foods daily", "Drink green tea regularly", "Choose seasonal ingredients", "Practice mindful eating"]
    }
  },
  {
    id: "plant_based",
    title: "Global Plant-Based",
    description: "Plant-focused nutrition incorporating diverse cuisines from around the world for optimal health.",
    benefits: ["Heart Health", "Environmental Impact", "Global Flavors"],
    calories: "1400-2000 calories",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    detailedInfo: {
      overview: "Global Plant-Based diet celebrates the diversity of plant foods from around the world. It ensures complete nutrition through strategic combinations of plant proteins, while exploring flavors and techniques from various cultures.",
      mealStructure: ["Variety of plant proteins", "Colorful vegetables and fruits", "Whole grains and legumes", "Nuts and seeds"],
      restrictions: ["No animal products", "Emphasis on whole foods", "Limited processed plant foods", "Focus on nutrient density"],
      nutritionFocus: ["Complete amino acid profiles", "Vitamin B12 supplementation", "Iron and zinc absorption", "Omega-3 fatty acids from plants"],
      sampleMeals: {
        breakfast: ["Chia pudding with berries", "Smoothie bowl with protein powder", "Oatmeal with nut butter and fruits", "Tofu scramble with vegetables"],
        lunch: ["Quinoa Buddha bowl", "Lentil curry with brown rice", "Mediterranean chickpea salad", "Mexican black bean tacos"],
        dinner: ["Stuffed bell peppers with quinoa", "Thai vegetable curry with tofu", "Italian pasta with marinara and vegetables", "Indian dal with vegetables"],
        snacks: ["Hummus with vegetables", "Trail mix with nuts and seeds", "Fresh fruit smoothie", "Roasted chickpeas"]
      },
      healthBenefits: ["Reduces risk of heart disease", "Supports healthy weight management", "High in fiber and antioxidants", "May reduce cancer risk", "Environmentally sustainable"],
      tips: ["Combine different protein sources", "Take B12 supplement", "Include vitamin C for iron absorption", "Explore global plant-based cuisines", "Focus on whole foods"]
    }
  },
  {
    id: "high_protein",
    title: "International High Protein",
    description: "Protein-rich meals from various cultures designed for muscle building and sustained energy.",
    benefits: ["Muscle Building", "Higher Metabolism", "Cultural Variety"],
    calories: "1600-2400 calories",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop",
    detailedInfo: {
      overview: "International High Protein diet incorporates protein-rich foods from various global cuisines to support muscle building, recovery, and sustained energy levels. It's designed for active individuals and those looking to increase muscle mass.",
      mealStructure: ["25-35% protein intake", "Pre and post-workout meals", "Distributed protein throughout day", "Quality protein sources"],
      restrictions: ["Focus on lean proteins", "Limited refined carbohydrates", "Controlled portion sizes", "Timing around workouts"],
      nutritionFocus: ["Complete amino acid profiles", "Leucine-rich foods", "Protein timing", "Supporting micronutrients"],
      sampleMeals: {
        breakfast: ["Greek yogurt with protein powder", "Egg white omelet with vegetables", "Protein pancakes with berries", "Turkish eggs with cheese"],
        lunch: ["Grilled chicken with quinoa", "Brazilian grilled beef with beans", "Japanese salmon teriyaki", "Greek chicken souvlaki"],
        dinner: ["Lean steak with sweet potato", "Baked cod with vegetables", "Turkey meatballs with pasta", "Indian tandoori chicken"],
        snacks: ["Protein shake with banana", "Cottage cheese with nuts", "Hard-boiled eggs", "Beef jerky with apple"]
      },
      healthBenefits: ["Supports muscle growth and repair", "Increases metabolic rate", "Improves satiety and weight management", "Maintains bone health", "Supports immune function"],
      tips: ["Eat protein within 30 minutes post-workout", "Aim for 20-30g protein per meal", "Include variety in protein sources", "Stay hydrated during training", "Don't skip carbohydrates entirely"]
    }
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [selectedDiet, setSelectedDiet] = useState<typeof dietPlans[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanSelect = (dietId: string) => {
    const diet = dietPlans.find(plan => plan.id === dietId);
    if (diet) {
      setSelectedDiet(diet);
      setIsModalOpen(true);
    }
  };

  const handleGetStarted = () => {
    navigate("/personalize");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg"></div>
              <span className="text-xl font-bold text-foreground">NutriPlan</span>
            </div>
            <Button variant="outline" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Perfect
                  <span className="block text-primary">Diet Plan</span>
                  Awaits
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Get a personalized nutrition plan tailored to your goals, lifestyle, and preferences. 
                  Science-backed recommendations for sustainable results.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" onClick={handleGetStarted} className="w-full sm:w-auto">
                  Create My Plan
                </Button>
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Science-Based</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Personalized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Easy to Follow</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={heroImage}
                  alt="Healthy foods for diet planning"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground px-6 py-3 rounded-lg shadow-lg">
                <div className="text-sm font-medium">1000+ Success Stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diet Plans Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose Your Preferred Diet Style
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Each plan is scientifically designed and can be personalized to match your specific needs and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dietPlans.map((plan) => (
              <DietPlanCard
                key={plan.id}
                title={plan.title}
                description={plan.description}
                benefits={plan.benefits}
                imageUrl={plan.imageUrl}
                calories={plan.calories}
                onSelect={() => handlePlanSelect(plan.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands who have achieved their health goals with our personalized diet plans.
            </p>
            <Button size="xl" onClick={handleGetStarted} className="px-12">
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary-dark rounded-lg"></div>
            <span className="text-lg font-bold text-foreground">NutriPlan</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 NutriPlan. Your personalized path to better health.
          </p>
        </div>
      </footer>

      <DietDetailModal
        diet={selectedDiet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}