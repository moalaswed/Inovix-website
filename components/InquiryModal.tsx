"use client";

/**
 * BUDGET_RANGES — edit this array to change currency and amounts.
 * Each entry: { value: string (sent in email), label: string (shown in dropdown) }
 */
export const BUDGET_RANGES = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 – $10,000" },
  { value: "10k-25k", label: "$10,000 – $25,000" },
  { value: "25k-50k", label: "$25,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type BudgetValue = (typeof BUDGET_RANGES)[number]["value"];

import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useId,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useModal } from "@/lib/i18n/ModalContext";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { translations } from "@/lib/i18n/translations";
import BudgetSlider, { formatBudgetValue } from "@/components/BudgetSlider";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type RequestType = "consultation" | "projectRequest" | "serviceRequest" | "";
type ConsultationType = "website" | "mobileApp" | "uiux" | "general" | "";
type ServiceType = "website" | "mobileApp" | "design" | "";

interface FormValues {
  email: string;
  requestType: RequestType;
  consultationType: ConsultationType;
  serviceType: ServiceType;
  budget: string;
  description: string;
  honeypot: string; // hidden spam trap
}

interface FormErrors {
  email?: string;
  requestType?: string;
  consultationType?: string;
  serviceType?: string;
  budget?: string;
  description?: string;
}

const DEFAULT_BUDGET_AMOUNT = 10000;

/* ─── Contextual Description Field Configuration ───────────────────────── */
const DESCRIPTION_CONFIG: Record<
  "en" | "ar",
  Record<
    Exclude<RequestType, "">,
    { label: string; placeholder: string }
  >
> = {
  en: {
    consultation: {
      label: "CONSULTATION DETAILS",
      placeholder:
        "Briefly explain what tech challenge or advisory topic you need help with...",
    },
    projectRequest: {
      label: "PROJECT BRIEF",
      placeholder:
        "Tell us about your project scope, target platforms, and core features...",
    },
    serviceRequest: {
      label: "SERVICE REQUIREMENTS",
      placeholder:
        "Describe the specific service you are looking for and any technical requirements...",
    },
  },
  ar: {
    consultation: {
      label: "تفاصيل الاستشارة",
      placeholder:
        "اشرح باختصار التحدي التقني أو موضوع الاستشارة الذي تحتاج إلى مساعدة فيه...",
    },
    projectRequest: {
      label: "ملخص المشروع",
      placeholder:
        "أخبرنا عن نطاق مشروعك، المنصات المستهدفة، والميزات الأساسية...",
    },
    serviceRequest: {
      label: "متطلبات الخدمة",
      placeholder:
        "صف الخدمة المحددة التي تبحث عنها وأي متطلبات تقنية...",
    },
  },
};

const INITIAL_VALUES: FormValues = {
  email: "",
  requestType: "",
  consultationType: "",
  serviceType: "",
  budget: formatBudgetValue(DEFAULT_BUDGET_AMOUNT),
  description: "",
  honeypot: "",
};

/* ─── Focus trap utility ─────────────────────────────────────────────────── */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}

