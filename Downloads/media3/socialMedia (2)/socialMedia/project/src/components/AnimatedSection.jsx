import { useEffect, useRef, useState } from 'react';

const AnimatedSection = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasAnimated.current || !triggerOnce)) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      {
        threshold,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  const getAnimationClasses = () => {
    switch (animation) {
      case 'fade-up':
        return 'transition-all duration-700 ease-out';
      case 'fade-down':
        return 'transition-all duration-700 ease-out';
      case 'fade-left':
        return 'transition-all duration-700 ease-out';
      case 'fade-right':
        return 'transition-all duration-700 ease-out';
      case 'scale-in':
        return 'transition-all duration-700 ease-out';
      default:
        return 'transition-all duration-700 ease-out';
    }
  };

  const getInitialStyles = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-8';
        case 'fade-down':
          return 'opacity-0 -translate-y-8';
        case 'fade-left':
          return 'opacity-0 -translate-x-8';
        case 'fade-right':
          return 'opacity-0 translate-x-8';
        case 'scale-in':
          return 'opacity-0 scale-95';
        default:
          return 'opacity-0';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={sectionRef}
      className={`${getAnimationClasses()} ${getInitialStyles()} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
