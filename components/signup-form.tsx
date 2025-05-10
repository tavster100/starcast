"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { submitSignupForm } from "@/app/actions"
import { useMobile } from "@/hooks/use-mobile"

// Schema de validare pentru formular
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Numele trebuie să conțină cel puțin 2 caractere.",
  }),
  surname: z.string().min(2, {
    message: "Prenumele trebuie să conțină cel puțin 2 caractere.",
  }),
  email: z.string().email({
    message: "Te rugăm să introduci o adresă de email validă.",
  }),
  tiktokId: z
    .string()
    .min(2, {
      message: "ID-ul TikTok trebuie să conțină cel puțin 2 caractere.",
    })
    .regex(/^@?[a-zA-Z0-9_.]{1,24}$/, {
      message: "ID-ul TikTok nu este valid. Poate conține doar litere, cifre, _ și .",
    }),
})

type FormValues = z.infer<typeof formSchema>

export type FormMode = "signup" | "consultation"

interface SignupFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode?: FormMode
}

export function SignupForm({ open, onOpenChange, mode = "signup" }: SignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const isMobile = useMobile()

  // Configurare titluri și descrieri în funcție de mod
  const titles = {
    signup: "Alătură-te StarCast",
    consultation: "Programează o Discuție",
  }

  const descriptions = {
    signup: "Completează formularul pentru a începe călătoria ta ca creator TikTok Live",
    consultation: "Completează formularul pentru a discuta cu un manager de talente despre oportunitățile tale",
  }

  const defaultSuccessMessages = {
    signup: "Mulțumim pentru înregistrare! Datele tale au fost salvate cu succes.",
    consultation: "Mulțumim pentru solicitare! Un manager de talente te va contacta în curând.",
  }

  const buttonTexts = {
    signup: "Trimite Înregistrarea",
    consultation: "Programează Discuția",
  }

  // Inițializare formular cu React Hook Form și Zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      tiktokId: "",
    },
  })

  // Funcție pentru trimiterea formularului
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // Asigură-te că ID-ul TikTok începe cu @
      const tiktokId = values.tiktokId.startsWith("@") ? values.tiktokId : `@${values.tiktokId}`

      // Trimite datele către server action
      const result = await submitSignupForm({
        ...values,
        tiktokId,
        formType: mode,
      })

      if (result.success) {
        setSubmitStatus("success")
        setSuccessMessage(result.message || defaultSuccessMessages[mode])
        form.reset()
        // Închide dialogul după 3 secunde în caz de succes
        setTimeout(() => {
          onOpenChange(false)
          setSubmitStatus("idle")
        }, 3000)
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.message || "A apărut o eroare la trimiterea formularului.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("A apărut o eroare la trimiterea formularului. Încearcă din nou.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Variante de animație pentru formular
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-[500px] bg-gradient-to-br from-background to-background/90 backdrop-blur-lg border-pink-500/30 ${isMobile ? "p-4" : "p-6"}`}
      >
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
            {titles[mode]}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400 text-sm sm:text-base">
            {descriptions[mode]}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col items-center justify-center py-6 sm:py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              >
                <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-green-500 mb-4" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl font-bold mb-2"
              >
                {mode === "signup" ? "Înregistrare cu succes!" : "Solicitare trimisă cu succes!"}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-sm sm:text-base"
              >
                {successMessage || defaultSuccessMessages[mode]}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 mt-2 text-sm sm:text-base"
              >
                Te vom contacta în curând pentru a discuta despre următorii pași.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 py-2 sm:py-4">
                  <motion.div custom={0} variants={formVariants} initial="hidden" animate="visible">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Nume</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introdu numele tău"
                              {...field}
                              className="bg-background/50 border-white/10 focus-visible:ring-pink-500"
                            />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div custom={1} variants={formVariants} initial="hidden" animate="visible">
                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Prenume</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introdu prenumele tău"
                              {...field}
                              className="bg-background/50 border-white/10 focus-visible:ring-pink-500"
                            />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div custom={2} variants={formVariants} initial="hidden" animate="visible">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="exemplu@email.com"
                              {...field}
                              className="bg-background/50 border-white/10 focus-visible:ring-pink-500"
                            />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div custom={3} variants={formVariants} initial="hidden" animate="visible">
                    <FormField
                      control={form.control}
                      name="tiktokId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">ID TikTok</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ex: @username"
                              {...field}
                              className="bg-background/50 border-white/10 focus-visible:ring-pink-500"
                            />
                          </FormControl>
                          <FormMessage className="text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/20 border border-red-500/50 rounded-md p-3 flex items-start gap-2"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-red-200">{errorMessage}</p>
                    </motion.div>
                  )}

                  <motion.div
                    custom={4}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Se trimite...
                        </>
                      ) : (
                        buttonTexts[mode]
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
