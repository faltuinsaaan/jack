import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface LegalModalProps {
  page: 'privacy' | 'terms';
  onClose: () => void;
}

const PrivacyContent = () => (
  <div className="space-y-8 font-sans text-app-text-body font-light leading-relaxed text-left">
    <div className="space-y-4 mb-12">
      <h1 className="font-serif text-4xl md:text-5xl text-app-text tracking-tight uppercase">PRIVACY</h1>
      <p className="font-serif italic text-app-text-muted text-lg md:text-xl font-light">
        Good collaborations begin with trust.
      </p>
      <p className="text-base text-app-text-muted">
        This page explains what information is collected, how it is used, and how it is protected.
      </p>
    </div>

    <p><strong>Last Updated:</strong> July 2026</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Introduction</h3>
    <p>Your privacy matters.</p>
    <p>This website is operated by <strong>Priyank Verma</strong> ("I", "me", or "my"). This Privacy Policy explains what information is collected when you visit this website, how it is used, and the choices you have regarding your data.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Information I Collect</h3>
    <p>If you contact me through the website, I may collect:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Your name</li>
      <li>Email address</li>
      <li>Company name (if provided)</li>
      <li>Project details or message</li>
      <li>Any additional information you choose to share</li>
    </ul>
    <p className="mt-4">I also collect basic technical information automatically, such as:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Browser type</li>
      <li>Device information</li>
      <li>IP address</li>
      <li>Pages visited</li>
      <li>Referring website</li>
      <li>General analytics data</li>
    </ul>
    <p className="mt-4">This information helps improve the website and understand visitor interactions.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">How Your Information Is Used</h3>
    <p>Information is used only to:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Respond to inquiries</li>
      <li>Discuss potential collaborations or projects</li>
      <li>Improve the website and user experience</li>
      <li>Maintain the security and reliability of the website</li>
    </ul>
    <p className="mt-4">I do <strong>not</strong> sell, rent, or trade your personal information.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Analytics & Cookies</h3>
    <p>This website may use analytics services to better understand visitor behavior.</p>
    <p>These services may use cookies or similar technologies to collect anonymous usage information.</p>
    <p>You can disable cookies through your browser settings if you prefer.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Data Storage</h3>
    <p>Messages submitted through the contact form may be stored securely for communication purposes.</p>
    <p>Reasonable technical and organizational measures are taken to protect your information, but no method of internet transmission or storage can be guaranteed to be completely secure.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Third-Party Services</h3>
    <p>This website may use trusted third-party providers, including but not limited to:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Hosting provider</li>
      <li>Email service</li>
      <li>Analytics platform</li>
      <li>Content delivery network (CDN)</li>
    </ul>
    <p className="mt-4">These providers process information only as necessary to perform their services.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">External Links</h3>
    <p>This website may contain links to third-party websites.</p>
    <p>I am not responsible for the privacy practices or content of external websites.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Your Rights</h3>
    <p>Depending on your location, you may have the right to:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Request access to your personal information</li>
      <li>Request correction of inaccurate information</li>
      <li>Request deletion of your information</li>
      <li>Withdraw consent where applicable</li>
    </ul>
    <p className="mt-4">To make a request, contact me using the email address provided on this website.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Changes</h3>
    <p>This Privacy Policy may be updated periodically.</p>
    <p>The "Last Updated" date will always reflect the latest version.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Contact</h3>
    <p>If you have questions regarding this Privacy Policy, please reach out through the contact page.</p>
  </div>
);

