"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ADDRESS, COORDINATES, EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/content/contact";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialValues: FormValues = { name: "", email: "", phone: "", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const t = useTranslations("contact");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitted(false);
  }

  function validate(): boolean {
    const nextErrors: Partial<FormValues> = {};

    if (!values.name.trim()) {
      nextErrors.name = t("form.errors.name");
    }
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = t("form.errors.email");
    }
    if (!values.message.trim()) {
      nextErrors.message = t("form.errors.message");
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    // TODO: backend/email entegrasyonu
    setValues(initialValues);
    setSubmitted(true);
  }

  return (
    <Section id="contact" className="overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.03]" aria-hidden="true" />

      <Reveal>
        <SectionHeader kicker={t("kicker")} title={t("title")} />
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <Reveal delay={0.1}>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-azure" />
              <p className="text-muted-foreground">{ADDRESS}</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="size-5 shrink-0 text-azure" />
              <a href={`tel:${PHONE_TEL}`} className="transition-colors hover:text-azure">
                {PHONE_DISPLAY}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="size-5 shrink-0 text-azure" />
              <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-azure">
                {EMAIL}
              </a>
            </div>
            <p className="border-t border-border pt-6 font-mono text-xs text-muted-foreground">
              {COORDINATES}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">{t("form.name")}</Label>
              <Input
                id="contact-name"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-email">{t("form.email")}</Label>
              <Input
                id="contact-email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-phone">{t("form.phone")}</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={values.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-message">{t("form.message")}</Label>
              <Textarea
                id="contact-message"
                rows={5}
                value={values.message}
                onChange={(e) => handleChange("message", e.target.value)}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              {t("form.submit")}
            </Button>

            {submitted && (
              <div className="flex items-center gap-2 rounded-lg border border-azure/40 bg-azure/10 px-4 py-3 text-sm text-azure">
                <CheckCircle2 className="size-4 shrink-0" />
                {t("form.success")}
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
