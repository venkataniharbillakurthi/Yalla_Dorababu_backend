import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '../hooks/useScrollAnimation';

const features = [
  {
    title: 'Schedule Posts',
    description: 'Plan and schedule your content across all platforms in advance.',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    title: 'Analytics',
    description: 'Track engagement and performance across all your social accounts.',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    title: 'Multi-Platform',
    description: 'Manage all your social media accounts from one place.',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
];

export const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <AnimatedSection className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8" animation="fade-up">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Welcome to SocialSync
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Streamline your social media management across multiple platforms from one simple dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/integrations"
                  className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
                <Link
                  to="/pricing"
                  className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Grid */}
      <div className="mb-16">
        <AnimatedSection animation="fade-up" className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to manage your social media presence</p>
          </div>
          
          {/* Feature Image */}
          <div className="mb-12 rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Social media management dashboard"
              className="w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
        
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection 
                key={index} 
                animation="fade-up" 
                delay={100 + (index * 100)}
                className="h-full"
              >
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden group">
                  <div className="relative overflow-hidden rounded-lg mb-4" style={{ paddingBottom: '56.25%' }}>
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto my-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <AnimatedSection animation="fade-right" className="order-2 md:order-1 h-full">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-full">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Team collaboration"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </AnimatedSection>
          
          <div className="order-1 md:order-2">
            <AnimatedSection animation="fade-left" className="h-full">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose SocialSync?</h2>
                <p className="text-lg md:text-xl text-gray-600">We're committed to making social media management simple, powerful, and effective.</p>
              </div>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'All-in-One Platform',
                      description: 'Manage all your social media accounts from a single dashboard. No more switching between multiple apps and tabs.',
                      icon: (
                        <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                      )
                    },
                    {
                      title: 'Time-Saving Automation',
                      description: 'Schedule posts in advance and let our smart algorithms optimize posting times for maximum engagement.',
                      icon: (
                        <svg className="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                    },
                    {
                      title: 'Data-Driven Insights',
                      description: 'Get detailed analytics and reports to understand what works best for your audience.',
                      icon: (
                        <svg className="w-10 h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      )
                    }
                  ].map((item, index) => (
                    <AnimatedSection 
                      key={index} 
                      animation="fade-up" 
                      delay={200 + (index * 100)}
                      className="h-full"
                    >
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center">
                        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{item.title}</h3>
                        <p className="text-gray-600 text-sm text-center">{item.description}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>

                {/* Testimonial */}
                <AnimatedSection animation="fade-up" delay={500} className="w-full">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <AnimatedSection animation="fade-up" delay={550} className="flex flex-col sm:flex-row items-center">
                      <div className="sm:w-1/5 flex justify-center mb-4 sm:mb-0">
                        <AnimatedSection 
                          animation="scale-in" 
                          delay={600}
                          className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold"
                        >
                          JD
                        </AnimatedSection>
                      </div>
                      <div className="sm:w-4/5 text-center sm:text-left sm:pl-6">
                        <AnimatedSection animation="fade-left" delay={650}>
                          <blockquote className="text-gray-700 italic mb-3">
                            "SocialSync has completely transformed how we manage our social media. The time we've saved on scheduling and analytics has been incredible."
                          </blockquote>
                        </AnimatedSection>
                        <AnimatedSection animation="fade-left" delay={700}>
                          <p className="font-medium text-gray-900 text-sm">John Doe</p>
                          <p className="text-xs text-gray-500">Marketing Director, TechCorp</p>
                        </AnimatedSection>
                      </div>
                    </AnimatedSection>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <AnimatedSection animation="fade-up" delay={800} className="mt-12">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <AnimatedSection animation="fade-up" delay={850} className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to boost your social media presence?</h2>
              <AnimatedSection animation="fade-up" delay={900} className="mb-6">
                <p className="text-xl text-blue-100">Join thousands of businesses already using SocialSync to save time and grow their audience.</p>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={950}>
                <Link 
                  to="/signup" 
                  className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium px-8 py-3 rounded-lg transition-colors"
                >
                  Get Started for Free
                </Link>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;
