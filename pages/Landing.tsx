import React from 'react';
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Mail, 
  Layout, 
  CheckCircle2, 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin,
  Layers,
  Globe,
  Smartphone,
  MousePointer2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Landing: React.FC<{ onEnterApp: () => void }> = ({ onEnterApp }) => {
  const features = [
    {
      title: 'Advanced Automation',
      description: 'Build complex customer journeys with our drag-and-drop visual workflow builder.',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      title: 'High Deliverability',
      description: 'Our smart routing and domain warming ensure your emails land in the inbox, not spam.',
      icon: Shield,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Real-time Analytics',
      description: 'Track opens, clicks, and conversions with pixel-perfect accuracy and live reporting.',
      icon: BarChart3,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      title: 'Audience Segments',
      description: 'Group your subscribers based on behavior, demographics, and custom data points.',
      icon: Users,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      title: 'Visual Email Editor',
      description: 'Create stunning, responsive emails without writing a single line of code.',
      icon: Layout,
      color: 'text-pink-500',
      bg: 'bg-pink-50'
    },
    {
      title: 'Transactional API',
      description: 'Power your app notifications with our lightning-fast transactional email infrastructure.',
      icon: Mail,
      color: 'text-fuchsia-500',
      bg: 'bg-fuchsia-50'
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: '0',
      description: 'Perfect for side projects and small newsletters.',
      features: [
        'Up to 2,000 subscribers',
        '10,000 emails per month',
        'Basic email editor',
        'Standard deliverability',
        'Community support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: '49',
      description: 'Everything you need to grow your business.',
      features: [
        'Up to 10,000 subscribers',
        'Unlimited emails',
        'Advanced automation',
        'Priority deliverability',
        'Behavioral segments',
        '24/7 Email support'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '199',
      description: 'Advanced features for large-scale operations.',
      features: [
        'Unlimited subscribers',
        'Dedicated IP address',
        'Custom domain warming',
        'SLA guarantees',
        'Dedicated account manager',
        'SSO & Advanced security'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Zap className="text-white" size={20} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">MailFlow AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#enterprise" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Enterprise</a>
            </div>

            <div className="flex items-center space-x-6">
              <button 
                onClick={onEnterApp}
                className="text-sm font-bold text-slate-900 hover:opacity-70 transition-opacity"
              >
                Sign In
              </button>
              <button 
                onClick={onEnterApp}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-purple-50 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-pink-50 rounded-full blur-[120px] opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 mb-10 bg-purple-50 rounded-full border border-purple-100">
              <Zap size={14} className="text-purple-600" fill="currentColor" />
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                The future of email marketing
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.05]">
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Intelligent Flows</span> <br />
              That Connect
            </h1>

            {/* Subheadline */}
            <p className="max-w-3xl mx-auto text-lg lg:text-xl text-slate-500 mb-12 leading-relaxed font-medium">
              Automate your customer journey with a single platform. Advanced workflows, 
              dynamic segmentation, and powerful analytics—all in one place.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
              <button 
                onClick={onEnterApp}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-purple-500/30 flex items-center justify-center group"
              >
                Start Free Trial <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-slate-50 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all border border-slate-100">
                Watch Demo
              </button>
            </div>

            {/* Feature Quick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Smartphone size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900">Mobile First</p>
                  <p className="text-xs text-slate-500 font-medium">Responsive Design</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900">Dynamic Flows</p>
                  <p className="text-xs text-slate-500 font-medium">Smart Automation</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center">
                  <Globe size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900">Multi-Channel</p>
                  <p className="text-xs text-slate-500 font-medium">Global Reach</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* App Preview Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-2">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop" 
                alt="MailFlow AI Dashboard" 
                className="w-full h-auto rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 hidden lg:block animate-bounce-slow">
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Deliverability</p>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">99.9%</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 hidden lg:block animate-bounce-slow" style={{ animationDelay: '1.5s' }}>
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Automations</p>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">Active</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">Trusted by 500+ innovative companies</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:opacity-50 transition-opacity">
            <Globe size={40} />
            <Layers size={40} />
            <Smartphone size={40} />
            <MousePointer2 size={40} />
            <Globe size={40} />
            <Layers size={40} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Everything you need to scale.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg lg:text-xl font-medium">
              Powerful features designed for modern marketing teams. No more juggling multiple tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all duration-300"
              >
                <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-inner`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-24 lg:py-32 bg-slate-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Built for Performance.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg lg:text-xl font-medium">
              Explore the powerful dashboard features that make MailFlow AI the industry leader.
            </p>
          </div>

          <div className="space-y-32">
            {/* Showcase 1: Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 mb-6 bg-blue-50 rounded-full border border-blue-100">
                  <BarChart3 size={14} className="text-blue-600" />
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Real-time Data</span>
                </div>
                <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Deep Analytics & Reporting</h3>
                <p className="text-slate-500 text-lg lg:text-xl mb-8 leading-relaxed font-medium">
                  Gain actionable insights into your email performance. Track every open, click, and conversion in real-time with our advanced tracking pixels.
                </p>
                <ul className="space-y-4">
                  {['Live activity stream', 'Heatmaps & click tracking', 'Custom conversion goals', 'Automated weekly reports'].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700 font-medium">
                      <CheckCircle2 className="text-emerald-500 mr-3" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bbbda5366392?w=1000&h=700&fit=crop" 
                    alt="Analytics Dashboard" 
                    className="w-full h-auto rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Growth Rate</p>
                  <p className="text-3xl font-bold text-emerald-600">+124%</p>
                </div>
              </motion.div>
            </div>

            {/* Showcase 2: Automation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:order-2"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 mb-6 bg-purple-50 rounded-full border border-purple-100">
                  <Zap size={14} className="text-purple-600" fill="currentColor" />
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Smart Workflows</span>
                </div>
                <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Visual Automation Builder</h3>
                <p className="text-slate-500 text-lg lg:text-xl mb-8 leading-relaxed font-medium">
                  Design complex customer journeys with our intuitive drag-and-drop builder. Set triggers based on user behavior and let MailFlow AI do the rest.
                </p>
                <ul className="space-y-4">
                  {['Behavioral triggers', 'Multi-channel sequences', 'A/B test every step', 'Dynamic delay logic'].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700 font-medium">
                      <CheckCircle2 className="text-purple-500 mr-3" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative lg:order-1"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&h=700&fit=crop" 
                    alt="Automation Builder" 
                    className="w-full h-auto rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -top-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Flows</p>
                  <p className="text-3xl font-bold text-purple-600">42</p>
                </div>
              </motion.div>
            </div>

            {/* Showcase 3: Email Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 mb-6 bg-pink-50 rounded-full border border-pink-100">
                  <Layout size={14} className="text-pink-600" />
                  <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">No-Code Design</span>
                </div>
                <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Stunning Visual Editor</h3>
                <p className="text-slate-500 text-lg lg:text-xl mb-8 leading-relaxed font-medium">
                  Create beautiful, responsive emails in minutes. Our visual editor gives you full control over every pixel without needing to write code.
                </p>
                <ul className="space-y-4">
                  {['100+ Premium templates', 'Mobile-responsive preview', 'Dynamic content blocks', 'Asset library management'].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700 font-medium">
                      <CheckCircle2 className="text-pink-500 mr-3" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=1000&h=700&fit=crop" 
                    alt="Email Editor" 
                    className="w-full h-auto rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Templates</p>
                  <p className="text-3xl font-bold text-pink-600">150+</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 lg:py-32 bg-slate-50/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
          <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-purple-50 rounded-full blur-[100px] opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-pink-50 rounded-full blur-[100px] opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Simple, transparent pricing.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg lg:text-xl font-medium">
              Choose the plan that fits your current stage. Scale as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`relative p-10 rounded-[2.5rem] border ${plan.popular ? 'bg-white border-purple-600 shadow-2xl scale-105 z-10' : 'bg-white border-slate-200 shadow-sm hover:border-purple-200 transition-colors'} flex flex-col h-full`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-purple-500/20">
                    Most Popular
                  </div>
                )}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{plan.name}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{plan.description}</p>
                </div>
                <div className="mb-10">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-slate-900 tracking-tight">${plan.price}</span>
                    <span className="text-slate-500 ml-2 font-medium">/month</span>
                  </div>
                </div>
                <ul className="space-y-5 mb-12 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-slate-600 font-medium">
                      <CheckCircle2 className="text-purple-600 mr-4 shrink-0 mt-0.5" size={20} />
                      <span className="text-sm lg:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={onEnterApp}
                  className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 shadow-xl shadow-purple-500/25' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-40 relative overflow-hidden mx-4 sm:mx-8 lg:mx-12 my-24 rounded-[3rem] bg-slate-900">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-600 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-7xl font-bold text-white mb-10 tracking-tight leading-[1.1]">Ready to transform your <br /> email marketing?</h2>
            <p className="text-slate-300 text-lg lg:text-2xl mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
              Join thousands of marketers who are already using MailFlow AI to build better relationships and drive more revenue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={onEnterApp}
                className="w-full sm:w-auto px-12 py-6 bg-white text-slate-900 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all shadow-2xl flex items-center justify-center group"
              >
                Start Your Free Trial <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
              </button>
              <button className="w-full sm:w-auto px-12 py-6 bg-slate-800 text-white rounded-2xl font-bold text-xl hover:bg-slate-700 transition-all border border-slate-700 flex items-center justify-center">
                Book a Demo
              </button>
            </div>
            <p className="mt-8 text-slate-400 text-sm font-medium">No credit card required. 14-day free trial.</p>
          </motion.div>
        </div>
      </section>

      {/* Creative Footer Top: Integration Cloud */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-[3rem] p-12 lg:p-20 border border-slate-100 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Connects with your favorite tools.</h3>
                <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed">
                  MailFlow AI integrates seamlessly with over 100+ platforms including Shopify, Salesforce, Slack, and more.
                </p>
                <button className="text-purple-600 font-bold flex items-center hover:opacity-70 transition-opacity">
                  View all integrations <ArrowRight className="ml-2" size={18} />
                </button>
              </div>
              <div className="relative h-64 lg:h-96">
                {/* Decorative floating icons or shapes */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-1/4 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-50"
                >
                  <Globe className="text-blue-500" size={32} />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-10 right-1/4 w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-slate-50"
                >
                  <Zap className="text-amber-500" size={40} fill="currentColor" />
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute top-1/2 right-0 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center border border-slate-50"
                >
                  <Mail className="text-fuchsia-500" size={24} />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <div className="w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center space-x-2 text-white mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Zap className="text-white" size={20} fill="currentColor" />
                </div>
                <span className="text-2xl font-bold tracking-tight">MailFlow AI</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                The intelligent email marketing platform for modern growth teams. Build, automate, and scale with ease.
              </p>
              <div className="flex space-x-4">
                <Twitter size={20} className="hover:text-white cursor-pointer transition-colors" />
                <Linkedin size={20} className="hover:text-white cursor-pointer transition-colors" />
                <Github size={20} className="hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                <li className="hover:text-white cursor-pointer transition-colors">Integrations</li>
                <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-white cursor-pointer transition-colors">Changelog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-white cursor-pointer transition-colors">API Reference</li>
                <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-white cursor-pointer transition-colors">Community</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} MailFlow AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
