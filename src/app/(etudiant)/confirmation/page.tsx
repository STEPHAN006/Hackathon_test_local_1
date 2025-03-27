'use client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, CheckCircle } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Confetti from "react-confetti";
import { useRouter } from 'next/navigation'

const StudentPaymentPage = () => {
  const router = useRouter()
  const [studentData, setStudentData] = useState<any>(null)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [amount, setAmount] = useState(100000)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const student = localStorage.getItem('studentData')
    const payment = localStorage.getItem('paymentData')
    if (student) setStudentData(JSON.parse(student))
    if (payment) setPaymentData(JSON.parse(payment))
  }, [])

  const handleConfirmPayment = () => {
    setIsSuccessModalOpen(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <Card className="flex flex-col md:flex-row gap-8 p-8 rounded-xl shadow-lg">
      
      {/* Section Étudiant */}
      <div className="flex-1 space-y-6 pr-8">
        <h1 className="text-3xl font-bold text-primary mb-6">👨🎓 Informations de l'étudiant</h1>
        
        <div className="space-y-4">
          <InfoLine label="Nom" value={studentData?.lastName || ''} />
          <InfoLine label="Prénom" value={studentData?.firstName || ''} />
          <InfoLine label="Matricule" value={studentData?.matricule || ''} />
          <InfoLine label="Mention" value={studentData?.mention || ''} />
        </div>
      </div>

      {/* Séparateur vertical */}
      <div className="md:h-[1px] md:w-auto w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Section Paiement */}
      <div className="flex-1 space-y-6 pl-8">
        <h1 className="text-3xl font-bold text-primary mb-6">💳 Détails du paiement</h1>
        
        <div className="space-y-4">
          <InfoLine label="Montant" value={`${paymentData?.amount?.toLocaleString() || 0} Ar`} />
          <InfoLine label="Méthode" value={paymentData?.paymentMethod || ''} />
          {paymentData?.phoneNumber && (
            <InfoLine label="Numéro" value={paymentData.phoneNumber} />
          )}
        </div>
        <div>
        <Button variant={"outline"} size={"lg"} onClick={() => router.back()} className='mr-5'>Retour</Button>
        <Dialog>
          <DialogTrigger>
            <Button size="lg">C'est envoyé</Button>
          </DialogTrigger>
          <DialogContent className='w-[400px]'>
            <DialogHeader>
              <DialogTitle>Entrer la référence</DialogTitle>
            </DialogHeader>
            <Input />
            <Button onClick={handleConfirmPayment}>Envoyer</Button>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Modale de succès */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="flex flex-col items-center justify-center gap-4 p-6 text-center w-[400px] h-[400px]">
          {showConfetti && <Confetti numberOfPieces={10000} recycle={true} className='absolute top-0 right-0 left-0 w-[400px]'/>}
          <CheckCircle className="text-green-500 w-16 h-16" />
          <h2 className="text-xl font-bold">Information envoyée</h2>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const InfoLine = ({ label, value }: { label: string; value: string }) => (
  <div>
    <Label>{label}</Label>
    <p className="text-xl text-gray-700 font-medium">{value}</p>
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{children}</span>
);

const CopyableValue = ({ value }: { value: string }) => {
  const copyToClipboard = () => navigator.clipboard.writeText(value);

  return (
    <div className="flex items-center gap-4 group">
      <span className="text-2xl font-mono font-medium text-primary">{value}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        className="opacity-70 group-hover:opacity-100 transition-opacity"
        aria-label="Copier"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default StudentPaymentPage;
