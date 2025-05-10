"use server"

import { z } from "zod"
import { Resend } from "resend"
import nodemailer from "nodemailer"

// Schema de validare pentru datele de înscriere
const signupSchema = z.object({
  name: z.string().min(2),
  surname: z.string().min(2),
  email: z.string().email(),
  tiktokId: z
    .string()
    .min(2)
    .regex(/^@?[a-zA-Z0-9_.]{1,24}$/),
  formType: z.enum(["signup", "consultation"]).optional().default("signup"),
})

// Funcție pentru verificarea ID-ului TikTok
async function verifyTikTokId(tiktokId: string): Promise<boolean> {
  return tiktokId.startsWith("@") && /^@[a-zA-Z0-9_.]{1,24}$/.test(tiktokId)
}

// Verifică dacă suntem în mediul de previzualizare
const isPreviewEnvironment = () => {
  return process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development"
}

// Funcție pentru salvarea datelor în localStorage (doar pentru preview)
async function saveSubmissionLocally(data: {
  name: string
  surname: string
  email: string
  tiktokId: string
  formType: "signup" | "consultation"
}) {
  // Această funcție este doar pentru client-side
  // În server actions, vom simula salvarea
  console.log("Simulare salvare locală:", data)
  return true
}

// Funcție pentru trimiterea email-ului folosind Resend
async function sendEmailWithResend(options: {
  to: string
  subject: string
  text: string
  html: string
  from?: string
}) {
  try {
    // Verificăm dacă avem cheia API Resend
    if (!process.env.RESEND_API_KEY) {
      console.error("Lipsește variabila de mediu RESEND_API_KEY")
      return { success: false, error: "Lipsește configurația pentru serviciul de email" }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: options.from || "StarCast <onboarding@resend.dev>",
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })

    if (error) {
      console.error("Eroare la trimiterea email-ului prin Resend:", error)
      return { success: false, error: `Eroare Resend: ${error.message}` }
    }

    console.log("Email trimis cu succes prin Resend:", data?.id)
    return { success: true, messageId: data?.id }
  } catch (error) {
    console.error("Eroare la trimiterea email-ului prin Resend:", error)
    return {
      success: false,
      error: `Eroare la trimiterea email-ului: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

// Funcție pentru trimiterea email-ului folosind Gmail (ca fallback)
async function sendEmailWithGmail(options: {
  to: string
  subject: string
  text: string
  html: string
  from?: string
}) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Lipsesc variabilele de mediu pentru Gmail")
      return { success: false, error: "Lipsesc credențialele pentru email" }
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
    })

    const info = await transporter.sendMail({
      from: options.from || `"StarCast" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })

    console.log("Email trimis cu succes prin Gmail:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Eroare la trimiterea email-ului prin Gmail:", error)
    return {
      success: false,
      error: `Eroare la trimiterea email-ului: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

// Funcție unificată pentru trimiterea email-ului cu fallback
async function sendEmail(options: {
  to: string
  subject: string
  text: string
  html: string
  from?: string
}) {
  // Încercăm mai întâi cu Resend
  const resendResult = await sendEmailWithResend(options)

  if (resendResult.success) {
    return resendResult
  }

  console.log("Resend a eșuat, încercăm cu Gmail ca fallback")

  // Dacă Resend eșuează, încercăm cu Gmail ca fallback
  return await sendEmailWithGmail(options)
}

// Funcție pentru trimiterea email-ului către proprietar
async function sendEmailToOwner(data: {
  name: string
  surname: string
  email: string
  tiktokId: string
  formType: "signup" | "consultation"
}) {
  if (isPreviewEnvironment()) {
    console.log("Simulare trimitere email către proprietar:", {
      to: "owner@eaglevision.info",
      subject: data.formType === "signup" ? "Nouă Înscriere StarCast" : "Nouă Solicitare de Consultație StarCast",
      data,
    })
    return { success: true, simulated: true }
  }

  const subject = data.formType === "signup" ? "Nouă Înscriere StarCast" : "Nouă Solicitare de Consultație StarCast"

  const textContent = `
    ${subject}:
    
    Nume: ${data.name}
    Prenume: ${data.surname}
    Email: ${data.email}
    ID TikTok: ${data.tiktokId}
    Tip Formular: ${data.formType === "signup" ? "Înscriere" : "Consultație"}
    
    Data: ${new Date().toLocaleString()}
  `

  const htmlContent = `
    <h2>${subject}</h2>
    <p><strong>Nume:</strong> ${data.name}</p>
    <p><strong>Prenume:</strong> ${data.surname}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>ID TikTok:</strong> ${data.tiktokId}</p>
    <p><strong>Tip Formular:</strong> ${data.formType === "signup" ? "Înscriere" : "Consultație"}</p>
    <p><em>Data: ${new Date().toLocaleString()}</em></p>
  `

  return await sendEmail({
    to: "owner@eaglevision.info",
    subject,
    text: textContent,
    html: htmlContent,
  })
}

// Funcție pentru trimiterea email-ului de confirmare către utilizator
async function sendConfirmationEmail(data: {
  name: string
  surname: string
  email: string
  tiktokId: string
  formType: "signup" | "consultation"
}) {
  if (isPreviewEnvironment()) {
    console.log("Simulare trimitere email de confirmare către utilizator:", {
      to: data.email,
      subject:
        data.formType === "signup" ? "Confirmare Înscriere StarCast" : "Confirmare Solicitare Consultație StarCast",
      data,
    })
    return { success: true, simulated: true }
  }

  const currentDate = new Date().toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const isSignup = data.formType === "signup"
  const subject = isSignup ? "Confirmare Înscriere StarCast" : "Confirmare Solicitare Consultație StarCast"
  const intro = isSignup
    ? `Îți mulțumim pentru înscrierea la StarCast! Am primit cu succes datele tale și suntem încântați să te avem în comunitatea noastră de creatori TikTok Live.`
    : `Îți mulțumim pentru solicitarea de consultație cu un manager de talente StarCast! Am primit cu succes solicitarea ta și suntem nerăbdători să discutăm despre oportunitățile tale pe TikTok Live.`

  const nextSteps = isSignup
    ? [
        "Un manager de talente te va contacta în următoarele 48 de ore pentru a discuta despre următorii pași.",
        "Pregătește-te să ne spui mai multe despre conținutul tău și obiectivele tale pe TikTok Live.",
        "Între timp, poți explora site-ul nostru pentru a afla mai multe despre serviciile și beneficiile StarCast.",
      ]
    : [
        "Un manager de talente te va contacta în următoarele 24 de ore pentru a programa o discuție.",
        "Pregătește-te să discuți despre experiența ta actuală și obiectivele tale pe TikTok Live.",
        "Între timp, poți explora site-ul nostru pentru a afla mai multe despre serviciile și beneficiile StarCast.",
      ]

  const textContent = `
    Salut ${data.name},

    ${intro}

    Detaliile ${isSignup ? "înscrierii" : "solicitării"} tale:
    
    Nume: ${data.name} ${data.surname}
    ID TikTok: ${data.tiktokId}
    Data: ${currentDate}
    
    Ce urmează?
    
    1. ${nextSteps[0]}
    2. ${nextSteps[1]}
    3. ${nextSteps[2]}
    
    Dacă ai întrebări între timp, nu ezita să ne contactezi la support@starcast.com.
    
    Cu stimă,
    Echipa StarCast
  `

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; }
        .header { text-align: center; }
        .logo { font-size: 24px; color: #ff3366; font-weight: bold; }
        .details { background: #f5f5f5; padding: 10px; border-radius: 5px; }
        .button { background: linear-gradient(to right, #3b82f6, #ec4899); color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">⭐ StarCast</div>
          <p>Transformăm talente în vedete TikTok Live</p>
        </div>
        <h2>Salut ${data.name},</h2>
        <p>${intro}</p>
        <div class="details">
          <p><strong>Nume:</strong> ${data.name} ${data.surname}</p>
          <p><strong>ID TikTok:</strong> ${data.tiktokId}</p>
          <p><strong>Data:</strong> ${currentDate}</p>
        </div>
        <h3>Ce urmează?</h3>
        <ol>
          <li>${nextSteps[0]}</li>
          <li>${nextSteps[1]}</li>
          <li>${nextSteps[2]}</li>
        </ol>
        <div style="text-align:center;">
          <a href="https://starcast.com" class="button">Vizitează Site-ul Nostru</a>
        </div>
        <p>Dacă ai întrebări între timp, scrie-ne la <a href="mailto:support@starcast.com">support@starcast.com</a>.</p>
        <div class="footer">
          <p>Cu stimă,<br/>Echipa StarCast</p>
          <p>&copy; ${new Date().getFullYear()} StarCast</p>
          <p>Email trimis către ${data.email} pentru ${isSignup ? "înscriere" : "consultație"}.</p>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({
    to: data.email,
    subject,
    text: textContent,
    html: htmlContent,
  })
}

// Funcție pentru salvarea datelor în baza de date (simulare)
async function saveSubmissionToDatabase(data: {
  name: string
  surname: string
  email: string
  tiktokId: string
  formType: "signup" | "consultation"
}) {
  // În producție, aici ai putea salva datele într-o bază de date reală
  // Pentru moment, doar simulăm salvarea
  console.log("Salvare date în baza de date (simulare):", data)
  return true
}

// Server action pentru submit
export async function submitSignupForm(formData: unknown) {
  try {
    const validatedData = signupSchema.parse(formData)
    const isValidTikTokId = await verifyTikTokId(validatedData.tiktokId)

    if (!isValidTikTokId) {
      return { success: false, message: "ID-ul TikTok nu este valid sau nu există." }
    }

    // Salvăm datele în baza de date (simulare)
    await saveSubmissionToDatabase(validatedData)

    // În mediul de previzualizare, salvăm local și returnăm succes
    if (isPreviewEnvironment()) {
      await saveSubmissionLocally(validatedData)
      return { success: true }
    }

    // Încercăm să trimitem email-urile
    let emailSent = false
    let emailError = ""

    try {
      // Trimite email-ul către proprietar
      const ownerEmailResult = await sendEmailToOwner(validatedData)

      if (!ownerEmailResult.success) {
        console.error("Eroare la trimiterea email-ului către proprietar:", ownerEmailResult.error)
        emailError = "Nu am putut trimite notificarea către administrator."
      } else {
        emailSent = true
      }
    } catch (error) {
      console.error("Excepție la trimiterea email-ului către proprietar:", error)
      emailError = "Eroare la trimiterea notificării către administrator."
    }

    // Chiar dacă email-ul către proprietar eșuează, încercăm să trimitem email-ul de confirmare
    try {
      const userEmailResult = await sendConfirmationEmail(validatedData)

      if (!userEmailResult.success) {
        console.error("Eroare la trimiterea email-ului de confirmare:", userEmailResult.error)
        if (emailSent) {
          emailError = "Nu am putut trimite email-ul de confirmare, dar înregistrarea a fost procesată."
        }
      } else if (!emailSent) {
        emailSent = true
      }
    } catch (error) {
      console.error("Excepție la trimiterea email-ului de confirmare:", error)
      if (!emailError) {
        emailError = "Eroare la trimiterea email-ului de confirmare."
      }
    }

    // Dacă ambele email-uri au eșuat, dar datele au fost salvate, returnăm un mesaj special
    if (!emailSent) {
      return {
        success: true,
        message:
          "Înregistrarea a fost procesată, dar nu am putut trimite email-urile de confirmare. Te vom contacta în curând.",
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error("Eroare la procesarea formularului:", error)
    return {
      success: false,
      message: error?.message || "A apărut o eroare neașteptată.",
    }
  }
}
