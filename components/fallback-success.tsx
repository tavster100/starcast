"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FallbackSuccess() {
  const [open, setOpen] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);

  // Verifică dacă există înregistrări în localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("formSubmissions");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setSubmissions(parsedData);
            setOpen(true);
          }
        } catch (error) {
          console.error("Eroare la parsarea datelor din localStorage:", error);
        }
      }
    }
  }, []);

  // Funcție pentru ștergerea datelor din localStorage
  const clearSubmissions = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("formSubmissions");
      setSubmissions([]);
      setOpen(false);
    }
  };

  if (submissions.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-background to-background/90 backdrop-blur-lg border-pink-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
            Înregistrări Salvate Local
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
          <p className="text-gray-300 mb-4">
            Ai {submissions.length} înregistrări salvate local. În mediul de
            producție, acestea ar fi trimise prin email.
          </p>

          <div className="w-full max-h-60 overflow-y-auto bg-black/20 rounded-md p-4 mb-4">
            {submissions.map((submission, index) => (
              <div
                key={index}
                className="mb-4 pb-4 border-b border-gray-700 last:border-0 text-left"
              >
                <p>
                  <strong>Nume:</strong> {submission.name} {submission.surname}
                </p>
                <p>
                  <strong>Email:</strong> {submission.email}
                </p>
                <p>
                  <strong>TikTok ID:</strong> {submission.tiktokId}
                </p>
                <p>
                  <strong>Tip:</strong>{" "}
                  {submission.formType === "signup"
                    ? "Înscriere"
                    : "Consultație"}
                </p>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(submission.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <Button onClick={clearSubmissions} variant="destructive">
            Șterge Înregistrările
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
