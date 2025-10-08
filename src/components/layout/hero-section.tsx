
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export function HeroSection() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'class-photo');

    return (
        <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
                <div className="relative aspect-[2/1] w-full">
                    {heroImage && (
                        <Image
                            src={heroImage.imageUrl}
                            alt={heroImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={heroImage.imageHint}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white shadow-md">Welcome to KourklysCalc</h1>
                        <p className="text-lg md:text-xl text-white/90 mt-2 shadow-md">Your smart companion for all things math and science.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
