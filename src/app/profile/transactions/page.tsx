
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Transaction } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const mockTransactions: Transaction[] = [
    { id: 'txn1', planName: 'Weekly Companion', date: '2024-07-20', amount: 'Rp 150.000', status: 'success' },
    { id: 'txn2', planName: 'On-Demand Session', date: '2024-07-15', amount: 'Rp 80.000', status: 'success' },
    { id: 'txn3', planName: 'Monthly Friend', date: '2024-06-30', amount: 'Rp 500.000', status: 'success' },
    { id: 'txn4', planName: 'Weekly Companion', date: '2024-07-27', amount: 'Rp 150.000', status: 'pending' },
];


export default function TransactionHistoryPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto py-12 px-4 animate-fade-in max-w-4xl">
            <header className="mb-10 text-center relative">
                <Button variant="outline" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5"/>
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-5xl font-headline text-primary">Riwayat Transaksi</h1>
                <p className="text-xl text-muted-foreground mt-2">Lihat semua riwayat pembayaran Anda.</p>
            </header>

            <Card className="shadow-xl">
                <CardContent className="p-6">
                    {mockTransactions.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-lg">Paket</TableHead>
                                    <TableHead className="text-lg">Tanggal Pembayaran</TableHead>
                                    <TableHead className="text-lg">Jumlah</TableHead>
                                    <TableHead className="text-lg text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockTransactions.map((tx) => (
                                    <TableRow key={tx.id} className="text-md">
                                        <TableCell className="font-medium">{tx.planName}</TableCell>
                                        <TableCell>{new Date(tx.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                                        <TableCell>{tx.amount}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge
                                                className="text-sm capitalize"
                                                variant={tx.status === 'success' ? 'default' : 'secondary'}
                                            >
                                                {tx.status === 'success' ? 'Berhasil' : 'Menunggu'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground text-xl">Anda belum memiliki riwayat transaksi.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
