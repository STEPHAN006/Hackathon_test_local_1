"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  matricule: z.string().regex(/^[A-Z0-9-]+$/, "Matricule invalide"),
  mention: z.string().min(1, "Ce champ est obligatoire"),
  program: z.string().min(1, "Ce champ est obligatoire"),
})

export default function StudentForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      matricule: "",
      mention: "",
      program: "",
    },
  })
  const router = useRouter()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Informations enregistrées ✅")
    // Stocker les données de l'étudiant (vous pourriez utiliser localStorage ou un état global)
    localStorage.setItem('studentData', JSON.stringify(data))
    // Rediriger vers la page de paiement
    router.push('/payment')
  }

  return (
    <Card className="mx-auto max-w-3xl p-6 md:p-12 shadow-xl rounded-2xl">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
          <ChevronRight className="h-8 w-8 text-primary" />
          Ajouter l'information de l'étudiant
        </h1>
        <p className="text-muted-foreground">Veuillez remplir tous les champs obligatoires</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section Informations personnelles */}
          <FormSection title="👤 Informations personnelles">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de famille</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: AROVANA" {...field} className="h-12 text-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Stephan" {...field} className="h-12 text-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="matricule"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Matricule</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: P3-L1-1-006" 
                        {...field} 
                        className="h-12 text-lg font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>

          {/* Section Programme académique */}
          <FormSection title="🎓 Programme académique">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="mention"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mention</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Sélectionner une mention" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HEST">HEST</SelectItem>
                        <SelectItem value="HECM">HECM</SelectItem>
                        <SelectItem value="HEP">HEP</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcours</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Choisir un parcours" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Informatique">Informatique</SelectItem>
                        <SelectItem value="Genie Civil">Génie Civil</SelectItem>
                        <SelectItem value="Gestion">Gestion</SelectItem>
                        <SelectItem value="Philosophie">Philosophie</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full md:w-auto px-12 h-14 text-lg gap-2"
          >
            Soumettre le formulaire
            <ChevronRight className="h-5 w-5" />
          </Button>
        </form>
      </Form>
    </Card>
  )
}

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-6 p-6 border rounded-xl bg-muted/20">
    <h2 className="text-2xl font-semibold text-primary">{title}</h2>
    {children}
  </div>
)