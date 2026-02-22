"use client";

import React, { useState } from "react";
import { Mail, Download, Github, Twitter, Linkedin, Copy, CheckCircle2 } from "lucide-react";
import styles from "./ContactPanel.module.css";
import { cn } from "@/lib/utils";

interface ContactPanelProps {
  email: string;
  resumeUrl: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export function ContactPanel({ email, resumeUrl, socials }: ContactPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        
        {/* --- HEADER ZONE (Badge + Title + Subtitle tightly grouped) --- */}
        <div className={styles.header}>
          
          {/* THE ENGRAVED BADGE */}
          <div className={styles.contactBadge}>
            <span>Get In Touch</span>
          </div>

          <h2 className={styles.title}>Ready to build something legendary?</h2>
          
          <p className={styles.subtitle}>
            Whether you need a <strong>Frontend Architect</strong> for your next
            SaaS or a <strong>Technical Writer</strong> to give your Web3 project
            a voice, I'm just one click away.
          </p>
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className={styles.actions}>
          <a href={`mailto:${email}`} className={styles.primaryBtn}>
            <Mail size={18} />
            Hire Me / Collaborate
          </a>

          <a href={resumeUrl} download className={styles.secondaryBtn}>
            <Download size={18} />
            Download CV
          </a>
        </div>

        {/* --- SOCIAL LINKS --- */}
        <div className={styles.socials}>
          {socials.github && (
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
              <Github size={22} />
            </a>
          )}
          {socials.twitter && (
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
              <Twitter size={22} />
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>
          )}

          <button
            onClick={handleCopyEmail}
            className={cn(styles.socialLink, copied && styles.socialLinkSuccess)}
            aria-label="Copy Email"
            title={copied ? "Email Copied!" : "Copy Email to Clipboard"}
          >
            {copied ? <CheckCircle2 size={22} /> : <Copy size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
}