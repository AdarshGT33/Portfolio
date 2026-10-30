"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

/** Offset from UTC in minutes for an IANA zone, right now (DST-aware). */
function offsetMinutes(timeZone: string) {
  const s = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName")!.value; // "GMT+02:00" | "GMT"
  const m = /GMT([+-])(\d{2}):(\d{2})/.exec(s);
  return m ? (m[1] === "-" ? -1 : 1) * (+m[2] * 60 + +m[3]) : 0;
}

function haversineKm(a: [number, number], b: [number, number]) {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b[0] - a[0]);
  const dLon = rad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function clockFor(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date())
    .replace(" ", "")
    .toLowerCase();
}

/** "3h30m ahead" — how far ahead/behind home is, relative to the visitor. */
function skewLabel(visitorTz: string) {
  const diff = offsetMinutes(profile.homeTimeZone) - offsetMinutes(visitorTz);
  if (diff === 0) return "same time as you";
  const h = Math.floor(Math.abs(diff) / 60);
  const m = Math.abs(diff) % 60;
  const span = `${h ? `${h}h` : ""}${m ? `${m}m` : ""}` || "0m";
  return `${span} ${diff > 0 ? "ahead" : "behind"}`;
}

type Where = { place: string; tz: string; km: number | null };

export default function LocalTime() {
  const [where, setWhere] = useState<Where | null>(null);
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const nativeTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fallback: Where = {
      place: (nativeTz.split("/").pop() ?? nativeTz).replace(/_/g, " "),
      tz: nativeTz,
      km: null,
    };

    let alive = true;
    fetch("https://ipwho.is/?fields=success,city,country,latitude,longitude,timezone")
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        if (!d?.success || !d.city) return setWhere(fallback);
        setWhere({
          place: [d.city, d.country].filter(Boolean).join(", "),
          tz: d.timezone?.id || nativeTz,
          km: haversineKm(profile.homeCoords, [d.latitude, d.longitude]),
        });
      })
      .catch(() => alive && setWhere(fallback));

    return () => {
      alive = false;
    };
  }, []);

  // Tick the clock once we know the zone.
  useEffect(() => {
    if (!where) return;
    const tick = () => setClock(clockFor(where.tz));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [where]);

  // Render nothing until resolved — avoids a hydration mismatch and a layout jump.
  if (!where || !clock) return null;

  return (
    <div className="pb-12">
      <div className="inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-full border border-hairline bg-surface px-4 py-2 font-mono text-xs text-ink-soft">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden>🕐</span>
          <span className="text-ink">{clock}</span> in {where.place}
        </span>
        {where.km !== null && where.km < 50 ? (
          <span className="inline-flex items-center gap-2">
            <span aria-hidden>📍</span>
            same city as me
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <span aria-hidden>📍</span>
            {where.km !== null && (
              <>{Math.round(where.km).toLocaleString("en-US")}km away · </>
            )}
            {skewLabel(where.tz)} · from {profile.homeCity}
          </span>
        )}
      </div>
    </div>
  );
}
