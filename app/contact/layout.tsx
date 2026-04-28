import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Uptrender support team. We're here to help with platform questions, partnership enquiries, and technical support. Reply within 24 hours.",
  keywords: [
    "contact Uptrender",
    "Uptrender support",
    "trading platform support India",
  ],
  alternates: {
    canonical: "https://uptrender.in/contact",
  },
  openGraph: {
    title: "Contact Us | Uptrender",
    description:
      "Get in touch with the Uptrender support team. We reply within 24 hours.",
    url: "https://uptrender.in/contact",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Uptrender",
  url: "https://uptrender.in/contact",
  description:
    "Contact the Uptrender support team for help with platform questions, partnerships, and technical issues.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://uptrender.in" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://uptrender.in/contact" },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
