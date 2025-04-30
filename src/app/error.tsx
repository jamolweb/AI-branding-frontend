'use client';

interface ErrorProps {
  error?: Error;
  reset?: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0D0D0D] p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-[#C2F970] text-6xl mb-4">⚠️</div>
          <h1 className="text-[#C2F970] text-2xl font-bold mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-400 mb-6">
            {error?.message ||
              'An unexpected error occurred. Please try again later.'}
          </p>
          {reset && (
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#C2F970] text-black rounded-lg font-medium 
                       hover:bg-[#A8E050] transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-[#C2F970] focus:ring-opacity-50"
            >
              Try Again
            </button>
          )}
        </div>
        <p className="text-gray-500 text-sm">
          If this problem persists, please contact support
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
