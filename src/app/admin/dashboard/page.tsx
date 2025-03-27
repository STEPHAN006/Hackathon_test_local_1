"use client";

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

import { Info, CheckCircle2, XCircle, WalletCards, Search } from 'lucide-react';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  class: string | null;
  enrollmentNo: string | null;
  mention: string | null;
  parcours: string | null;
  anneeScolaire: string | null;
  matricule: number;
  payments: Array<{
    id: number;
    amount: number;
    status: string;
    method: string | null;
    paymentDate: string;
    receiptNumber?: string | null;
  }>;
}

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentYear] = useState(new Date().getFullYear());
  
  // Filtering and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [mentionFilter, setMentionFilter] = useState('ALL');
  const [classFilter, setClassFilter] = useState('ALL');

  // Générer les mois académiques
  const academicMonths = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = (i + 8) % 12;
    const date = new Date(currentYear, monthIndex, 1);
    return {
      name: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear(),
      startDate: date,
      endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    };
  });

  // Filtering logic
  useEffect(() => {
    let result = students;

    // Search filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(student => 
        student.firstName.toLowerCase().includes(lowercasedTerm) ||
        student.lastName.toLowerCase().includes(lowercasedTerm)
      );
    }

    // Mention filter
    if (mentionFilter !== 'ALL') {
      result = result.filter(student => 
        student.mention === mentionFilter
      );
    }

    // Class filter
    if (classFilter !== 'ALL') {
      result = result.filter(student => 
        student.anneeScolaire === classFilter
      );
    }

    setFilteredStudents(result);
  }, [students, searchTerm, mentionFilter, classFilter]);

  const getBadgeVariant = (status: string) => {
    if (status === 'payé') return 'default';
    if (status === 'en retard') return 'destructive';
    return 'outline';
  };

  const getPaymentStatusForMonth = (monthStart: Date) => {
    if (!selectedStudent) return 'non-payé';
    const totalPaid = selectedStudent.payments.reduce((acc, p) => acc + (p.amount / 100000), 0);
    const monthIndex = academicMonths.findIndex(m => m.startDate.getTime() === monthStart.getTime());
    return monthIndex < totalPaid ? 'payé' : 'non-payé';
  };

  // Get unique mentions for filter dropdown
  const uniqueMentions = Array.from(new Set(students.map(student => student.mention).filter(Boolean) as string[]));

  // Get unique classes for filter dropdown
  const uniqueClasses = Array.from(new Set(students.map(student => student.anneeScolaire).filter(Boolean) as string[]));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/students');
        const data = await res.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error('Erreur de chargement:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            Suivi des Paiements Scolaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="relative flex-grow">
              <Input 
                placeholder="Rechercher par nom ou prénom" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
            <Select 
              value={mentionFilter} 
              onValueChange={setMentionFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par mention" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Toutes les mentions</SelectItem>
                {uniqueMentions.map(mention => (
                  <SelectItem key={mention} value={mention}>
                    {mention}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={classFilter} 
              onValueChange={setClassFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Toutes les classes</SelectItem>
                {uniqueClasses.map(classYear => (
                  <SelectItem key={classYear} value={classYear}>
                    {classYear}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Classe</TableHead>
                <TableHead>Mention</TableHead>
                <TableHead>Matricule</TableHead>
                <TableHead>Paiements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow 
                  key={student.id} 
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
                >
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.anneeScolaire || '-'}</TableCell>
                  <TableCell>{student.mention || '-'}</TableCell>
                  <TableCell>{student.matricule}</TableCell>
                  <TableCell>
                    {student.payments.map(payment => (
                      <Badge 
                        key={payment.id} 
                        variant={getBadgeVariant(payment.status)}
                        className="mr-1 mb-1"
                      >
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </Badge>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredStudents.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              Aucun étudiant trouvé
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog remains the same as in the previous version */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
  <DialogContent className="w-6xl max-h-[90vh] overflow-y-auto">
    <div className="flex w-full">
      {/* Left Side - Student Information */}
      <div className="w-1/4 p-6 border-r border-muted">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Avatar */}
          <div className="w-40 h-40 rounded-full bg-primary text-white flex items-center justify-center text-7xl font-bold">
            {selectedStudent?.firstName[0].toUpperCase()}
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              {selectedStudent?.firstName} {selectedStudent?.lastName}
            </h2>
            <p className="text-muted-foreground">{selectedStudent?.email}</p>
          </div>

          {/* Detailed Student Information */}
          <div className="w-full space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Matricule</span>
              <span className="font-medium">{selectedStudent?.matricule}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Classe</span>
              <span className="font-medium">{selectedStudent?.anneeScolaire || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Mention</span>
              <span className="font-medium">{selectedStudent?.mention || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Parcours</span>
              <span className="font-medium">{selectedStudent?.parcours || 'N/A'}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted-foreground">Numéro d'inscription</span>
              <span className="font-medium">{selectedStudent?.enrollmentNo || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Payment Calendar and Payments */}
      <div className="w-3/4 p-6 space-y-6">
        {/* Payment Calendar Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <WalletCards className="h-6 w-6 text-primary" />
            Calendrier de Paiement
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {academicMonths.map((month, index) => {
              const status = getPaymentStatusForMonth(month.startDate);
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    status === 'payé' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{month.name}</p>
                      <p className="text-sm text-muted-foreground">{month.year}</p>
                    </div>
                    {status === 'payé' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Payments Section */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Historique des Paiements</h4>
          {selectedStudent?.payments && selectedStudent.payments.length > 0 ? (
            <div className="space-y-3">
              {selectedStudent.payments.map((payment) => (
                <div 
                  key={payment.id} 
                  className="flex justify-between items-center p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-lg">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {payment.method || 'Méthode non spécifiée'}
                    </p>
                    {payment.receiptNumber && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Reçu n° {payment.receiptNumber}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">{payment.amount / 100000} FCFA</p>
                    <Badge 
                      variant={payment.status === 'payé' ? 'default' : 'destructive'}
                      className="mt-1"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center">Aucun paiement enregistré</p>
          )}
        </div>
      </div>
    </div>

    <Button 
      className="mt-4 w-full" 
      onClick={() => setSelectedStudent(null)}
    >
      Fermer
    </Button>
  </DialogContent>
</Dialog>
    </div>
  );
}