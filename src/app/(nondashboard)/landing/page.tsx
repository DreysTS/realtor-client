import React, { Suspense } from 'react'

import { AboutSection } from './AboutSection'
import { CollaborationOverviewSection } from './CollaborationOverviewSection'
import { FrequentlyAskedQuestions } from './FrequentlyAskedQuestions'
import { HeroSection } from './HeroSection'
import { PropertiesDemo } from './PropertiesDemo'
import { Navbar } from '@/components'

export default function Landing() {
	return (
		<Suspense>
			<Navbar />
			<HeroSection />
			<AboutSection />
			<CollaborationOverviewSection />
			<PropertiesDemo />
			<FrequentlyAskedQuestions />
		</Suspense>
	)
}