/* ─── Field wrapper with animated label ─────────────────────────────────── */
function FieldWrapper({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <label
        htmlFor={htmlFor}
        className="text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-wider"
      >
        {label}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-xs text-red-400 font-medium"
            role="alert"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Shared input/select class builders ────────────────────────────────── */
const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl bg-slate-900/50 backdrop-blur-md border ${
    hasError
      ? "border-red-500/70 focus:border-red-400"
      : "border-white/10 focus:border-cyan-400/80"
  } text-[#F5F5F5] placeholder-[#4A5568] text-sm outline-none transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_0_3px_rgba(34,211,238,0.15)] min-h-[48px]`;

/* ─── Main Modal Component ───────────────────────────────────────────────── */
export default function InquiryModal() {
  const { isOpen, closeModal } = useModal();
  const { lang, isRTL } = useLanguage();
  const t = translations[lang].modal;

  const dialogRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (suffix: string) => `modal-${uid}-${suffix}`;

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [budgetNumeric, setBudgetNumeric] = useState<number>(DEFAULT_BUDGET_AMOUNT);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");

  /* ── Body scroll lock ──────────────────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  /* ── Auto-focus first focusable element ───────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const el = dialogRef.current;
        if (!el) return;
        getFocusableElements(el)[0]?.focus();
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  /* ── Focus trap ───────────────────────────────────────────────────────── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab") return;
      const el = dialogRef.current;
      if (!el) return;
      const focusable = getFocusableElements(el);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [closeModal]
  );

  /* ── Clear hidden fields when request type changes ─────────────────────── */
  const handleRequestTypeChange = (val: RequestType) => {
    setValues((prev) => ({
      ...prev,
      requestType: val,
      consultationType: "",
      serviceType: "",
      budget: val === "consultation" ? "" : formatBudgetValue(budgetNumeric),
    }));
    setErrors((prev) => ({
      ...prev,
      requestType: undefined,
      consultationType: undefined,
      serviceType: undefined,
      budget: undefined,
      description: undefined,
    }));
  };

  /* ── Validation ────────────────────────────────────────────────────────── */
  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!values.email) {
      e.email = t.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.email = t.errors.emailInvalid;
    }
    if (!values.requestType) {
      e.requestType = t.errors.requestTypeRequired;
    }
    if (values.requestType === "consultation" && !values.consultationType) {
      e.consultationType = t.errors.consultationTypeRequired;
    }
    if (
      (values.requestType === "projectRequest" ||
        values.requestType === "serviceRequest") &&
      !values.serviceType
    ) {
      e.serviceType = t.errors.serviceTypeRequired;
    }
    if (
      (values.requestType === "projectRequest" ||
        values.requestType === "serviceRequest") &&
      !values.budget
    ) {
      e.budget = t.errors.budgetRequired;
    }
    return e;
  };

  /* ── Submit ────────────────────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: silently discard
    if (values.honeypot) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    const payload = {
      email: values.email,
      requestType: values.requestType,
      consultationType:
        values.requestType === "consultation"
          ? values.consultationType
          : undefined,
      serviceType:
        values.requestType !== "consultation"
          ? values.serviceType
          : undefined,
      budget:
        values.requestType !== "consultation" ? values.budget : undefined,
      description: values.description?.trim() || undefined,
      lang,
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitState("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data?.error || t.errorMessage);
        setSubmitState("error");
      }
    } catch {
      setServerError(t.errorMessage);
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Reset form on open ────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    setValues(INITIAL_VALUES);
    setBudgetNumeric(DEFAULT_BUDGET_AMOUNT);
    setErrors({});
    setSubmitState("idle");
    setServerError("");
    setIsSubmitting(false);
  }, [isOpen]);

  const showConsultationFields = values.requestType === "consultation";
  const showProjectFields =
    values.requestType === "projectRequest" ||
    values.requestType === "serviceRequest";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={closeModal}
          />

          {/* ── Modal container ──────────────────────────────────────────── */}
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
            aria-hidden="false"
          >
            <motion.div
              key="modal"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={id("title")}
              dir={isRTL ? "rtl" : "ltr"}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 28,
                mass: 0.9,
              }}
              onKeyDown={handleKeyDown}
              tabIndex={-1}
              className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden
                         bg-slate-900/60 backdrop-blur-2xl border border-white/15
                         shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_60px_rgba(34,211,238,0.15),0_32px_80px_rgba(0,0,0,0.85)]
                         outline-none transition-all duration-500 ease-out"
            >
              {/* Specular top highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />

              {/* Background image + liquid glass overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
                style={{ backgroundImage: "url('/modal-bg.jpg')" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at top, rgba(30, 41, 59, 0.7) 0%, rgba(11, 15, 25, 0.88) 100%)" }}
                aria-hidden="true"
              />

              {/* ── Header ────────────────────────────────────────────────── */}
              <div className="relative z-10 flex items-start justify-between px-5 py-4 sm:px-6 sm:pt-6 sm:pb-4 border-b border-white/10 shrink-0">
                <div>
                  <h2
                    id={id("title")}
                    className="text-lg sm:text-xl font-heading font-bold text-[#F5F5F5] tracking-tight"
                  >
                    {t.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-[#64748B]">{t.subtitle}</p>
                </div>
                <button
                  onClick={closeModal}
                  id={id("close")}
                  aria-label="Close modal"
                  className="min-w-[44px] min-h-[44px] p-2.5 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md text-[#94A3B8] hover:text-[#F5F5F5] hover:border-cyan-500/40 hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] transition-all duration-300 shrink-0 ms-3 sm:ms-4"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ── Scrollable body ───────────────────────────────────────── */}
              <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5 space-y-4 sm:space-y-5">
                {/* ── SUCCESS STATE ─────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                  {submitState === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, type: "spring", stiffness: 260, damping: 22 }}
                      className="flex flex-col items-center justify-center py-12 text-center gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 320, damping: 20 }}
                        className="w-16 h-16 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/40 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-8 h-8 text-[#22D3EE]" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-[#F5F5F5] mb-1">
                          {t.successTitle}
                        </h3>
                        <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs mx-auto">
                          {t.successMessage}
                        </p>
                      </div>
                      <button
                        onClick={closeModal}
                        className="mt-2 px-6 py-2.5 rounded-xl border border-[#2E3342] bg-[#1C1E26] text-sm font-semibold text-[#F5F5F5] hover:border-[#22D3EE]/50 transition-all duration-200"
                      >
                        {t.closeButton}
                      </button>
                    </motion.div>
                  ) : (
                    /* ── FORM ─────────────────────────────────────────────── */
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      aria-label={t.title}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Honeypot — hidden from real users */}
                      <input
                        type="text"
                        name="website_url"
                        value={values.honeypot}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, honeypot: e.target.value }))
                        }
                        tabIndex={-1}
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: "-9999px",
                          width: "1px",
                          height: "1px",
                          opacity: 0,
                        }}
                        autoComplete="off"
                      />

                      {/* ── Email ─────────────────────────────────────────── */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                      >
                        <FieldWrapper
                          label={t.emailLabel}
                          error={errors.email}
                          htmlFor={id("email")}
                        >
                          <input
                            id={id("email")}
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={(e) => {
                              setValues((v) => ({
                                ...v,
                                email: e.target.value,
                              }));
                              if (errors.email)
                                setErrors((er) => ({ ...er, email: undefined }));
                            }}
                            placeholder={t.emailPlaceholder}
                            className={inputClass(!!errors.email)}
                            aria-required="true"
                            aria-describedby={
                              errors.email ? id("email-err") : undefined
                            }
                            aria-invalid={!!errors.email}
                          />
                        </FieldWrapper>
                      </motion.div>

                      {/* ── Request Type ─────────────────────────────────── */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <FieldWrapper
                          label={t.requestTypeLabel}
                          error={errors.requestType}
                          htmlFor={id("requestType")}
                        >
                          <select
                            id={id("requestType")}
                            name="requestType"
                            value={values.requestType}
                            onChange={(e) =>
                              handleRequestTypeChange(
                                e.target.value as RequestType
                              )
                            }
                            className={inputClass(!!errors.requestType)}
                            aria-required="true"
                            aria-invalid={!!errors.requestType}
                          >
                            <option value="" disabled>
                              {t.requestTypePlaceholder}
                            </option>
                            <option value="consultation">
                              {t.requestTypes.consultation}
                            </option>
                            <option value="projectRequest">
                              {t.requestTypes.projectRequest}
                            </option>
                            <option value="serviceRequest">
                              {t.requestTypes.serviceRequest}
                            </option>
                          </select>
                        </FieldWrapper>
                      </motion.div>

                      {/* ── Consultation fields (animated) ───────────────── */}
                      <AnimatePresence>
                        {showConsultationFields && (
                          <motion.div
                            key="consultation"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <FieldWrapper
                              label={t.consultationTypeLabel}
                              error={errors.consultationType}
                              htmlFor={id("consultationType")}
                            >
                              <select
                                id={id("consultationType")}
                                name="consultationType"
                                value={values.consultationType}
                                onChange={(e) => {
                                  setValues((v) => ({
                                    ...v,
                                    consultationType: e.target
                                      .value as ConsultationType,
                                  }));
                                  if (errors.consultationType)
                                    setErrors((er) => ({
                                      ...er,
                                      consultationType: undefined,
                                    }));
                                }}
                                className={inputClass(
                                  !!errors.consultationType
                                )}
                                aria-required="true"
                                aria-invalid={!!errors.consultationType}
                              >
                                <option value="" disabled>
                                  {t.consultationTypePlaceholder}
                                </option>
                                <option value="website">
                                  {t.consultationTypes.website}
                                </option>
                                <option value="mobileApp">
                                  {t.consultationTypes.mobileApp}
                                </option>
                                <option value="uiux">
                                  {t.consultationTypes.uiux}
                                </option>
                                <option value="general">
                                  {t.consultationTypes.general}
                                </option>
                              </select>
                            </FieldWrapper>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ── Project/Service fields (animated) ────────────── */}
                      <AnimatePresence>
                        {showProjectFields && (
                          <motion.div
                            key="project"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                            className="space-y-5"
                          >
                            {/* Service type */}
                            <FieldWrapper
                              label={t.serviceTypeLabel}
                              error={errors.serviceType}
                              htmlFor={id("serviceType")}
                            >
                              <select
                                id={id("serviceType")}
                                name="serviceType"
                                value={values.serviceType}
                                onChange={(e) => {
                                  setValues((v) => ({
                                    ...v,
                                    serviceType: e.target.value as ServiceType,
                                  }));
                                  if (errors.serviceType)
                                    setErrors((er) => ({
                                      ...er,
                                      serviceType: undefined,
                                    }));
                                }}
                                className={inputClass(!!errors.serviceType)}
                                aria-required="true"
                                aria-invalid={!!errors.serviceType}
                              >
                                <option value="" disabled>
                                  {t.serviceTypePlaceholder}
                                </option>
                                <option value="website">
                                  {t.serviceTypes.website}
                                </option>
                                <option value="mobileApp">
                                  {t.serviceTypes.mobileApp}
                                </option>
                                <option value="design">
                                  {t.serviceTypes.design}
                                </option>
                              </select>
                            </FieldWrapper>

                            {/* Budget Slider */}
                            <BudgetSlider
                              id={id("budget")}
                              name="budget"
                              label={t.budgetLabel}
                              value={budgetNumeric}
                              onChange={(num, formatted) => {
                                setBudgetNumeric(num);
                                setValues((v) => ({ ...v, budget: formatted }));
                                if (errors.budget) {
                                  setErrors((er) => ({
                                    ...er,
                                    budget: undefined,
                                  }));
                                }
                              }}
                              error={errors.budget}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ── Contextual Description Textarea (animated) ──── */}
                      <AnimatePresence>
                        {values.requestType && (
                          <motion.div
                            key="description-field"
                            initial={{ opacity: 0, height: 0, y: -8 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -8 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            {(() => {
                              const descConfig =
                                DESCRIPTION_CONFIG[lang]?.[values.requestType] ??
                                DESCRIPTION_CONFIG.en[values.requestType];
                              return (
                                <FieldWrapper
                                  label={descConfig.label}
                                  error={errors.description}
                                  htmlFor={id("description")}
                                >
                                  <textarea
                                    id={id("description")}
                                    name="description"
                                    rows={4}
                                    value={values.description}
                                    onChange={(e) => {
                                      setValues((v) => ({
                                        ...v,
                                        description: e.target.value,
                                      }));
                                      if (errors.description) {
                                        setErrors((er) => ({
                                          ...er,
                                          description: undefined,
                                        }));
                                      }
                                    }}
                                    placeholder={descConfig.placeholder}
                                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 backdrop-blur-md border ${
                                      errors.description
                                        ? "border-red-500/70 focus:border-red-400"
                                        : "border-white/10 focus:border-cyan-400/80"
                                    } text-[#F5F5F5] placeholder-[#4A5568] text-sm outline-none transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] focus:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_0_3px_rgba(34,211,238,0.15)] resize-none leading-relaxed`}
                                  />
                                </FieldWrapper>
                              );
                            })()}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ── Server error banner ───────────────────────────── */}
                      <AnimatePresence>
                        {submitState === "error" && serverError && (
                          <motion.div
                            key="server-error"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-sm text-red-300"
                            role="alert"
                          >
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                            <span>{serverError}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ── Submit ────────────────────────────────────────── */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 }}
                      >
                        <button
                          type="submit"
                          id={id("submit")}
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-[#0A0E16]
                                     bg-[#22D3EE] hover:bg-[#2DD4E8]
                                     shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_32px_rgba(34,211,238,0.65)]
                                     disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none
                                     transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>{t.submitting}</span>
                            </>
                          ) : (
                            <span>{t.submitButton}</span>
                          )}
                        </button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
