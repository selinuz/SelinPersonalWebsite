"use client";

import { useState } from "react";
import { TYPOGRAPHY, cn } from "@/lib/design-constants";
import { concerts } from "@/data/concerts";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";

interface ConcertsByYear {
  [year: string]: typeof concerts;
}

export default function ConcertsContainer() {
  const [turkishBandsExpanded, setTurkishBandsExpanded] = useState(false);

  // Sort concerts by date (most recent first)
  const sortedConcerts = [...concerts].sort(
    (a, b) => b.sortDate.getTime() - a.sortDate.getTime()
  );

  // Group concerts by year
  const concertsByYear: ConcertsByYear = sortedConcerts.reduce(
    (acc, concert) => {
      const year = concert.sortDate.getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(concert);
      return acc;
    },
    {} as ConcertsByYear
  );

  // Get years sorted in descending order
  const years = Object.keys(concertsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  // Turkish bands list
  const turkishBands = [
    "Redd",
    "Duman",
    "Mor ve Ötesi",
    "Can Bonomo",
    "Dolu Kadehi Ters Tut",
    "Pinhani",
    "Son Feci Bisiklet",
    "Yüzyüzeyken Konuşuruz",
    "Yaşlı Amca",
    "İnce Saz",
    "Teoman",
    "Şebnem Ferah",
    "Kenan Doğulu",
    "MFÖ",
  ];

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <div key={year}>
          <h3
            className={cn(TYPOGRAPHY.presets.subheading, "mb-4 text-primary")}>
            {year}
          </h3>
          <ul className="space-y-3">
            {concertsByYear[year].map((concert) => (
              <li
                key={`${concert.artist}-${concert.date}`}
                className={cn(TYPOGRAPHY.presets.body, "flex items-start")}>
                <span className="text-muted-foreground mr-2">•</span>
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="font-semibold">{concert.artist}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      — {concert.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground/70 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{concert.location}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Turkish Bands Collapsible Section */}
      <div className="border-t border-border pt-6 mt-8">
        <button
          onClick={() => setTurkishBandsExpanded(!turkishBandsExpanded)}
          className={cn(
            "flex items-center gap-2 w-full",
            TYPOGRAPHY.presets.subheading,
            "text-primary hover:text-primary/80 transition-colors"
          )}>
          <span>Turkish bands I have seen many times</span>
          {turkishBandsExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {turkishBandsExpanded && (
          <div className="mt-4">
            <ul className="space-y-2">
              {turkishBands.map((band) => (
                <li
                  key={band}
                  className={cn(TYPOGRAPHY.presets.body, "flex items-start")}>
                  <span className="text-muted-foreground mr-2">•</span>
                  <span className="font-semibold">{band}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
