import { useMemo, useState } from "react";
import { toast } from "sonner";
import Button from "../../ui/Button";
import { FiCopy, FiCheck, FiMail, FiMessageCircle, FiArrowRight } from "react-icons/fi";

const CONTACT_EMAIL = "your.email@example.com";
const WHATSAPP_LINK = "https://wa.me/628xxxxxxxxx";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(true);
      toast.error("Failed to copy email");
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <section className="max-w-[1500px] mx-auto px-4 md:px-6 py-16">
      <div
        className="bg-black text-yellow-300 border-4 border-black p-10 md:p-14
                   shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      >
        <h2 className="text-5xl md:text-6xl font-black uppercase leading-none">
          Let's Work
          <br />
          Together
        </h2>

        <p className="mt-6 text-lg font-bold max-w-2xl leading-relaxed">
          Open for freelance, collaboration, and creative frontend projects.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex-1 bg-white border-4 border-black text-black px-5 py-4 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-300 border-2 border-black flex items-center justify-center shrink-0">
              <FiMail className="text-xl stroke-[3]" />
            </div>
            <div>
              <p className="font-black uppercase text-[10px] opacity-60">Email Address</p>
              <p className="font-black break-all">{CONTACT_EMAIL}</p>
            </div>
          </div>

          <Button
            variant="yellow"
            onClick={handleCopy}
            className="sm:h-full flex items-center gap-2 group"
            aria-label="Copy email"
          >
            {copied ? (
              <>Copied! <FiCheck /></>
            ) : (
              <>Copy Email <FiCopy className="group-hover:scale-110 transition-transform" /></>
            )}
          </Button>
        </div>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block"
        >
          <Button variant="yellow" className="flex items-center gap-2">
            Contact Now <FiMessageCircle /> <FiArrowRight />
          </Button>
        </a>
      </div>
    </section>
  );
}
