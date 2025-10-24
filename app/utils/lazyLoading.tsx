import React, { ComponentType } from "react";

/**
 * Higher-order component for lazy loading with error boundaries
 */
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  fallback?: ComponentType
) => {
  const LazyComponent = React.lazy(() =>
    Promise.resolve({ default: Component })
  );

  const LazyWrapper = (props: P) => (
    <React.Suspense
      fallback={
        fallback ? React.createElement(fallback) : <div>Loading...</div>
      }
    >
      <LazyComponent {...props} />
    </React.Suspense>
  );

  LazyWrapper.displayName = `withLazyLoading(${Component.displayName || Component.name})`;
  return LazyWrapper;
};

/**
 * Utility function to create lazy-loaded components with custom loading states
 */
export const createLazyComponent = <P extends object>(
  importFunction: () => Promise<{ default: ComponentType<P> }>,
  LoadingComponent?: ComponentType
) => {
  const LazyComponent = React.lazy(importFunction);

  const LazyWrapper = (props: P) => (
    <React.Suspense
      fallback={
        LoadingComponent ? (
          React.createElement(LoadingComponent)
        ) : (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-mainblue"></div>
          </div>
        )
      }
    >
      <LazyComponent {...props} />
    </React.Suspense>
  );

  LazyWrapper.displayName = "createLazyComponent";
  return LazyWrapper;
};

/**
 * Hook for preloading components
 */
export const usePreloadComponent = (importFunction: () => Promise<unknown>) => {
  const preload = React.useCallback(() => {
    importFunction();
  }, [importFunction]);

  return preload;
};
