"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Facebook, Linkedin, X } from "lucide-react";

interface SocialShareButtonsProps {
  courseUrl: string;
  courseTitle: string;
  courseDescription: string;
}

export default function SocialShareButtons({ 
  courseUrl, 
  courseTitle, 
  courseDescription 
}: SocialShareButtonsProps) {
  const [fullUrl, setFullUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setFullUrl(`${window.location.origin}${courseUrl}`);
  }, [courseUrl]);

  if (!isMounted) {
    // Loading state for social buttons
    return (
      <div className="flex justify-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="social-share-buttons flex justify-center gap-3">
      {/* Facebook */}
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn facebook-btn flex items-center justify-center w-10 h-10 bg-[#1877f2] text-white rounded-lg no-underline font-medium text-lg transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#166fe5] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:no-underline"
        aria-label="Share on Facebook"
      >
        <Facebook size={18} />
      </Link>

      {/* X (Twitter) */}
      <Link
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${courseTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn twitter-btn flex items-center justify-center w-10 h-10 bg-[#1da1f2] text-white rounded-lg no-underline font-medium text-lg transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#0d8bd9] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:no-underline"
        aria-label="Share on Twitter"
      >
        <X size={18} />
      </Link>

      {/* LinkedIn */}
      <Link
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${courseTitle}&summary=${encodeURIComponent(courseDescription)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn linkedin-btn flex items-center justify-center w-10 h-10 bg-[#0a66c2] text-white rounded-lg no-underline font-medium text-lg transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#004182] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:no-underline"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </Link>
    </div>
  );
}
