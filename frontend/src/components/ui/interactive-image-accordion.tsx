import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const defaultItems: AccordionItem[] = [
  {
    id: 1,
    title: "Mountain Peaks",
    description: "Explore the majestic heights of untouched mountain ranges",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Ocean Depths",
    description: "Dive into the mysterious world beneath the waves",
    imageUrl:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Forest Canopy",
    description: "Wander through ancient forests alive with nature",
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Desert Dunes",
    description: "Journey across the endless golden sands",
    imageUrl:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Arctic Tundra",
    description: "Venture into the pristine frozen wilderness",
    imageUrl:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop",
  },
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?w=800&auto=format&fit=crop";

interface LandingAccordionItemProps {
  items?: AccordionItem[];
}

export function LandingAccordionItem({
  items = defaultItems,
}: LandingAccordionItemProps) {
  const [activeIndex, setActiveIndex] = useState(4);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex h-[400px] md:h-[500px] min-w-[600px] gap-2 p-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-2xl flex-shrink-0"
            )}
            animate={{
              width: activeIndex === index ? "50%" : "12.5%",
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {/* Image */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = FALLBACK_IMAGE;
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Expanded content */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-6 text-white"
                >
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.description}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed label */}
            {activeIndex !== index && (
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <span
                  className="text-white/80 text-xs font-medium select-none"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {item.title}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
