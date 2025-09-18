'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react'
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'


const faqs = [
    {
        question: "How long is the free trial?",
        answer: "We offer a 14-day free trial for all our plans. You can explore all features during this period without any commitment."
    },
    {
        question: "Can I change plans later?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
        question: "Is there a setup fee?",
        answer: "No, we don't charge any setup fees. You only pay for the plan you choose."
    },
    {
        question: "Do you offer discounts for non-profits?",
        answer: "Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information."
    },
]

const pricingTiers = [
    {
        name: 'Basic',
        description: 'Essential features for small fleets',
        price: {
            monthly: 49,
            annually: 39,
        },
        features: [
            'Real-time vehicle tracking',
            'Basic reporting',
            'Driver behavior monitoring',
            'Mobile app access',
            'Email support',
        ],
        notIncluded: [
            'AI-driven insights',
            'Predictive maintenance',
            'ULIP API integration',
            'Custom branding',
        ],
    },
    {
        name: 'Pro',
        description: 'Advanced features for growing fleets',
        price: {
            monthly: 99,
            annually: 79,
        },
        features: [
            'All Basic features',
            'AI-driven insights',
            'Predictive maintenance',
            'ULIP API integration',
            'Priority support',
        ],
        notIncluded: [
            'Custom branding',
            'Dedicated account manager',
        ],
    },
    {
        name: 'Enterprise',
        description: 'Customizable solutions for large fleets',
        price: {
            monthly: 'Custom',
            annually: 'Custom',
        },
        features: [
            'All Pro features',
            'Custom branding',
            'Dedicated account manager',
            'On-premise deployment option',
            '24/7 phone support',
        ],
        notIncluded: [],
    },
]



export default function SolutionsPage() {

    const [isAnnual, setIsAnnual] = useState(false)

    useEffect(() => {
        setIsAnnual(true);
    }, [isAnnual])
    
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }
    return (
        <>
            <Header />
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-75"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">
                        Choose the plan that best fits your fleet management needs and start optimizing your operations today
                    </p>
                </div>
            </section>

            <section className="p-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className='text-center text-4xl font-bold py-6'>
                        Pricing
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingTiers.map((tier) => (
                            <Card key={tier.name} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>{tier.name}</CardTitle>
                                    <CardDescription>{tier.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="text-4xl font-bold mb-4">
                                        {typeof tier.price[isAnnual ? 'annually' : 'monthly'] === 'number' ? (
                                            <>
                                                ${tier.price[isAnnual ? 'annually' : 'monthly']}
                                                <span className="text-lg font-normal">/mo</span>
                                            </>
                                        ) : (
                                            tier.price[isAnnual ? 'annually' : 'monthly']
                                        )}
                                    </div>
                                    <ul className="space-y-2">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-center">
                                                <Check className="w-5 h-5 text-green-500 mr-2" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                        {tier.notIncluded.map((feature) => (
                                            <li key={feature} className="flex items-center text-gray-400">
                                                <X className="w-5 h-5 mr-2" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" variant={tier.name === 'Pro' ? 'default' : 'outline'}>
                                        {tier.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


            <section className="p-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className="mb-4">
                                <button
                                    className="flex justify-between items-center w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="font-semibold">{faq.question}</span>
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </button>
                                {openIndex === index && (
                                    <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="p-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to optimize your fleet?</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Start your free trial today and experience the power of DriveSense
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button size="lg">Start Free Trial</Button>
                        <Button size="lg" variant="outline">Contact Sales</Button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
