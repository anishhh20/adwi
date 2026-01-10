"use client"

import type React from "react"
import Footer from "@/components/footer"
import { useState } from "react"
import { motion } from "framer-motion"
// Removed MinimalAbstractPattern as requested
// import { MinimalAbstractPattern } from "@/components/minimal-abstract-pattern"
// Import the necessary hook for client components
import { useSearchParams } from "next/navigation"
import { OfficeCard } from "@/components/sections/offices-section"

// --- Helper Icon Components for the subtle background effect ---
// Use simple, recognizable icons for the background
const UserOutlineIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const EnvelopeOutlineIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const ClipboardOutlineIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)
// ------------------------------------------

// --- SVG Icons remain unchanged ---
const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)
// ------------------------------------------

// --- Office Locations Data (Unchanged) ---
const officeLocations = [
  {
    city: "Pune, India (HQ)",
    address: "Warje, Pune, India, Maharashtra 411014",
    phone: "+91 7720077514",
    email: "adwitechnologies@gmail.com",
    country: "🇮🇳",
  },
  {
    city: "Mumbai, India",
    address: "Vidyavihar East, Mumbai, 400077.",
    phone: "",
    email: "adwitechnologies@gmail.com",
    country: "🇮🇳",
  },
  {
    city: "Dubai, UAE",
    address: "M1010 Al Wadi Building, Sheikh Zayed Road, Dubai, United Arab Emirates",
    phone: "",
    email: "adwitechnologies@gmail.com",
    country: "🇦🇪",
  },
  {
    city: "Germany",
    address: "Steglitzer damm, 12169 Berlin, Germany",
    phone: "",
    email: "adwitechnologies@gmail.com",
    country: "🇩🇪",
  },
  {
    city: "USA",
    address: "Tracy, California, United States",
    phone: "",
    email: "info@adwitechnologies.com",
    country: "🇺🇸",
  },
]
// ------------------------------------------

// --- UPDATED Contact Card Component ---
interface ContactCardProps {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  idx: number
}

function ContactCard({ icon, label, value, href, idx }: ContactCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -2 }}
      className="flex gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-all group cursor-pointer relative overflow-hidden" // Added relative and overflow-hidden
    >
      {/* Subtle Background Icon */}
      <UserOutlineIcon
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-accent/5 opacity-25 transition-opacity duration-500 group-hover:opacity-10"
      />

      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors text-accent z-10">
        {icon}
      </div>
      <div className="z-10"> {/* Ensure content is above the subtle icon */}
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
    </motion.a>
  )
}
// ------------------------------------------

// --- FL Form Component (Extracted for clarity) ---
const FLForm = ({
  handleSubmit,
  loading,
  submitted,
  enquiryType,
  setEnquiryType,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  loading: boolean
  submitted: boolean
  enquiryType: string
  setEnquiryType: React.Dispatch<React.SetStateAction<string>>
}) => {
  // Helper component for standard input fields (Unchanged)
  const TextInput = ({ label, ...props }: { label: string } & React.ComponentPropsWithoutRef<'input' | 'select' | 'textarea'>) => (
    <div>
      <label htmlFor={props.id || props.name} className="text-[10px] font-medium text-muted-foreground block mb-1">
        {label}
      </label>
      {props.as === 'select' ? (
        <select
          {...(props as React.ComponentPropsWithoutRef<'select'>)}
          className="w-full px-3 py-2  border border-border rounded-lg text-xs transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
        >
          {props.children}
        </select>
      ) : props.as === 'textarea' ? (
        <textarea
          {...(props as React.ComponentPropsWithoutRef<'textarea'>)}
          className="w-full px-3 py-2  border border-border rounded-lg text-xs transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent resize-none"
        />
      ) : (
        <input
          {...(props as React.ComponentPropsWithoutRef<'input'>)}
          className="w-full px-3 py-2  border border-border rounded-lg text-xs transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
        />
      )}
    </div>
  )

  return (
    <div className="space-y-5 p-5  border border-border rounded-lg shadow-md relative overflow-hidden"> {/* Added relative and overflow-hidden */}
      {/* Subtle Background Icon */}
      <ClipboardOutlineIcon
        className="absolute top-0 right-0 h-40 w-40 translate-x-1/4 -translate-y-1/4 text-accent/5 opacity-10"
      />

      <h2 className="text-xl font-bold text-foreground mb-3 relative z-10">Course & Student Details</h2>

      <form onSubmit={(e) => handleSubmit(e, "fl")} className="space-y-4 relative z-10"> {/* Added relative z-10 to ensure form content is above the icon */}
        {/* Enquiry For* Field */}
        <TextInput
          as="select"
          id="enquiryLanguage"
          name="enquiryLanguage"
          label="Enquiry For*"
          required
          value={enquiryType}
          onChange={(e) => setEnquiryType(e.target.value)}
        >
          <option value="">Select Enquiry</option>
          <option value="Language_Enquiry">Enquiry For Language</option>
          <option value="General_Enquiry">General Enquiry</option>
        </TextInput>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Full Name* */}
          <TextInput
            type="text"
            label="Full Name*"
            placeholder="e.g., Jane Doe"
            required
            id="fullName"
            name="fullName"
          />
          {/* Contact Number* */}
          <TextInput
            type="tel"
            label="Contact Number*"
            placeholder="e.g., +91 9876543210"
            required
            id="contactNumber"
            name="contactNumber"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Gender* */}
          <TextInput as="select" label="Gender*" required id="gender" name="gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </TextInput>
          {/* Email Address* */}
          <TextInput
            type="email"
            label="Email Address*"
            placeholder="e.g., name@example.com"
            required
            id="emailAddress"
            name="emailAddress"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Date of Birth/Date Input */}
          <TextInput type="date" label="Date of Birth*" required id="dob" name="dob" />
          {/* I Am a:* */}
          <TextInput as="select" label="I Am a:*" required id="profession" name="profession">
            <option value="">Select Profession</option>
            <option value="Student">Student</option>
            <option value="Working Professional">Working Professional</option>
            <option value="Other">Other</option>
          </TextInput>
        </div>

        {/* Residential Address* */}
        <TextInput
          as="textarea"
          label="Residential Address*"
          rows={2}
          required
          id="residentialAddress"
          name="residentialAddress"
          placeholder="Enter your full address"
        />

        <div className="flex items-start">
          <input
            id="agreement"
            type="checkbox"
            required
            className="w-3 h-3 text-accent  border-border rounded focus:ring-accent/50 mt-1"
          />
          <label htmlFor="agreement" className="ml-2 text-xs text-muted-foreground">
            I hereby declare that the information given by me in this form is true, correct, and complete in all respects.
          </label>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold transition-all disabled:opacity-50 text-sm"
        >
          {loading ? "Submitting..." : submitted ? "Enrollment Submitted!" : "Submit"}
        </motion.button>
      </form>
    </div>
  )
}

