import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  heightUnit: z.string().min(1, "Height unit is required"),
  height: z.string().min(1, "Height is required"),
  heightFeet: z.string().optional(),
  heightInches: z.string().optional(),
  weight: z.string().min(1, "Weight is required"),
  region: z.string().min(1, "Region is required"),
  activityLevel: z.string().min(1, "Activity level is required"),
  fitnessGoal: z.string().min(1, "Fitness goal is required"),
  dietType: z.string().min(1, "Diet type is required"),
  allergies: z.string().optional(),
});

export type PersonalizationData = z.infer<typeof formSchema>;

interface PersonalizationFormProps {
  onSubmit: (data: PersonalizationData) => void;
  selectedDietType?: string;
}

export const PersonalizationForm = ({ onSubmit, selectedDietType }: PersonalizationFormProps) => {
  const form = useForm<PersonalizationData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      gender: "",
      heightUnit: "cm",
      height: "",
      heightFeet: "",
      heightInches: "",
      weight: "",
      region: "",
      activityLevel: "",
      fitnessGoal: "",
      dietType: selectedDietType || "",
      allergies: "",
    },
  });

  const heightUnit = form.watch("heightUnit");

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl text-foreground">Personalize Your Diet Plan</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Tell us about yourself to get a customized meal plan
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Info Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold">1</div>
                <h3 className="text-xl font-semibold text-foreground">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="25" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <label htmlFor="male">Male</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <label htmlFor="female">Female</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Height Unit Selection */}
              <FormField
                control={form.control}
                name="heightUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height Unit</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cm" id="cm" />
                          <label htmlFor="cm">Centimeters (cm)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ft" id="ft" />
                          <label htmlFor="ft">Feet & Inches</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {heightUnit === "cm" ? (
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input placeholder="170" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="space-y-4">
                    <FormLabel>Height (Feet & Inches)</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="heightFeet"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="5" type="number" {...field} />
                            </FormControl>
                            <div className="text-xs text-muted-foreground text-center">Feet</div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="heightInches"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="8" type="number" {...field} />
                            </FormControl>
                            <div className="text-xs text-muted-foreground text-center">Inches</div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input placeholder="70" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="my-8" />

            {/* Regional Preferences Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold">2</div>
                <h3 className="text-xl font-semibold text-foreground">Regional Preferences</h3>
              </div>
              
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Region/Cuisine Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your region for culturally appropriate meals" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="north_america">North America</SelectItem>
                        <SelectItem value="latin_america">Latin America</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="middle_east">Middle East & North Africa</SelectItem>
                        <SelectItem value="south_asia">South Asia (Indian Subcontinent)</SelectItem>
                        <SelectItem value="east_asia">East Asia (Chinese, Japanese, Korean)</SelectItem>
                        <SelectItem value="southeast_asia">Southeast Asia (Thai, Vietnamese, etc.)</SelectItem>
                        <SelectItem value="sub_saharan_africa">Sub-Saharan Africa</SelectItem>
                        <SelectItem value="australia_oceania">Australia & Oceania</SelectItem>
                        <SelectItem value="international">International Mix</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-8" />

            {/* Activity & Goals Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold">3</div>
                <h3 className="text-xl font-semibold text-foreground">Activity & Goals</h3>
              </div>
              
              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                        <SelectItem value="lightly_active">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                        <SelectItem value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
                        <SelectItem value="very_active">Very Active (hard exercise 6-7 days/week)</SelectItem>
                        <SelectItem value="extremely_active">Extremely Active (very hard exercise, physical job)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fitnessGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your fitness goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lose_weight">Lose Weight</SelectItem>
                        <SelectItem value="maintain_weight">Maintain Weight</SelectItem>
                        <SelectItem value="gain_muscle">Gain Muscle</SelectItem>
                        <SelectItem value="improve_health">Improve Overall Health</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-8" />

            {/* Diet Preferences Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold">4</div>
                <h3 className="text-xl font-semibold text-foreground">Diet Preferences</h3>
              </div>
              
              <FormField
                control={form.control}
                name="dietType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diet Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred diet type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="balanced">Balanced Diet</SelectItem>
                        <SelectItem value="ketogenic">Ketogenic (Keto)</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="paleo">Paleo</SelectItem>
                        <SelectItem value="mediterranean">Mediterranean</SelectItem>
                        <SelectItem value="high_protein">High Protein</SelectItem>
                        <SelectItem value="low_carb">Low Carb</SelectItem>
                        <SelectItem value="dash">DASH (Heart Health)</SelectItem>
                        <SelectItem value="whole30">Whole30</SelectItem>
                        <SelectItem value="intermittent_fasting">Intermittent Fasting</SelectItem>
                        <SelectItem value="ayurvedic">Ayurvedic</SelectItem>
                        <SelectItem value="traditional_chinese">Traditional Chinese Medicine</SelectItem>
                        <SelectItem value="okinawan">Okinawan (Japanese Longevity)</SelectItem>
                        <SelectItem value="nordic">Nordic Diet</SelectItem>
                        <SelectItem value="flexitarian">Flexitarian</SelectItem>
                        <SelectItem value="pescatarian">Pescatarian</SelectItem>
                        <SelectItem value="macrobiotic">Macrobiotic</SelectItem>
                        <SelectItem value="anti_inflammatory">Anti-Inflammatory</SelectItem>
                        <SelectItem value="gluten_free">Gluten-Free</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies & Intolerances</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., peanuts, dairy, gluten, shellfish..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List any foods you're allergic to or prefer to avoid
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-8" />

            <div className="pt-4">
              <Button type="submit" size="xl" className="w-full shadow-lg">
                Generate My Personalized Diet Plan
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};