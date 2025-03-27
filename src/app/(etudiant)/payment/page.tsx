"use client"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ChevronLeft, WalletCards, Plus, Minus, Smartphone } from "lucide-react"

const FormSchema = z.object({
  amount: z.number().min(100000, "Le montant minimum est 100,000 AR"),
  paymentMethod: z.string().min(1, "Méthode de paiement requise"),
  phoneNumber: z.string().regex(/^034\d{7}$/, "Numéro mobile invalide").optional()
})

export default function PaymentForm() {
  const router = useRouter()
  const [studentData, setStudentData] = useState<any>(null)
  const [monthlyFee] = useState(100000)
  const paymentMethods = [
    { value: "mvola", label: "Mvola", icon: Smartphone },
    { value: "airtel", label: "Airtel Money", icon: Smartphone },
    { value: "orange", label: "Orange Money", icon: Smartphone }
  ]

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 100000,
      paymentMethod: "",
      phoneNumber: ""
    }
  })

  useEffect(() => {
    const data = localStorage.getItem('studentData')
    if (data) {
      setStudentData(JSON.parse(data))
    }
  }, [])

  const updateAmount = (operation: 'increment' | 'decrement') => {
    const currentAmount = form.getValues('amount')
    const newAmount = operation === 'increment' ? currentAmount + monthlyFee : Math.max(monthlyFee, currentAmount - monthlyFee)
    form.setValue('amount', newAmount)
  }

  const getMonthCount = () => form.watch('amount') / monthlyFee

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Stocker les données de paiement
    localStorage.setItem('paymentData', JSON.stringify(data))
    // Rediriger vers la page de confirmation
    router.push('/confirmation')
  }

  return (
    <Card className="mx-auto max-w-xl p-8 md:p-16 rounded-2xl shadow-xl bg-gradient-to-br from-background to-muted/10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            {/* En-tête */}
            <div className="mb-10 space-y-2">
              <Button variant="ghost" onClick={() => router.back()} className="px-0">
                <ChevronLeft className="mr-2 h-5 w-5" />
                Retour
              </Button>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <WalletCards className="h-8 w-8 text-primary" />
                Paiement Universitaire
              </h1>
            </div>

            {/* Section Montant */}
            <div className="space-y-4">
              <FormLabel className="text-lg">Montant à payer</FormLabel>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => updateAmount('decrement')}
                  className="rounded-full h-12 w-12"
                >
                  <Minus className="h-5 w-5" />
                </Button>

                <div className="flex-1 text-center p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
                  <p className="text-3xl font-bold tracking-tighter">
                    {form.watch('amount').toLocaleString()} AR
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getMonthCount()} mois × {monthlyFee.toLocaleString()} AR
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => updateAmount('increment')}
                  className="rounded-full h-12 w-12"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Section Méthode de paiement */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-lg">Méthode de paiement</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-14 text-base">
                        <SelectValue placeholder="Sélectionnez un moyen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          <div className="flex items-center gap-3">
                            <method.icon className="h-5 w-5 text-primary" />
                            {method.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Numéro de téléphone conditionnel */}
            {form.watch('paymentMethod') && (
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Numéro mobile</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="034 12 345 67"
                        className="h-14 text-base"
                        prefix="+261"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Bouton de soumission */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-semibold gap-2 transition-transform hover:scale-[1.02]"
            >
              Payer maintenant
              <WalletCards className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}