"use client";

import React, { useState, useEffect } from "react";
import { XIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PhoneInput from "@/components/ui/phone-input";
import { useRegisterForm } from "@/services/forms/forms-hooks";
import ReCaptchaV2 from "@/components/ui/recaptcha-v2";
import {
  RECAPTCHA_CONFIG,
  validateRecaptchaConfig,
} from "@/constants/recaptcha";
import { usePopupStore } from "@/store/popup-store";
import { useAlert } from "@/hooks/useAlert";

interface RegisterFormData {
  companyName: string;
  city: string;
  country: string;
  fullName: string;
  phoneNumber: string;
  jobTitle: string;
  email: string;
  responsibleName: string;
  responsiblePosition: string;
  responsibleEmail: string;
  responsiblePhone: string;
  timingId?: string;
}

export default function RegisterPopup() {
  const { isRegisterOpen, registerData, closeRegister } = usePopupStore();
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const { courseTitle = "", timingId = "" } = registerData;
  const [formData, setFormData] = useState<RegisterFormData>({
    companyName: "",
    city: "",
    country: "",
    fullName: "",
    phoneNumber: "",
    jobTitle: "",
    email: "",
    responsibleName: "",
    responsiblePosition: "",
    responsibleEmail: "",
    responsiblePhone: "",
    timingId: timingId,
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isResponsiblePhoneValid, setIsResponsiblePhoneValid] = useState(false);

  // Use the register form mutation
  const registerMutation = useRegisterForm();

  // Check if reCAPTCHA is configured
  const isRecaptchaConfigured = validateRecaptchaConfig();

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isRegisterOpen) {
        closeRegister();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isRegisterOpen, closeRegister]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isRegisterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isRegisterOpen]);

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhoneChange1 = (value: string) => {
    handleInputChange("phoneNumber", value);
  };

  const handlePhoneChange2 = (value: string) => {
    handleInputChange("responsiblePhone", value);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    // Company Information
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    // Contact Information
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!isPhoneValid) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Responsible Person Information
    if (!formData.responsibleName.trim())
      newErrors.responsibleName = "Responsible name is required";
    if (!formData.responsiblePosition.trim())
      newErrors.responsiblePosition = "Responsible position is required";
    if (!formData.responsibleEmail.trim()) {
      newErrors.responsibleEmail = "Responsible email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.responsibleEmail)) {
      newErrors.responsibleEmail = "Please enter a valid email address";
    }
    if (!formData.responsiblePhone.trim()) {
      newErrors.responsiblePhone = "Responsible phone is required";
    } else if (!isResponsiblePhoneValid) {
      newErrors.responsiblePhone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
    setRecaptchaVerified(true);
  };

  const handleRecaptchaError = (error: any) => {
    // Only log error in development mode
    if (process.env.NODE_ENV === "development") {
      console.error("reCAPTCHA error:", error);
    }
    setRecaptchaVerified(false);
    setRecaptchaToken(null);
    // Don't show error toast for reCAPTCHA errors to avoid user confusion
  };

  const handleRecaptchaExpire = () => {
    setRecaptchaVerified(false);
    setRecaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Check reCAPTCHA only if it's configured
    if (isRecaptchaConfigured && !recaptchaVerified) {
      showErrorAlert("Error!", "Please complete the reCAPTCHA verification");
      return;
    }

    // Prepare data for API
    const apiData = {
      full_name: formData.fullName,
      mobile: formData.phoneNumber,
      email: formData.email,
      job_title: formData.jobTitle,
      company_name: formData.companyName,
      country: formData.country,
      city: formData.city,
      responsible_name: formData.responsibleName,
      responsible_mobile: formData.responsiblePhone,
      responsible_email: formData.responsibleEmail,
      responsible_position: formData.responsiblePosition,
      timing_id: parseInt(formData.timingId || "0") || 0,
      ...(isRecaptchaConfigured &&
        recaptchaToken && { recaptcha_token: recaptchaToken }),
    };

    try {
      await registerMutation.mutateAsync(apiData);

      showSuccessAlert("Registration Successful!", "We will contact you soon.");

      // Reset form
      setFormData({
        companyName: "",
        city: "",
        country: "",
        fullName: "",
        phoneNumber: "",
        jobTitle: "",
        email: "",
        responsibleName: "",
        responsiblePosition: "",
        responsibleEmail: "",
        responsiblePhone: "",
        timingId: timingId,
      });
      setRecaptchaVerified(false);
      setRecaptchaToken(null);
      closeRegister();
    } catch (error) {
      showErrorAlert(
        "Error!",
        "There was an error with your registration. Please try again."
      );
    }
  };

  if (!isRegisterOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeRegister();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 overflow-y-auto md:p-4 max-md:items-start max-md:pt-8 max-md:p-2"
      onClick={handleOverlayClick}
    >
      {/* Modal Content */}
      <div className="bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] w-full max-w-[1152px] rounded-lg md:rounded-[18px] md:p-2.5 overflow-hidden relative mx-auto max-md:rounded-lg">
        {/* Close Button */}
        <button
          onClick={closeRegister}
          className="absolute top-1 right-2.5 bg-none border-none text-sm text-[#6F6F6F] cursor-pointer z-10 p-2.5 rounded-full transition-all duration-300 hover:bg-gray-100"
        >
          <XIcon className="w-4 h-4" />
        </button>

        <div className="register-modal flex flex-col h-full max-h-full">
          {/* Right Section - Registration Form */}
          <div className="register-right flex-1 p-4 overflow-y-auto rounded-lg max-md:p-3">
            {/* Header */}
            <div className="register-header mb-8 max-md:mb-6">
              <h3 className="text-[#3E5EC0] text-xl font-bold mb-2 max-md:text-lg">
                {courseTitle || "Course Registration"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Company Information */}
              <div>
                <h2 className="text-[#3E5EC0] font-semibold mb-3">
                  Company information
                </h2>
                <div className="grid gap-2 md:grid-cols-3 max-md:grid-cols-1 max-md:gap-3">
                  {/* Company Name */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="company_name"
                      className="text-xs text-[#333]"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      placeholder="Company"
                      value={formData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      className={cn(
                        "text-sm placeholder:text-xs h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                        errors.companyName && "border-red-500"
                      )}
                      required
                    />
                    {errors.companyName && (
                      <span className="text-red-500 text-xs">
                        {errors.companyName}
                      </span>
                    )}
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="city" className="text-xs text-[#333]">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className={cn(
                        "text-sm placeholder:text-xs  h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                        errors.city && "border-red-500"
                      )}
                      required
                    />
                    {errors.city && (
                      <span className="text-red-500 text-xs">
                        {errors.city}
                      </span>
                    )}
                  </div>

                  {/* Country */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="country" className="text-xs text-[#333]">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className={cn(
                        "text-sm placeholder:text-xs  h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                        errors.country && "border-red-500"
                      )}
                      required
                    />
                    {errors.country && (
                      <span className="text-red-500 text-xs">
                        {errors.country}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-[#3E5EC0] font-semibold mb-3">
                  Contact information
                </h2>
                <div className="grid gap-2 md:grid-cols-4 max-md:grid-cols-1 max-md:gap-3">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="full_name" className="text-xs text-[#333]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className={cn(
                        "text-sm placeholder:text-xs  h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                        errors.fullName && "border-red-500"
                      )}
                      required
                    />
                    {errors.fullName && (
                      <span className="text-red-500 text-xs">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone Number - Full Width */}
                  <div className="md:col-span-1">
                    <PhoneInput
                      id="phone5"
                      name="mobile"
                      label="Phone Number"
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange1}
                      onValidationChange={setIsPhoneValid}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber}
                      required
                      defaultCountry="US"
                    />
                  </div>

                  {/* Job Title */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="job_title" className="text-xs text-[#333]">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="job_title"
                      name="job_title"
                      placeholder="Job Title"
                      value={formData.jobTitle}
                      onChange={(e) =>
                        handleInputChange("jobTitle", e.target.value)
                      }
                      className={cn(
                        "text-sm placeholder:text-xs  h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                        errors.jobTitle && "border-red-500"
                      )}
                      required
                    />
                    {errors.jobTitle && (
                      <span className="text-red-500 text-xs">
                        {errors.jobTitle}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-xs text-[#333]">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={cn(
                        "text-sm placeholder:text-xs  h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                        errors.email && "border-red-500"
                      )}
                      required
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Responsible Person Information */}
              <div>
                <h2 className="text-[#3E5EC0] font-semibold mb-3">
                  Responsible Person Information
                </h2>
                <div className="grid gap-x-2 gap-y-4 md:grid-cols-4 max-md:grid-cols-1">
                  {/* Responsible Name */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="responsible_name"
                      className="text-xs text-[#333]"
                    >
                      Responsible Name
                    </label>
                    <input
                      type="text"
                      id="responsible_name"
                      name="responsible_name"
                      placeholder="Responsible Name"
                      value={formData.responsibleName}
                      onChange={(e) =>
                        handleInputChange("responsibleName", e.target.value)
                      }
                      className={cn(
                        "text-sm placeholder:text-xs h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                        errors.responsibleName && "border-red-500"
                      )}
                      required
                    />
                    {errors.responsibleName && (
                      <span className="text-red-500 text-xs">
                        {errors.responsibleName}
                      </span>
                    )}
                  </div>

                  {/* Responsible Position */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="responsible_position"
                      className="text-xs text-[#333]"
                    >
                      Responsible Position
                    </label>
                    <input
                      type="text"
                      id="responsible_position"
                      name="responsible_position"
                      placeholder="Responsible Position"
                      value={formData.responsiblePosition}
                      onChange={(e) =>
                        handleInputChange("responsiblePosition", e.target.value)
                      }
                      className={cn(
                        "text-sm placeholder:text-xs  h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                        errors.responsiblePosition && "border-red-500"
                      )}
                      required
                    />
                    {errors.responsiblePosition && (
                      <span className="text-red-500 text-xs">
                        {errors.responsiblePosition}
                      </span>
                    )}
                  </div>

                  {/* Responsible Email */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="responsible_email"
                      className="text-xs text-[#333]"
                    >
                      Responsible Email
                    </label>
                    <input
                      type="email"
                      id="responsible_email"
                      name="responsible_email"
                      placeholder="Responsible Email"
                      value={formData.responsibleEmail}
                      onChange={(e) =>
                        handleInputChange("responsibleEmail", e.target.value)
                      }
                      className={cn(
                        "text-sm placeholder:text-xs  h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                        errors.responsibleEmail && "border-red-500"
                      )}
                      required
                    />
                    {errors.responsibleEmail && (
                      <span className="text-red-500 text-xs">
                        {errors.responsibleEmail}
                      </span>
                    )}
                  </div>

                  {/* Responsible Phone - Full Width */}
                  <div className="md:col-span-1">
                    <PhoneInput
                      id="responsible_phone"
                      name="responsible_mobile"
                      label="Responsible Phone"
                      placeholder="Responsible Phone"
                      value={formData.responsiblePhone}
                      onChange={handlePhoneChange2}
                      onValidationChange={setIsResponsiblePhoneValid}
                      error={!!errors.responsiblePhone}
                      helperText={errors.responsiblePhone}
                      required
                      defaultCountry="US"
                    />
                  </div>
                </div>
              </div>

              {/* Hidden timing ID */}
              <input type="hidden" name="timing_id" value={timingId} />

              {/* Important Notice */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 mb-2">
                <ul className="text-[#333] text-xs space-y-1">
                  <li className="leading-relaxed">
                    This registration form is for preliminary registration only and does not constitute a final or confirmed enrollment in the training course.
                    Registration will be officially confirmed only upon receipt of an email from the relevant department within the organization, sent from the organization's official email address, and containing the registration approval details.{" "}
                    <span className="text-[#314ea9] font-semibold">
                      If such an email is not received, the registration will not be considered confirmed.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Submit Section */}
              <div className="form-submition flex items-center justify-between gap-8 max-md:flex-col-reverse max-md:gap-4">
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    !recaptchaVerified ||
                    registerMutation.isPending ||
                    !isPhoneValid ||
                    !isResponsiblePhoneValid
                  }
                  className="min-w-[170px] w-fit h-11 rounded-md px-2 text-sm font-semibold text-white bg-gradient-to-r from-[#314EA9] to-[#446AE1] border-none cursor-pointer flex items-center justify-center gap-2 ml-0 transition-all duration-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed max-md:w-full max-md:min-w-auto max-md:text-xs"
                >
                  <span className="btn-text">
                    {registerMutation.isPending ? "Registering..." : "Register"}
                  </span>
                  {!registerMutation.isPending && (
                    <ChevronRightIcon className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                  )}
                </button>

                {/* reCAPTCHA v2 */}
                <ReCaptchaV2
                  onVerify={handleRecaptchaVerify}
                  onError={handleRecaptchaError}
                  onExpire={handleRecaptchaExpire}
                  theme="light"
                  size="normal"
                  action={RECAPTCHA_CONFIG.actions.register}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