// ------------------------------------------

// --- UPDATED General Contact Form Component (Extracted for clarity) ---
const GeneralContactForm = ({
  handleSubmit,
  loading,
  submitted,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  loading: boolean
  submitted: boolean
}) => {
  // Helper component for standard input fields (Unchanged)
  const TextInput = ({ label, ...props }: { label: string } & React.ComponentPropsWithoutRef<'input' | 'select' | 'textarea'>) => (
    <div>
      <label htmlFor={props.id || props.name} className="text-[10px] font-medium text-muted-foreground block mb-1">
        {label}
      </label>
      {props.as === 'select' ? (
        <select
          {...(props as React.ComponentPropsWithoutRef<'select'>)}
          className="w-full px-3 py-2  border border-border rounded-lg text-xs transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
        >
          {props.children}
        </select>
      ) : props.as === 'textarea' ? (
        <textarea
          {...(props as React.ComponentPropsWithoutRef<'textarea'>)}
          className="w-full px-3 py-2  border border-border rounded-lg text-xs transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent resize-none"
        />
      ) : (
        <input
          {...(props as React.ComponentPropsWithoutRef<'input'>)}
          className="w-full px-3 py-2  border border-border rounded-lg text-xs transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
        />
      )}
    </div>
  )

  return (

    <div className="space-y-5 p-5  border border-border rounded-lg shadow-md relative overflow-hidden">
      <form onSubmit={(e) => handleSubmit(e, "general")} className="space-y-4 relative z-10">
        {/* Subtle Background Icon */}
        <EnvelopeOutlineIcon
          className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 translate-y-1/4 text-primary/5 opacity-10"
        />

        <h2 className="text-xl font-bold text-foreground mb-3 relative z-10">General Inquiry Form</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10"> {/* Added relative z-10 */}
          {/* Your Name */}
          <TextInput
            type="text"
            label="Your Name*"
            placeholder="e.g., John Smith"
            required
            id="generalName"
            name="generalName"
          />
          {/* Your Email */}
          <TextInput
            type="email"
            label="Your Email*"
            placeholder="e.g., hello@domain.com"
            required
            id="generalEmail"
            name="generalEmail"
          />
        </div>

        {/* Subject */}
        <TextInput
          type="text"
          label="Subject"
          placeholder="e.g., Inquiry about partnership"
          required
          id="generalSubject"
          name="generalSubject"
        />

        {/* Your Message */}
        <TextInput
          as="textarea"
          label="Your Message*"
          rows={5}
          required
          id="generalMessage"
          name="generalMessage"
          placeholder="Type your message here..."
        />

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold transition-all disabled:opacity-50 relative z-10" // Added relative z-10
        >
          {loading ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
        </motion.button>
      </form>
    </div>
  )
}

// ------------------------------------------

// --- Toggle Component (Unchanged) ---
const FormToggle = ({ isFlForm, setIsFlForm }: { isFlForm: boolean, setIsFlForm: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const commonClasses = "px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ease-in-out"
  const activeClasses = "bg-accent text-accent-foreground shadow-lg"
  const inactiveClasses = " text-muted-foreground hover:bg-border/50 border border-border"

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex p-1  border border-border rounded-xl shadow-inner max-w-lg mx-auto md:mx-0 mb-8"
    >
      <button
        type="button"
        onClick={() => setIsFlForm(false)}
        className={`${commonClasses} ${!isFlForm ? activeClasses : inactiveClasses} flex-1`}
      >
        General Inquiry
      </button>
      <button
        type="button"
        onClick={() => setIsFlForm(true)}
        className={`${commonClasses} ${isFlForm ? activeClasses : inactiveClasses} flex-1`}
      >
        Course & Enrollment
      </button>
    </motion.div>
  )
}


export default function ContactPage() {
  // HOOK FOR READING URL PARAMS
  const searchParams = useSearchParams()
  const isFlQuery = searchParams.get("flQuery") === "true" // Checks if ?flQuery=true is in the URL

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [enquiryType, setEnquiryType] = useState("")

  const [isFlForm, setIsFlForm] = useState(isFlQuery)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formType: "general" | "fl"
  ) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    formData.append("formType", formType)

    try {
      const res = await fetch("https://www.adwitechnologies.com/mail.php", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (data.error) {
        alert(data.message)
      } else {
        setSubmitted(true)
        form.reset()
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (err) {
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <main className="w-full bg-gradient-to-bl from-card via-background/90 to-primary/15">
        {/* Contact Header Section */}
        <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-primary/15 via-background to-accent/5 relative overflow-hidden">
          {/* Removed MinimalAbstractPattern as requested */}
          <div className="container mx-auto max-w-5xl relative z-10 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-3 leading-tight">
                Contact <span className="text-accent">Us</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium mt-4">
                Have questions or need our services? We'd love to hear from you. Reach out and let's explore how ADWI
                can help your business succeed.
              </p>
            </motion.div>
          </div>
        </section>


        {/* --- DEDICATED OFFICE LOCATIONS SECTION --- */}
        <section className="pt-0 pb-10 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center my-8"
            >
              <h2 className="text-2xl text-center md:text-3xl font-bold text-primary">
                Our <span className="text-accent">Offices</span>
              </h2>
            </motion.div>

            {/* Flex container to allow centering the second row */}
            <div className="flex flex-wrap justify-center gap-6">
              {officeLocations.map((item, idx) => (
                <div
                  key={idx}
                  // Mobile: 100%, Tablet: 2 columns, Desktop: 3 columns
                  className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
                >
                  <OfficeCard
                    office={item}
                    index={idx}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* --- END DEDICATED OFFICE LOCATIONS SECTION --- */}


        {/* --- Main Form and General Contact Section --- */}
        <section className="py-10 md:py-16 pb-10 px-4 ">
          <div className="container mx-auto max-w-6xl">

            {/* 3. Add the Form Toggle Component Here */}
            <FormToggle isFlForm={isFlForm} setIsFlForm={setIsFlForm} />

            {/* Using a single column grid for full width content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Conditional Form Rendering Area (takes 2/3 of the space on medium screens) */}
              <div className="md:col-span-2">
                {/* Render the FL Form if flQuery=true in the URL,
                  otherwise render the General Contact Form.
                */}
                {isFlForm ? (
                  // FL Form: Course & Student Details
                  <FLForm
                    handleSubmit={handleSubmit}
                    loading={loading}
                    submitted={submitted}
                    enquiryType={enquiryType}
                    setEnquiryType={setEnquiryType}
                  />
                ) : (
                  // Normal Form General: General Inquiry Form
                  <GeneralContactForm
                    handleSubmit={handleSubmit}
                    loading={loading}
                    submitted={submitted}
                  />
                )}
              </div>

              {/* General Contact Section (Right side - takes 1/3 of the space on medium screens) */}
              <div className="space-y-5 p-5  border border-border rounded-lg shadow-md md:col-span-1">
                <h2 className="text-xl font-bold text-foreground mb-4">General Contact</h2>

                {/* Phone Contact (using HQ data) */}
                {officeLocations[0].phone && (
                  <ContactCard
                    key="phone"
                    icon={<PhoneIcon />}
                    label="Pune (HQ)"
                    value={officeLocations[0].phone}
                    href={`tel:${officeLocations[0].phone.replace(/\s/g, '')}`}
                    idx={0}
                  />
                )}

                {/* General Email (using HQ data) */}
                {officeLocations[0].email && (
                  <ContactCard
                    key="general-email"
                    icon={<MailIcon />}
                    label="General Email"
                    value={officeLocations[0].email}
                    href={`mailto:${officeLocations[0].email}`}
                    idx={1}
                  />
                )}

                {/* FL Section Email (dedicated) */}
                <ContactCard
                  key="fl-email"
                  icon={<MailIcon />}
                  label="FL Section Email"
                  value="fladwitechnologies@gmail.com"
                  href="mailto:fladwitechnologies@gmail.com"
                  idx={2}
                />
              </div>

            </div>
          </div>
        </section>
        {/* --- End Main Form and General Contact Section --- */}



        {/* Map Section (Unchanged) */}
        <section className="py-8 md:py-12 px-4 ">
          <div className="container mx-auto max-w-6xl">
            <div className="w-full h-48  rounded-lg overflow-hidden border border-border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.6841482843486!2d73.8369869!3d18.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2cf2c2c2c2c2d%3A0x3c3c3c3c3c3c3c3c!2sWarje%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}