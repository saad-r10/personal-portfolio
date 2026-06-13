"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export type Discovery = {
  id: string;
  label: string;
};

export const DISCOVERY_REGISTRY: Discovery[] = [
  { id: "hero-orb", label: "you found it." },
  { id: "juggle-5", label: "keepy-uppy: 5 in a row" },
  { id: "juggle-10", label: "keepy-uppy: 10 in a row" },
  { id: "juggle-25", label: "world class: 25 in a row" },
];

const STORAGE_KEY = "portfolio:discoveries";
const EMPTY_SET = new Set<string>();

let cache: Set<string> | null = null;
const listeners = new Set<() => void>();

function readStorage(): Set<string> {
  if (cache) return cache;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    cache = stored ? new Set(JSON.parse(stored) as string[]) : new Set();
  } catch {
    cache = new Set();
  }
  return cache;
}

function writeStorage(next: Set<string>) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  } catch {
    // ignore unavailable storage
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return readStorage();
}

function getServerSnapshot() {
  return EMPTY_SET;
}

type DiscoveryContextValue = {
  discovered: Set<string>;
  total: number;
  toast: Discovery | null;
  discover: (id: string) => void;
};

const DiscoveryContext = createContext<DiscoveryContextValue | null>(null);

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const discovered = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [toast, setToast] = useState<Discovery | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const discover = useCallback(
    (id: string) => {
      if (discovered.has(id)) return;

      const next = new Set(discovered);
      next.add(id);
      writeStorage(next);

      const entry = DISCOVERY_REGISTRY.find((d) => d.id === id);
      if (entry) {
        setToast(entry);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setToast(null), 2400);
      }
    },
    [discovered]
  );

  return (
    <DiscoveryContext.Provider
      value={{ discovered, total: DISCOVERY_REGISTRY.length, toast, discover }}
    >
      {children}
    </DiscoveryContext.Provider>
  );
}

export function useDiscoveries() {
  const context = useContext(DiscoveryContext);
  if (!context) {
    throw new Error("useDiscoveries must be used within a DiscoveryProvider");
  }
  return context;
}
