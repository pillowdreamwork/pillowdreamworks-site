import * as React from "react";
import Link from "next/link";
import { FOUNDER_CONTACT, LEGAL_ROUTES } from "@/data/navigation";

export function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li><Link href="/about">About the Foundation</Link></li>
            <li><Link href="/learn">Learning Hub</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><Link href="/books">Books & Workbooks</Link></li>
            <li><Link href="/assessments">Assessments</Link></li>
            <li><Link href="/services">Counseling & Services</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><Link href="/contact">Contact Form</Link></li>
            <li>
              <a href={FOUNDER_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp: +91 97283 55421
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            {LEGAL_ROUTES.map((route) => (
              <li key={route.href}>
                <Link href={route.href}>{route.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 PillowDreamWorks Foundation. All rights reserved.</p>
      </div>
    </footer>
  );
}