const TermsContent = () => (
  <div className="space-y-8 font-sans text-app-text-body font-light leading-relaxed text-left">
    <div className="space-y-4 mb-12">
      <h1 className="font-serif text-4xl md:text-5xl text-app-text tracking-tight uppercase">TERMS</h1>
      <p className="font-serif italic text-app-text-muted text-lg md:text-xl font-light">
        Every project begins with clarity.
      </p>
      <p className="text-base text-app-text-muted">
        These terms outline how this website and its content may be used.
      </p>
    </div>

    <p><strong>Last Updated:</strong> July 2026</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Welcome</h3>
    <p>By accessing this website, you agree to these Terms of Use.</p>
    <p>If you do not agree with these terms, please discontinue use of the website.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Purpose</h3>
    <p>This website serves as the personal portfolio and professional showcase of <strong>Priyank Verma</strong>.</p>
    <p>The content is provided for informational, educational, and professional purposes.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Intellectual Property</h3>
    <p>Unless otherwise noted, all original content on this website—including but not limited to:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Design</li>
      <li>Layout</li>
      <li>Writing</li>
      <li>Graphics</li>
      <li>Branding</li>
      <li>Custom illustrations</li>
      <li>Project documentation</li>
      <li>Source code created specifically for this website</li>
    </ul>
    <p className="mt-4">is the intellectual property of Priyank Verma.</p>
    <p>You may not reproduce, redistribute, or commercially use any original material without prior written permission.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Project Work</h3>
    <p>Some showcased projects may include:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Client work</li>
      <li>Concept work</li>
      <li>Experimental projects</li>
      <li>Open-source contributions</li>
    </ul>
    <p className="mt-4">Any trademarks, logos, or third-party assets remain the property of their respective owners.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Acceptable Use</h3>
    <p>You agree not to:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Attempt unauthorized access to the website or its infrastructure</li>
      <li>Disrupt or interfere with normal website operation</li>
      <li>Use website content for unlawful purposes</li>
      <li>Misrepresent the work or identity presented on this website</li>
    </ul>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Accuracy</h3>
    <p>Reasonable effort is made to keep all information accurate and current.</p>
    <p>However, content may change over time, and no guarantee is made regarding completeness or accuracy.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">External Websites</h3>
    <p>Links to third-party websites are provided for convenience only.</p>
    <p>I am not responsible for their content, availability, or policies.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">No Warranty</h3>
    <p>This website is provided "as is" without warranties of any kind, whether express or implied.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Limitation of Liability</h3>
    <p>To the fullest extent permitted by law, I shall not be liable for any damages arising from the use—or inability to use—this website.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Changes</h3>
    <p>These Terms may be updated at any time.</p>
    <p>Continued use of the website after changes become effective constitutes acceptance of the revised Terms.</p>

    <h3 className="font-serif text-2xl text-app-text mt-12 mb-4">Contact</h3>
    <p>Questions regarding these Terms may be submitted through the contact page.</p>
  </div>
);

export default function LegalModal({ page, onClose }: LegalModalProps) {
  useEffect(() => {
    if (page) {
      document.title = page === 'privacy' 
        ? 'Privacy Policy | Priyank Verma' 
        : 'Terms of Use | Priyank Verma';
    }
    
    return () => {
      document.title = 'AIKNPRY | Portfolio of Priyank Verma';
    };
  }, [page]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-app-bg flex flex-col pl-6 pr-6 md:pl-12 md:pr-12"
    >
      <div className="fixed top-0 left-0 bottom-0 w-6 md:w-12 border-r border-app-border pointer-events-none" />
      <div className="fixed top-0 right-0 bottom-0 w-6 md:w-12 border-l border-app-border pointer-events-none" />

      <div className="w-full border-b border-app-border z-10 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <button
            onClick={onClose}
            className="flex items-center space-x-3 text-app-text md:text-app-text-muted md:hover:text-app-text font-mono text-xs uppercase tracking-widest cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <span className="font-mono text-[9px] text-app-text-dim uppercase tracking-[0.2em]">
            {page === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24 pt-12">
        <div className="max-w-3xl mx-auto w-full px-6 md:px-12 pb-16 space-y-12">
          {page === 'privacy' && <PrivacyContent />}
          {page === 'terms' && <TermsContent />}
        </div>
      </div>
    </motion.div>
  );
}
