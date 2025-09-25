import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const Pricing = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (plan) => {
    // Navigate to payment page with plan details
    navigate('/payment', { state: { plan } });
  };

  const plans = [
    {
      name: 'Starter',
      price: 19,
      period: 'month',
      description: 'Perfect for individuals getting started with social media',
      features: [
        '3 Social Media Accounts',
        '50 Scheduled Posts',
        'Basic Analytics',
        'Email Support',
        '1 Team Member'
      ],
      popular: false,
      cta: 'Get Started'
    },
    {
      name: 'Professional',
      price: 49,
      period: 'month',
      description: 'Ideal for growing businesses and professionals',
      features: [
        '10 Social Media Accounts',
        '200 Scheduled Posts',
        'Advanced Analytics',
        'Priority Email & Chat Support',
        '5 Team Members',
        'Content Calendar',
        'Basic Performance Reports'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Business',
      price: 99,
      period: 'month',
      description: 'For businesses with advanced social media needs',
      features: [
        '25 Social Media Accounts',
        'Unlimited Scheduled Posts',
        'Advanced Analytics & Reports',
        '24/7 Priority Support',
        'Unlimited Team Members',
        'Content Calendar',
        'Competitor Analysis',
        'Dedicated Account Manager',
        'API Access'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for you. No hidden fees, cancel anytime.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection
              key={plan.name}
              animation="fade-up"
              delay={100 + index * 100}
              className="h-full"
            >
              <div className={`relative bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 h-full flex flex-col ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mt-4 mb-8">
                    <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <button
                      onClick={() => handlePlanSelect(plan)}
                      className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-xl font-medium ${
                        plan.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                      } transition-colors duration-200`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-up" delay={500} className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a custom solution?</h3>
            <p className="text-gray-600 mb-6">
              Have specific requirements? Our enterprise plan offers custom solutions tailored to your business needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gray-800 hover:bg-gray-900 transition-colors duration-200"
            >
              Contact Sales
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={600} className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8 text-left">
            {[
              {
                question: 'Can I change my plan later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Your subscription will be prorated based on the new plan.'
              },
              {
                question: 'Do you offer a free trial?',
                answer: 'Yes! All new users get a 14-day free trial of our Professional plan. No credit card required.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards including Visa, Mastercard, American Express, and PayPal.'
              },
              {
                question: 'Is there a contract or long-term commitment?',
                answer: 'No, all our plans are month-to-month with no long-term contracts. You can cancel anytime.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>


    </div>
  );
};

export default Pricing;
