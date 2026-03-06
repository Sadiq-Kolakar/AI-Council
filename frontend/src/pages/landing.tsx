import { BackgroundPaths } from "@/components/ui/background-paths";
import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <section id="hero">
        <BackgroundPaths title="AI Council Chat" ctaLabel="Open Chat" ctaLink="#features" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-neutral-900 dark:text-white">
            Explore Our World
          </h2>
          <p className="text-center text-neutral-500 dark:text-neutral-400 mb-10 max-w-xl mx-auto">
            Hover over each panel to discover more about each feature.
          </p>
          <LandingAccordionItem />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
        © {new Date().getFullYear()} AI Council Chat. All rights reserved.
      </footer>
    </main>
  );
}
