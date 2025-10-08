
'use client';

import { BeakerIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border/50 py-8">
        <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
            <div className="flex justify-center items-center gap-2 mb-4">
                <BeakerIcon className="h-6 w-6 text-accent" />
                <span className="font-semibold text-foreground">Kourklys International School</span>
            </div>
            <p>
                Made with ❤️ for the students of the coding class.
            </p>
            <p className="mt-2 text-sm">
                Your Coding Teacher
            </p>
        </div>
    </footer>
  );
}
