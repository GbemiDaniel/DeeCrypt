import React from "react";
import { Mail, Download, Github, Twitter, Linkedin, Copy } from "lucide-react";
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
  // Optional: Copy email to clipboard feature
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    // You could add a toast notification here "Email Copied!"
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>Ready to build something legendary?</h2>
          <p className={styles.subtitle}>
            Whether you need a <strong>Frontend Architect</strong> for your next
            SaaS or a<strong>Technical Writer</strong> to give your Web3 project
            a voice, I'm just one click away.
          </p>
        </div>

        {/* BUTTONS */}
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

        {/* SOCIALS */}
        <div className={styles.socials}>
          {socials.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
          )}
          {socials.twitter && (
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          )}
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          )}

          {/* Email Copy Icon */}
          <button
            onClick={handleCopyEmail}
            className={styles.socialLink}
            aria-label="Copy Email"
          >
            <Copy size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
