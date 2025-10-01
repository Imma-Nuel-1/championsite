// // 🗑️ **REVIEW COMMENT**: PageTransition component is NOT imported or used anywhere in the codebase.
// // ❌ **UNUSED COMPONENT** - This entire file contains multiple unused components:
// // - PageTransition, ErrorBoundary, LoadingButton, AnimatedMenu, ModalBackdrop, PageHeader, ScrollToTop
// //
// // RECOMMENDATIONS:
// // 1. Delete this file completely if none of these components are needed, OR
// // 2. Use PageTransition in your routing to add smooth page transitions
// // 3. The ScrollToTop export here conflicts with the separate ScrollToTop.tsx component
// //
// // Note: You already have a working ScrollToTop.tsx component, so this export is redundant.

// import React from "react";

// // Simple page transition wrapper that doesn't depend on framer-motion
// interface PageTransitionProps {
//   children: React.ReactNode;
// }

// const PageTransition: React.FC<PageTransitionProps> = ({ children }) => (
//   <div className="motion-safe:animate-fadeIn">
//     {children}
//   </div>
// );

// // Simple error boundary component
// interface ErrorBoundaryProps {
//   children: React.ReactNode;
//   fallback?: React.ReactNode;
// }

// const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
//   return (
//     <div>
//       {children}
//     </div>
//   );
// };

// // Simple loading button component
// interface LoadingButtonProps {
//   loading?: boolean;
//   children: React.ReactNode;
//   onClick?: () => void;
//   className?: string;
//   disabled?: boolean;
// }

// const LoadingButton: React.FC<LoadingButtonProps> = ({
//   loading = false,
//   children,
//   onClick,
//   className = "",
//   disabled = false
// }) => (
//   <button
//     onClick={onClick}
//     disabled={disabled || loading}
//     className={`${className} ${loading ? 'opacity-75 cursor-not-allowed' : ''} transition-all duration-300`}
//   >
//     {loading ? (
//       <div className="flex items-center justify-center">
//         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
//         Loading...
//       </div>
//     ) : (
//       children
//     )}
//   </button>
// );

// // Simple animated container for mobile menu
// interface AnimatedMenuProps {
//   isOpen: boolean;
//   children: React.ReactNode;
// }

// const AnimatedMenu: React.FC<AnimatedMenuProps> = ({ isOpen, children }) => (
//   <div className={`transition-all duration-300 ${isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
//     {children}
//   </div>
// );

// // Simple modal backdrop component
// interface ModalBackdropProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const ModalBackdrop: React.FC<ModalBackdropProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
//         {children}
//       </div>
//     </div>
//   );
// };

// // Simple page header component
// interface PageHeaderProps {
//   title: string;
//   subtitle?: string;
//   backgroundImage?: string;
// }

// const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, backgroundImage }) => (
//   <section
//     className="relative py-20 px-4 bg-gradient-to-r from-navy to-blue-900 text-white"
//     style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
//   >
//     <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//     <div className="container mx-auto text-center relative z-10">
//       <h1 className="text-4xl md:text-6xl font-bold mb-4">
//         {title}
//       </h1>
//       {subtitle && (
//         <p className="text-xl text-gray-200 max-w-3xl mx-auto">
//           {subtitle}
//         </p>
//       )}
//     </div>
//   </section>
// );

// // Simple scroll to top button
// const ScrollToTop: React.FC = () => {
//   const [isVisible, setIsVisible] = React.useState(false);

//   React.useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   return (
//     <div className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//       <button
//         onClick={scrollToTop}
//         className="bg-navy hover:bg-blue-800 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//       >
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default PageTransition;
// export { ErrorBoundary, LoadingButton, AnimatedMenu, ModalBackdrop, PageHeader, ScrollToTop };
