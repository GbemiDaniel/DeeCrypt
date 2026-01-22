import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
    {
      icon: Twitter,
      href: "https://twitter.com/yourusername",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:your@email.com", label: "Email" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Left: Brand & Copy */}
        <div className={styles.left}>
          <span className={styles.brand}>Gbemi Daniel</span>
          <p className={styles.copy}>
            &copy; {currentYear} &middot; Built with React & Tailwind.
          </p>
        </div>

        {/* Right: Social Icons */}
        <div className={styles.socials}>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Decorative Top Glow */}
      <div className={styles.glowLine} />
    </footer>
  );
}
