import React, { Component, ErrorInfo } from "react";

   interface ErrorBoundaryProps {
     children: React.ReactNode;
   }

   interface ErrorBoundaryState {
     hasError: boolean;
     error: Error | null;
     errorInfo: ErrorInfo | null;
   }

   class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
     constructor(props: ErrorBoundaryProps) {
       super(props);
       this.state = {
         hasError: false,
         error: null,
         errorInfo: null,
       };
     }

     componentDidCatch(error: Error, errorInfo: ErrorInfo) {
       this.setState({
         hasError: true,
         error,
         errorInfo,
       });
     }

     render() {
       const { hasError, error, errorInfo } = this.state;
       if (hasError) {
         // You can customize the error message or UI here
         return (
           <div>
             <h1>Something went wrong.</h1>
             <p>{error && error.toString()}</p>
             <p>{errorInfo && errorInfo.componentStack}</p>
           </div>
         );
       }
       // If no error occurred, render the children as-is
       return this.props.children;
     }
   }

   export default ErrorBoundary;